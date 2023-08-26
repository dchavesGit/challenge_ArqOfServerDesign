import {
  addCart,
  getCartById,
  updateProductInCart,
  removeProductInCart,
  updateProducts,
  emptyCart,
} from "../controllers/cart.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", addCart);
router.get("/", getCartById);
router.put("/", updateProductInCart);
router.delete("/", removeProductInCart);
router.put("/", updateProducts);
router.delete("/", emptyCart);

export default router;
