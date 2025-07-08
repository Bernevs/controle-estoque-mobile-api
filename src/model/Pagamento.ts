interface PagamentoProps {
  id?: number;
  cliente_id: number;
  valor_pago: number;
  data_pagamento: Date;
}

export class Pagamento {
  id?: number;
  cliente_id: number;
  valor_pago: number;
  data_pagamento: Date;

  constructor({ id, cliente_id, valor_pago, data_pagamento }: PagamentoProps) {
    this.id = id;
    this.cliente_id = cliente_id;
    this.valor_pago = valor_pago;
    this.data_pagamento = data_pagamento;
  }
}
