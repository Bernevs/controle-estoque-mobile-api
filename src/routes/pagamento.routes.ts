import { Router } from "express";
import { PagamentoController } from "../controller/PagamentoController";

const pagamentoRouter = Router();

pagamentoRouter.post("/", PagamentoController.createPagamento);
pagamentoRouter.get("/", PagamentoController.getPagamento);
pagamentoRouter.get("/:id", PagamentoController.getPagamentoById);
pagamentoRouter.put("/:id", PagamentoController.updatePagamento);
pagamentoRouter.delete("/:id", PagamentoController.deletePagamento);

export default pagamentoRouter;
