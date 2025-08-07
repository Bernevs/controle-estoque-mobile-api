interface PedidoProps {
  id?: number;
  cliente_id: number;
  produto_id: number;
  preco_venda: number;
  quantidade: number;
}

export class Pedido {
  id?: number;
  cliente_id: number;
  produto_id: number;
  preco_venda: number;
  quantidade: number;

  constructor({
    id,
    cliente_id,
    produto_id,
    preco_venda,
    quantidade,
  }: PedidoProps) {
    this.id = id;
    this.cliente_id = cliente_id;
    this.produto_id = produto_id;
    this.preco_venda = preco_venda;
    this.quantidade = quantidade;
  }
}
