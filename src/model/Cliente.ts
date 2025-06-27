interface ClienteProps {
  id?: number;
  nome: string;
  status: number;
}

export class Cliente {
  id?: number;
  nome: string;
  status: number;

  constructor({ id, nome, status }: ClienteProps) {
    this.id = id;
    this.nome = nome;
    this.status = status;
  }
}
