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

    return result;
  }

  static async updateCliente(id: number, novoNome: string) {
    const existe = await ClienteService.getClienteById(id);

    if (!existe) {
      throw new Error("Cliente não encontrado");
    }

    const result = await ClienteRepository.updateCliente(id, novoNome);

    return result;
  }

  static async deleteCliente(id: number) {
    const existe = await ClienteService.getClienteById(id);

    if (!existe) {
      throw new Error("Cliente não encontrado");
    }

    const result = await ClienteRepository.deleteCliente(id);

    return result;
  }
}
