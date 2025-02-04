import { tarefa } from "./tarefa";

export interface usuario {
  id?: number | null;
  nome: string;
  email: string;
  senha: string;
}
