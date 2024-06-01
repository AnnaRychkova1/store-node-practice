import { Router } from "express";
import {
  getProducts,
  addProduct,
} from "../../controllers/productControllers.js";
import { authenticate } from "../../midleware/authenticate.js";

export const productRouter = Router();

productRouter.get("/", authenticate, getProducts);

productRouter.post("/", addProduct);
