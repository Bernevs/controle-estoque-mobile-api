import { Router } from "express";
import { PedidoController } from "../controller/PedidoController";

const pedidoRouter = Router();

pedidoRouter.post("/", PedidoController.createPedido);
pedidoRouter.get("/", PedidoController.getPedido);
pedidoRouter.get("/:cliente_id", PedidoController.getPedidoById);
pedidoRouter.delete("/:id", PedidoController.deletePedido);

export default pedidoRouter;
