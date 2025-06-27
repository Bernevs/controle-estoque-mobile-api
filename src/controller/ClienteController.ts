import { Request, Response } from "express";
import { Cliente } from "../model/Cliente";
import { ClienteService } from "../service/ClienteService";

export class ClienteController {
  static async createCliente(req: Request, res: Response): Promise<any> {
    try {
      const { nome } = req.body;

      const cliente = new Cliente({ nome: nome, status: 1 });

      const result = await ClienteService.createCliente(cliente);

      return res.status(201).json({ cliente: result });
    } catch (error: any) {
      console.error("Erro ao criar Cliente", error);
      return res.status(500).json({ message: error.message, error: true });
    }
  }

  static async getCliente(req: Request, res: Response): Promise<any> {
    try {
      const result = await ClienteService.getCliente();

      return res.status(200).json({ cliente: result });
    } catch (error: any) {
      console.error("Erro ao buscar Cliente", error);
      return res.status(500).json({ message: error.message, error: true });
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
      console.error("Erro ao buscar Cliente unico", error);
      return res.status(500).json({ message: error.message, error: true });
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
      console.error("Erro ao atualizar Cliente", error);
      return res.status(500).json({ message: error.message, error: true });
    }
  }

  static async deleteCliente(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido", error: true });
      }

      await ClienteService.deleteCliente(Number(id));
      return res.status(204).json({ message: "Cliente deletado!" });
    } catch (error: any) {
      console.error("Erro ao deletar Cliente", error);
      return res.status(500).json({ message: error.message, error: true });
    }
  }
}
