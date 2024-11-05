import Order from "../models/order.js";
import Product from "../models/products.js";

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress } = req.body;
        const userId = req.user._id;

        // Calculate total price based on product prices
        let totalPrice = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            totalPrice += product.price * item.quantity;
        }

        // Create the order
        const order = new Order({
            user: userId,
            items: items.map((item) => ({
                product: item.product,
                quantity: item.quantity,
                price: item.price,
            })),
            totalPrice,
            shippingAddress,
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
};

// Get all orders for a specific user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId }).populate("items.product", "name price");
        res.json(orders);
    } catch (error) {
        console.error("Fetching user orders error:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate("items.product", "name price");
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        console.error("Fetching order error:", error);
        res.status(500).json({ error: "Failed to fetch order" });
    }
};

// Update order status (for admins or vendors)
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const validStatuses = ["pending", "paid", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        order.status = status;
        order.updatedAt = Date.now();
        await order.save();

        res.json(order);
    } catch (error) {
        console.error("Order status update error:", error);
        res.status(500).json({ error: "Failed to update order status" });
    }
};
