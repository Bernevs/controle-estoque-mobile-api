import { Router } from "express";
import { ClienteController } from "../controller/ClienteController";

const clienteRouter = Router();

clienteRouter.post("/", ClienteController.createCliente);
clienteRouter.get("/", ClienteController.getCliente);
clienteRouter.get("/total", ClienteController.getValorCliente);
clienteRouter.get("/:id", ClienteController.getClienteById);
clienteRouter.put("/:id", ClienteController.updateCliente);
clienteRouter.delete("/:id", ClienteController.deleteCliente);

export default clienteRouter;
