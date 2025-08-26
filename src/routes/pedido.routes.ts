import { Router } from "express";
import { PedidoController } from "../controller/PedidoController";

const pedidoRouter = Router();

pedidoRouter.post("/", PedidoController.createPedido);
pedidoRouter.get("/cliente/:cliente_id", PedidoController.getPedido);
pedidoRouter.get("/:id", PedidoController.getPedidoById);
pedidoRouter.delete("/:id", PedidoController.deletePedido);

export default pedidoRouter;
