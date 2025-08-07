import { Request, Response } from "express";
import { PedidoService } from "../service/pedidoService";
import { Pedido } from "../model/Pedido";
import { ProdutoService } from "../service/ProdutoService";

export class PedidoController {
  static async createPedido(req: Request, res: Response): Promise<any> {
    try {
      const pedidos_criados = await Promise.all(
        req.body.map(async (pedido: any) => {
          const cliente_id = pedido.cliente_id;
          const produto_id = pedido.produto_id;
          const quantidade = pedido.quantidade;

          const preco_venda =
            (await ProdutoService.getPrecoVenda(Number(produto_id))) *
            quantidade;

          const novo_pedido: Pedido = {
            cliente_id,
            produto_id,
            preco_venda,
            quantidade,
          };

          const result = await PedidoService.createPedido(novo_pedido);
          return result;
        })
      );
      return res.status(201).json({ pedido: pedidos_criados });
    } catch (error: any) {
      console.error("Erro ao criar Pedido", error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async getPedido(req: Request, res: Response): Promise<any> {
    try {
      const { cliente_id } = req.params;
      const result = await PedidoService.getPedido(Number(cliente_id));
      return res.status(200).json({ pedido: result });
    } catch (error: any) {
      console.error("Erro ao buscar Pedido", error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async getPedidoById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const result = await PedidoService.getPedidoById(Number(id));
      return res.status(200).json({ pedido: result });
    } catch (error: any) {
      console.error("Erro ao buscar Pedido unico", error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async deletePedido(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      await PedidoService.deletePedido(Number(id));

      return res.status(200).json({ message: "Pedido deletado com sucesso" });
    } catch (error: any) {
      console.error("Erro ao deletar Pedido", error);
      return res.status(500).json({ message: error.message });
    }
  }
}
