import express from "express";
import mongoose from "mongoose";
import envConfigs from "./envConfigs.js";

const { DB_URI, PORT } = envConfigs;
const app = express();

app.use("/api/products", (req, res, next) => {
  //console.log("products");
  res.json("products");
});

app.use((req, res, next) => res.status(404).json("Route not found"));
app.use((req, res, next) => res.status(500).json("Internal Server Error"));

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
