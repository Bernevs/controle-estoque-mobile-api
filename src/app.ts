import dotenv from "dotenv";
import express from "express";
import clienteRouter from "./routes/cliente.routes";
import produtoRouter from "./routes/produto.routes";
import pagamentoRouter from "./routes/pagamento.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/cliente", clienteRouter);
app.use("/produto", produtoRouter);
app.use("/pagamento", pagamentoRouter);

export default app;
