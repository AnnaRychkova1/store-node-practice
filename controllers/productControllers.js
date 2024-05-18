import { Product } from "../models/product";

async function getProducts(req, res, next) {
  const products = await Product.find();
  res.json(products);
}
