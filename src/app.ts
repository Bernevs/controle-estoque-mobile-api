import dotenv from "dotenv";
import express from "express";
import clienteRouter from "./routes/cliente.routes";
import produtoRouter from "./routes/produto.routes";
import pagamentoRouter from "./routes/pagamento.routes";
import PdfRouter from "./routes/pdf.routes";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

// ✅ Configurar body-parser com limite antes das rotas
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// ✅ Suas rotas
app.use("/cliente", clienteRouter);
app.use("/produto", produtoRouter);
app.use("/pagamento", pagamentoRouter);
app.use(PdfRouter);

export default app;
