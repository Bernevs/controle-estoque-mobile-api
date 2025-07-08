import { Request, Response } from "express";
import { Pagamento } from "../model/Pagamento";
import { PagamentoService } from "../service/PagamentoService";
import { NotFoundError } from "../errors/NotFoundError";

export class PagamentoController {
  static async createPagamento(req: Request, res: Response): Promise<any> {
    try {
      const { cliente_id, valor_pago, data_pagamento } = req.body;

      const pagamento = new Pagamento({
        cliente_id,
        valor_pago,
        data_pagamento,
      });

      const result = await PagamentoService.createPagamento(pagamento);
      return res.status(201).json({ pagamento: result });
    } catch (error: any) {
      console.error("Erro ao registrar pagamento", error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async getPagamento(req: Request, res: Response): Promise<any> {
    try {
      const { cliente_id } = req.body;

      const result = await PagamentoService.getPagamento(cliente_id);

      return res.status(200).json({ pagamento: result });
    } catch (error: any) {
      console.error("Erro ao buscar pagamentos", error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async getPagamentoById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      if (isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const result = await PagamentoService.getPagamentoById(Number(id));

      return res.status(200).json({ pagamento: result });
    } catch (error: any) {
      console.error("Erro ao buscar pagamento especifico", error);

      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  static async updatePagamento(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const { cliente_id, valor_pago, data_pagamento } = req.body;

      const pagamento = new Pagamento({
        cliente_id,
        valor_pago,
        data_pagamento,
      });

      if (isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const result = await PagamentoService.updatePagamento(
        Number(id),
        pagamento
      );

      return res.status(200).json({ pagamento: result });
    } catch (error: any) {
      console.error("Erro ao alterar pagamento", error);
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  static async deletePagamento(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      await PagamentoService.deletePagamento(Number(id));

      return res
        .status(200)
        .json({ message: "Pagamento deletado com sucesso" });
    } catch (error: any) {
      console.error("Erro ao deletar pagamento", error);
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
