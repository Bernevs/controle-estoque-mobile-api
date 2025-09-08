import { Router } from "express";
import { PagamentoController } from "../controller/PagamentoController";

const pagamentoRouter = Router();

pagamentoRouter.post("/", PagamentoController.createPagamento);
pagamentoRouter.get("/cliente/:cliente_id", PagamentoController.getPagamento);
pagamentoRouter.get("/total/:cliente_id", PagamentoController.getValorPago);
pagamentoRouter.get("/:id", PagamentoController.getPagamentoById);
pagamentoRouter.put("/:id", PagamentoController.updatePagamento);
pagamentoRouter.delete("/:id", PagamentoController.deletePagamento);

export default pagamentoRouter;
