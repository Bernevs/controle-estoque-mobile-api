import { NotFoundError } from "../errors/HttpError";
import { Cliente } from "../model/Cliente";
import { ClienteRepository } from "../repository/ClienteRepository";

export class ClienteService {
  static async createCliente(cliente: Cliente): Promise<Cliente> {
    const result = await ClienteRepository.createCliente(cliente);

    return result;
  }

  static async getCliente(): Promise<Cliente[] | null> {
    const result = await ClienteRepository.getCliente();

    return result;
  }

  static async getClienteById(id: number): Promise<Cliente | null> {
    const result = await ClienteRepository.getClienteById(id);

    if (!result) {
      throw new NotFoundError("Cliente não encontrado");
    }

    return result;
  }

  static async getValorCliente() {
    const result = await ClienteRepository.getValorCliente();

    return result;
  }

  static async updateCliente(id: number, novoNome: string) {
    const result = await ClienteRepository.updateCliente(id, novoNome);

    if (!result) {
      throw new NotFoundError("Cliente não encontrado");
    }

    return result;
  }

  static async deleteCliente(id: number) {
    const result = await ClienteRepository.deleteCliente(id);

    if (!result) {
      throw new NotFoundError("Cliente não encontrado");
    }

    return result;
  }
}
