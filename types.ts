export const Generos = [
    "Literatura", "Ficção Científica", "Realismo Mágico", "Ficção", 
    "Fantasia", "Romance", "Biografia", "História", "Autoajuda", 
    "Tecnologia", "Programação", "Negócios", "Psicologia", "Filosofia", "Poesia"
] as const;

export type Genero = typeof Generos[number];

export enum StatusLeitura {
    QUERO_LER = "Quero Ler",
    LENDO = "Lendo",
    LIDO = "Lido",
    PAUSADO = "Pausado",
    ABANDONADO = "Abandonado"
}

export interface Livro {
  id: string;
  titulo: string;
  autor: string;
  genero: Genero;
  ano?: number;
  paginas?: number;
  paginaAtual?: number;
  avaliacao?: number; // 1-5
  sinopse?: string;
  capa?: string; // URL or base64
  status: StatusLeitura;
  notas?: string;
  arquivoPdf?: string; // Base64 data URL
}

export type View = 
  | { type: 'DASHBOARD' }
  | { type: 'LIBRARY' }
  | { type: 'ADD_BOOK' }
  | { type: 'VIEW_BOOK'; bookId: string }
  | { type: 'EDIT_BOOK'; bookId: string }
  | { type: 'LOGIN' };