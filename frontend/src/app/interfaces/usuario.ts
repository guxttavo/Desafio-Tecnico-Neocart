export interface usuario {
  id: number | null;
  nome: string;
  email: string;
  cpf: number;
  telefone: number;
  senha: string;
  cep: number;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  carros?: { id: number } | null
}
