import { Pedido } from "../model/Pedido";
import { PedidoRepository } from "../repository/PedidoRepository";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export class PedidoService {
  static async createPedido(pedido: Pedido) {
    const result = await PedidoRepository.createPedido(pedido);
    await ProdutoRepository.atualizarEstoque(
      pedido.produto_id,
      pedido.quantidade
    );

    return result;
  }

  static async getPedido(cliente_id: number) {
    const result = await PedidoRepository.getPedido(cliente_id);

    return result;
  }

  static async getPedidoById(id: number) {
    const result = await PedidoRepository.getPedidoById(id);

    return result;
  }

  static async deletePedido(id: number): Promise<boolean> {
    return await PedidoRepository.deletePedido(id);
  }
}
