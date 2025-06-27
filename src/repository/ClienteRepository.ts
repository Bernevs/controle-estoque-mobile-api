import pool from "../database";
import { Cliente } from "../model/Cliente";

export class ClienteRepository {
  static async createCliente(cliente: Cliente): Promise<Cliente> {
    const result = await pool.query(
      "INSERT INTO clientes (nome, status) VALUES ($1, $2) RETURNING *",
      [cliente.nome, cliente.status]
    );

    const row = result.rows[0];
    return new Cliente({ id: row.id, nome: row.nome, status: row.status });
  }

  static async getCliente(): Promise<Cliente[] | null> {
    const result = await pool.query("SELECT * FROM clientes WHERE status = 1");

    const row = result.rows;

    if (!row) {
      return null;
    }

    return row.map(
      (cliente: Cliente) =>
        new Cliente({
          id: cliente.id,
          nome: cliente.nome,
          status: cliente.status,
        })
    );
  }

  static async getClienteById(id: number): Promise<Cliente | null> {
    const result = await pool.query(
      "SELECT * FROM clientes WHERE id = $1 AND status = 1",
      [id]
    );

    const row = result.rows[0];

    if (!row) {
      return null;
    }

    return new Cliente({ id: row.id, nome: row.nome, status: row.status });
  }

  static async updateCliente(
    id: number,
    novoNome: string
  ): Promise<Cliente | null> {
    const result = await pool.query(
      "UPDATE clientes SET nome = $2 WHERE id = $1 RETURNING *",
      [id, novoNome]
    );

    const row = result.rows[0];

    if (!row) {
      return null;
    }

    return new Cliente({ id: row.id, nome: row.nome, status: row.status });
  }

  static async deleteCliente(id: number) {
    const result = await pool.query(
      "UPDATE clientes SET status = 0 WHERE id = $1",
      [id]
    );

    return result.rows[0];
  }
}
