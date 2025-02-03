export interface carro {
  id: number | null;
  nome: string;
  ano: number;
  quilometragem: number;
  valorBruto: number;
  concessionaria: string;
  placa: string;
  dono: number;
  valorLiquido: number;
  categoria: { id: number; nome?: string };
  cor: { id: number; nome?: string };
  fabricante: { id: number; nome?: string };
  combustivel: { id: number; nome?: string };
  observacoes: string;
  usuario: { id: number };
}
