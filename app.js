import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import envConfigs from "./envConfigs.js";
import { productRouter } from "./routes/api/productRouter.js";
import { authRouter } from "./routes/api/auth.js";

const { DB_URI, PORT } = envConfigs;
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

app.use((req, res, next) => res.status(404).json("Route not found"));
app.use((error, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = error;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server run port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
