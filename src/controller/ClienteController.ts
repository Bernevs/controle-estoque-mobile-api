import { Request, Response } from "express";
import { Cliente } from "../model/Cliente";
import { ClienteService } from "../service/ClienteService";
import { HttpError } from "../errors/HttpError";

export class ClienteController {
  static async createCliente(req: Request, res: Response): Promise<any> {
    try {
      const { nome } = req.body;

      const cliente = new Cliente({ nome: nome, status: 1 });

      const result = await ClienteService.createCliente(cliente);

      return res.status(201).json({ cliente: result });
    } catch (error: any) {
      console.error("Erro em createCliente:", error.message);
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: error.message });
      }
    }
  }

  static async getCliente(req: Request, res: Response): Promise<any> {
    try {
      const result = await ClienteService.getCliente();

      return res.status(200).json({ cliente: result });
    } catch (error: any) {
      console.error("Erro em getCliente:", error.message);
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: error.message });
      }
    }
  }

  static async getClienteById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido", error: true });
      }

      const cliente = await ClienteService.getClienteById(Number(id));

      return res.status(200).json({ cliente: cliente });
    } catch (error: any) {
      console.error("Erro em getClienteById:", error.message);
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: error.message });
      }
    }
  }

  static async updateCliente(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { novoNome } = req.body;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido", error: true });
      }

      if (!novoNome) {
        return res.status(400).json({ message: "Nome inválido", error: true });
      }

      const result = await ClienteService.updateCliente(Number(id), novoNome);

      return res.status(200).json({ cliente: result });
    } catch (error: any) {
      console.error("Erro em updateCliente:", error.message);
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: error.message });
      }
    }
  }

  static async deleteCliente(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido" });
      }

      await ClienteService.deleteCliente(Number(id));
      return res.status(204).json({ message: "Cliente deletado!" });
    } catch (error: any) {
      console.error("Erro em deleteCliente:", error.message);
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: error.message });
      }
    }
  }
}
