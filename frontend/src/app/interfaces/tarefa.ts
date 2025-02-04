export interface tarefa {
    id: number;
    nome: string;
    descricao: string;
    data: string; 
    status: 'Pendente' | 'EmAndamento' | 'Concluida'; 
    usuarioId: number;
    // usuario: Usuario; 
  }