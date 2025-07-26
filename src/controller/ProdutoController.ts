import { Request, Response } from "express";
import { Produto } from "../model/Produto";
import { ProdutoService } from "../service/ProdutoService";
const pdfParse = require("pdf-parse");

export class ProdutoController {
  static async createProduto(req: Request, res: Response): Promise<any> {
    try {
      const { nome, preco_compra, preco_venda, quantidade, automatico } =
        req.body;

      const produto = new Produto({
        nome: nome,
        preco_compra: preco_compra,
        preco_venda: preco_venda,
        quantidade: quantidade,
        automatico: automatico,
        status: 1,
      });

      const result = await ProdutoService.createProduto(produto);

      return res.status(201).json({ produto: result });
    } catch (error: any) {
      console.error("Erro ao criar Produto", error);
      return res.status(500).json({ message: error.message, error: true });
    }
  }

  static async getProduto(req: Request, res: Response): Promise<any> {
    try {
      const result = await ProdutoService.getProduto();

      return res.status(200).json({ produto: result });
    } catch (error: any) {
      console.error("Erro ao buscar Produto", error);
      return res.status(500).json({ message: error.message, error: true });
    }
  }

  static async getProdutoById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido", error: true });
      }

      const result = await ProdutoService.getProdutoById(Number(id));

      return res.status(200).json({ produto: result });
    } catch (error: any) {
      console.error("Erro ao buscar Produto unico", error);
      return res.status(500).json({ message: error.message, error: true });
    }
  }

  static async updateProduto(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const { nome, preco_venda, preco_compra, quantidade } = req.body;

      const produto = new Produto({
        id: Number(id),
        nome: nome,
        preco_compra: preco_compra,
        preco_venda: preco_venda,
        quantidade: quantidade,
      });

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido", error: true });
      }

      const result = await ProdutoService.updateProduto(produto);
      return res
        .status(200)
        .json({ message: "Produto alterado com sucesso", produto: result });
    } catch (error: any) {
      console.error("Erro ao alterar Produto", error);
      return res.status(500).json({ message: error.message, error: true });
    }
  }

  static async deleteProduto(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido", error: true });
      }

      await ProdutoService.deleteProduto(Number(id));

      return res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error: any) {
      console.error("Erro ao deletar Produto", error);
      return res.status(500).json({ message: error.message, error: true });
    }
  }

  static async getPDF(req: Request, res: Response) {
    try {
      const { base64 } = req.body;

      const pdfBuffer = Buffer.from(base64, "base64");
      const data = await pdfParse(pdfBuffer);
      const textoBruto = data.text;

      const linhas = textoBruto
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l !== "");

      const linhasProdutos = linhas.filter((linha: string) =>
        /^\d{1,2}[A-Z]/.test(linha)
      );

      const produtos = linhasProdutos
        .map((linha: string) => {
          const match = linha.match(
            /^(\d{1,2})\s*(.+?)\s*(\d+),0000PC([\d,]+)/i
          );

          if (match) {
            return {
              codigoItem: match[1],
              nome: match[2].trim(),
              quantidade: match[3],
              valorUnitario: match[4],
            };
          }

          return null;
        })
        .filter(Boolean);

      res.status(200).json({ produto: produtos });
    } catch (error: any) {
      console.error("Erro ao processar PDF:", error);
      res.status(500).json({ erro: "Falha ao processar o PDF" });
    }
  }
}
