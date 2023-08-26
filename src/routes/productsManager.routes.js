import { Router } from "express";

const router = Router();

router.get("/", getProducts);

router.get("/:pid", getProductById);

router.post("/", addProduct);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);

export default router;
