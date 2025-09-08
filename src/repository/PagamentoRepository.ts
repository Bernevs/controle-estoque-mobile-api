import pool from "../database";
import { Pagamento } from "../model/Pagamento";

export class PagamentoRepository {
  static async createPagamento(pagamento: Pagamento): Promise<Pagamento> {
    const result = await pool.query(
      "INSERT INTO pagamentos (cliente_id, valor_pago, data_pagamento) VALUES ($1, $2, $3) RETURNING *",
      [pagamento.cliente_id, pagamento.valor_pago, pagamento.data_pagamento]
    );

    const row: Pagamento = result.rows[0];

    return new Pagamento({
      id: row.id,
      cliente_id: row.cliente_id,
      valor_pago: row.valor_pago,
      data_pagamento: row.data_pagamento,
    });
  }

  static async getPagamento(cliente_id: number): Promise<Pagamento[]> {
    const result = await pool.query(
      "SELECT * FROM pagamentos WHERE cliente_id = $1 ORDER BY id",
      [cliente_id]
    );

    const row: Pagamento[] = result.rows;

    return row.map(
      (pagamento: Pagamento) =>
        new Pagamento({
          id: pagamento.id,
          cliente_id: pagamento.cliente_id,
          valor_pago: pagamento.valor_pago,
          data_pagamento: pagamento.data_pagamento,
        })
    );
  }

  static async getValorPago(cliente_id: number): Promise<number> {
    const result = await pool.query(
      "SELECT SUM(valor_pago) FROM pagamentos WHERE cliente_id = $1",
      [cliente_id]
    );

    const row = result.rows[0];

    if (!row || !row.sum) {
      return 0;
    }

    return Number(row.sum);
  }

  static async getPagamentoById(id: number): Promise<Pagamento | null> {
    const result = await pool.query("SELECT * FROM pagamentos WHERE id = $1", [
      id,
    ]);

    const row: Pagamento = result.rows[0];

    if (!row) {
      return null;
    }

    return new Pagamento({
      id: row.id,
      cliente_id: row.cliente_id,
      valor_pago: row.valor_pago,
      data_pagamento: row.data_pagamento,
    });
  }

  static async updatePagamento(
    id: number,
    pagamento: Pagamento
  ): Promise<Pagamento | null> {
    const result = await pool.query(
      "UPDATE pagamentos SET valor_pago = $2, data_pagamento = $3 WHERE id = $1 RETURNING *",
      [id, pagamento.valor_pago, pagamento.data_pagamento]
    );

    const row: Pagamento = result.rows[0];

    if (!row) {
      return null;
    }

    return new Pagamento({
      id: row.id,
      cliente_id: row.cliente_id,
      valor_pago: row.valor_pago,
      data_pagamento: row.data_pagamento,
    });
  }

  static async deletePagamento(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM pagamentos WHERE id = $1", [
      id,
    ]);

    if (result.rowCount == 1) {
      return true;
    }

    return false;
  }
}
