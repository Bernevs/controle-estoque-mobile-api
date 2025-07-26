interface ProdutoProps {
  id?: number;
  nome: string;
  preco_compra: number;
  preco_venda: number;
  quantidade: number;
  automatico?: number;
  status?: number;
}

export class Produto {
  id?: number;
  nome: string;
  preco_compra: number;
  preco_venda: number;
  quantidade: number;
  automatico?: number;
  status?: number;

  constructor({
    id,
    nome,
    preco_compra,
    preco_venda,
    quantidade,
    automatico,
    status,
  }: ProdutoProps) {
    this.id = id;
    this.nome = nome;
    this.preco_compra = preco_compra;
    this.preco_venda = preco_venda;
    this.quantidade = quantidade;
    this.automatico = automatico;
    this.status = status;
  }
}
