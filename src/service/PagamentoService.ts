import { NotFoundError } from "../errors/NotFoundError";
import { Pagamento } from "../model/Pagamento";
import { PagamentoRepository } from "../repository/PagamentoRepository";

export class PagamentoService {
  static async createPagamento(pagamento: Pagamento): Promise<Pagamento> {
    const result = await PagamentoRepository.createPagamento(pagamento);

    return result;
  }

  static async getPagamento(cliente_id: number): Promise<Pagamento[]> {
    const result = await PagamentoRepository.getPagamento(cliente_id);

    return result;
  }

  static async getPagamentoById(id: number): Promise<Pagamento> {
    const result = await PagamentoRepository.getPagamentoById(id);

    if (!result) {
      throw new NotFoundError("Pagamento não encontrado");
    }

    return result;
  }

  static async updatePagamento(id: number, pagamento: Pagamento) {
    await this.getPagamentoById(id);

    return await PagamentoRepository.updatePagamento(id, pagamento);
  }

  static async deletePagamento(id: number) {
    await this.getPagamentoById(id);

    return await PagamentoRepository.deletePagamento(id);
  }
}
