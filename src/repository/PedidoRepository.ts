import pool from "../database";
import { Pedido } from "../model/Pedido";

export class PedidoRepository {
  static async createPedido(pedido: Pedido) {
    const result = await pool.query(
      "INSERT INTO pedidos (cliente_id, produto_id, preco_venda, quantidade) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        pedido.cliente_id,
        pedido.produto_id,
        pedido.preco_venda,
        pedido.quantidade,
      ]
    );

    const row: Pedido = result.rows[0];

    return new Pedido({
      id: row.id,
      cliente_id: row.cliente_id,
      produto_id: row.produto_id,
      preco_venda: row.preco_venda,
      quantidade: row.quantidade,
    });
  }

  static async getPedido(cliente_id: number): Promise<Pedido[]> {
    const result = await pool.query(
      "SELECT * FROM pedidos WHERE cliente_id = $1",
      [cliente_id]
    );

    const row: Pedido[] = result.rows;

    return row.map(
      (pedido: Pedido) =>
        new Pedido({
          id: pedido.id,
          cliente_id: pedido.cliente_id,
          produto_id: pedido.produto_id,
          preco_venda: pedido.preco_venda,
          quantidade: pedido.quantidade,
        })
    );
  }

  static async getPedidoById(id: number): Promise<Pedido> {
    const result = await pool.query("SELECT * FROM pedidos WHERE id = $1", [
      id,
    ]);
    const row: Pedido = result.rows[0];

    return new Pedido({
      id: row.id,
      cliente_id: row.cliente_id,
      produto_id: row.produto_id,
      preco_venda: row.preco_venda,
      quantidade: row.quantidade,
    });
  }

  static async deletePedido(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM pedidos WHERE id = $1", [id]);

    if ((result.rowCount = 1)) {
      return true;
    }

    return false;
  }
}
