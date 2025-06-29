import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export class ProdutoService {
  static async createProduto(produto: Produto): Promise<Produto> {
    const result = await ProdutoRepository.createProduto(produto);

    return result;
  }

  static async getProduto(): Promise<Produto[]> {
    const result = await ProdutoRepository.getProduto();

    return result;
  }

  static async getProdutoById(id: number): Promise<Produto> {
    const result = await ProdutoRepository.getProdutoById(id);

    if (!result) {
      throw new Error("Produto não encontrado");
    }

    return result;
  }

  static async updateProduto(produto: Produto): Promise<Produto> {
    const result = await ProdutoRepository.updateProduto(produto);

    return result;
  }

  static async deleteProduto(id: number) {
    const result = await ProdutoRepository.deleteProduto(id);

    return result;
  }
}
