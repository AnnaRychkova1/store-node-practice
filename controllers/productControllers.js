import { Product } from "../models/product.js";
import { addProductSchema } from "../schemas/productSchemas.js";

export async function getProducts(req, res, next) {
  const products = await Product.find();
  res.json(products);
}

export async function addProduct(req, res, next) {
  try {
    const { error } = addProductSchema.validate(req.body);
    if (error) {
      const newError = new Error(error.message);
      newError.status = 400;
      throw newError;
    }
    const products = await Product.create(req.body);
    res.status(201).json(products);
  } catch (error) {
    next(error);
  }
}
