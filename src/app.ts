import dotenv from "dotenv";
import express from "express";
import clienteRouter from "./routes/cliente.routes";
import produtoRouter from "./routes/produto.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/cliente", clienteRouter);
app.use("/produto", produtoRouter);

export default app;
