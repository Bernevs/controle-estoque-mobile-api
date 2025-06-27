import dotenv from "dotenv";
import express from "express";
import clienteRouter from "./routes/cliente.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/cliente", clienteRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
