import {
  addProduct,
  getAll,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", addProduct);
router.get("/", getAll);
router.get("/:pid", getProductById);
router.delete("/:pid", deleteProduct);
router.put("/:pid", updateProduct);

export default router;
