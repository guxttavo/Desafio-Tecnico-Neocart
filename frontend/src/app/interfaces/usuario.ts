import { tarefa } from "./tarefa";

export interface usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    tarefas?: tarefa[];
  }
  