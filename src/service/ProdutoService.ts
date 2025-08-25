import { NotFoundError } from "../errors/HttpError";
import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export class ProdutoService {
  static async createProduto(produto: Produto): Promise<Produto> {
    const result = await ProdutoRepository.createProduto(produto);

    return result;
  }

  static async getProduto(esgotado: boolean): Promise<Produto[]> {
    const result = await ProdutoRepository.getProduto(esgotado);

    return result;
  }

  static async getProdutoById(id: number): Promise<Produto> {
    const result = await ProdutoRepository.getProdutoById(id);

    if (!result) {
      throw new NotFoundError("Produto não encontrado");
    }

    return result;
  }

  static async getPrecoVenda(id: number): Promise<number> {
    const result = await ProdutoRepository.getPrecoVenda(id);

    if (!result) {
      throw new NotFoundError("Produto não encontrado");
    }

    return result;
  }

  static async updateProduto(produto: Produto): Promise<Produto> {
    const result = await ProdutoRepository.updateProduto(produto);

    if (!result) {
      throw new NotFoundError("Produto não encontrado");
    }

    return result;
  }

  static async deleteProduto(id: number) {
    const result = await ProdutoRepository.deleteProduto(id);

    if (!result) {
      throw new NotFoundError("Produto não encontrado");
    }

    return result;
  }
}
