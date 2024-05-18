import { Router } from "express";
import { getProducts, addProduct} from "../../controllers/productControllers.js";

export const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.post("/", addProduct);
