import Cart from '../models/cart.js';

// Add item to cart
export const addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Find the product to get its price
    const product = await findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await findOne({ userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [], totalQuantity: 0, totalPrice: 0 });
    }

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (existingItemIndex >= 0) {
      // Update the quantity and subtotal of the existing item
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].subtotal = cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].price;
    } else {
      // Add new item to the cart
      cart.items.push({
        productId,
        quantity,
        price: product.price,
        subtotal: quantity * product.price,
      });
    }

    // Recalculate total quantity and price
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Remove item from the cart
    cart.items = cart.items.filter(item => !item.productId.equals(productId));

    // Recalculate total quantity and price
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await findOne({ userId }).populate('items.productId', 'name price');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  addItemToCart,
  removeItemFromCart,
  getCart,
};
