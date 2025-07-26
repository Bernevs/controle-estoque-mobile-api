import { Router } from "express";
import { ProdutoController } from "../controller/ProdutoController";

const produtoRouter = Router();

produtoRouter.post("/", ProdutoController.createProduto);
produtoRouter.get("/", ProdutoController.getProduto);
produtoRouter.get("/:id", ProdutoController.getProdutoById);
produtoRouter.put("/:id", ProdutoController.updateProduto);
produtoRouter.delete("/:id", ProdutoController.deleteProduto);
produtoRouter.post("/pdf", ProdutoController.getPDF);

export default produtoRouter;
