import { Router } from "express";
import usersController, { logout } from "../controllers/usersController.js";
import productsController from "../controllers/productsController.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import {
  addItemToCart,
  removeItemFromCart,
  getCart,
} from "../controllers/cartController.js";
import { roleMiddleware } from "../middleware/role.js";
const router = Router();

//users endpoints

router.post("/user", usersController.registerUser);
router.post("/user/login", usersController.loginUser);
router.post("/logout", authMiddleware, logout);

//products endpoints

router.post("/product", productsController.addProduct);
router.get("/product/", productsController.viewProducts);
router.get("/product/:id", productsController.addProduct);
router.put("/product/:id", productsController.updateProduct);
router.patch("/product/:id", productsController.updateProduct);
router.delete("/product/:id", productsController.deleteProduct);

// cart endpoints
router.post("/cart/add", addItemToCart);
router.delete("/cart/remove", removeItemFromCart);
router.get("/cart/:userId", getCart);

//order endpoints
router.post("/order", authMiddleware, createOrder); // Create an order
router.get("/order", authMiddleware, getUserOrders); // Get all orders for logged-in user
router.get("/order/:id", authMiddleware, getOrderById); // Get a single order by ID
router.put(
  "/order/:id/status",
  authMiddleware,
  roleMiddleware(["admin", "vendor"]),
  updateOrderStatus
); // Update order status

export default router;
