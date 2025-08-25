import pool from "../database";
import { Produto } from "../model/Produto";

export class ProdutoRepository {
  static async createProduto(produto: Produto): Promise<Produto> {
    const result = await pool.query(
      "INSERT INTO produtos (nome, preco_compra, preco_venda, quantidade, automatico, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        produto.nome,
        produto.preco_compra,
        produto.preco_venda,
        produto.quantidade,
        produto.automatico,
        produto.status,
      ]
    );

    const row: Produto = result.rows[0];

    return new Produto({
      id: row.id,
      nome: row.nome,
      preco_compra: row.preco_compra,
      preco_venda: row.preco_venda,
      quantidade: row.quantidade,
      status: row.status,
    });
  }

  static async getProduto(esgotado: boolean): Promise<Produto[]> {
    let query = "SELECT * FROM produtos WHERE status = 1";
    const order = " ORDER BY nome ASC;";

    if (esgotado) {
      query += " AND quantidade = 0";
    } else {
      query += " AND quantidade > 0";
    }

    const result = await pool.query(query + order);

    const row: Produto[] = result.rows;

    return row.map(
      (produto: Produto) =>
        new Produto({
          id: produto.id,
          nome: produto.nome,
          preco_compra: produto.preco_compra,
          preco_venda: produto.preco_venda,
          quantidade: produto.quantidade,
          automatico: produto.automatico,
          status: produto.status,
        })
    );
  }

  static async getProdutoById(id: number): Promise<Produto | null> {
    const result = await pool.query(
      "SELECT * FROM produtos WHERE id = $1 AND status = 1",
      [id]
    );

    const row: Produto = result.rows[0];

    if (!row) {
      return null;
    }

    return new Produto({
      id: row.id,
      nome: row.nome,
      preco_compra: row.preco_compra,
      preco_venda: row.preco_venda,
      quantidade: row.quantidade,
      automatico: row.automatico,
      status: row.status,
    });
  }

  static async getPrecoVenda(id: number): Promise<number | null> {
    const result = await pool.query(
      "SELECT preco_venda FROM produtos WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0].preco_venda;
  }

  static async updateProduto(produto: Produto): Promise<Produto | null> {
    const result = await pool.query(
      "UPDATE produtos SET nome = $2, preco_compra = $3, preco_venda = $4, quantidade = $5 WHERE id = $1 AND status = 1 RETURNING*",
      [
        produto.id,
        produto.nome,
        produto.preco_compra,
        produto.preco_venda,
        produto.quantidade,
      ]
    );

    const row: Produto = result.rows[0];

    if (!row) {
      return null;
    }

    return new Produto({
      id: row.id,
      nome: row.nome,
      preco_compra: row.preco_compra,
      preco_venda: row.preco_venda,
      quantidade: row.quantidade,
      automatico: row.automatico,
      status: row.status,
    });
  }

  static async atualizarEstoque(
    id: number,
    quantidade: number
  ): Promise<boolean> {
    const result = await pool.query(
      "UPDATE produtos SET quantidade = quantidade - $2 WHERE id = $1 AND quantidade >= $2",
      [id, quantidade]
    );

    if (result.rowCount == 1) {
      return true;
    }

    return false;
  }

  static async deleteProduto(id: number) {
    const result = await pool.query(
      "UPDATE produtos SET status = 0 WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows;
  }
}
