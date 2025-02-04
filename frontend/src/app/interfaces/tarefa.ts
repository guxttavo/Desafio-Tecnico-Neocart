import { usuario } from "./usuario";

export interface tarefa {
  id: number | null;
  nome: string;
  descricao: string;
  data: string;
  status: 'Pendente' | 'EmAndamento' | 'Concluida';
  usuarioId: { id: number };
}