import { Livro, StatusLeitura, Genero } from './types';

export const INITIAL_BOOKS: Livro[] = [
  {
    id: '1',
    titulo: "Cem Anos de Solidão",
    autor: "Gabriel García Márquez",
    genero: "Realismo Mágico",
    ano: 1967,
    paginas: 417,
    paginaAtual: 417,
    avaliacao: 5,
    sinopse: "A história de várias gerações da família Buendía, cujo patriarca, José Arcadio Buendía, fundou a cidade de Macondo.",
    capa: "https://picsum.photos/seed/solitude/300/450",
    status: StatusLeitura.LIDO,
    notas: "Uma obra-prima da literatura latino-americana."
  },
  {
    id: '2',
    titulo: "Duna",
    autor: "Frank Herbert",
    genero: "Ficção Científica",
    ano: 1965,
    paginas: 412,
    paginaAtual: 250,
    avaliacao: 5,
    sinopse: "A história do jovem Paul Atreides, cuja família aceita a administração do planeta deserto Arrakis.",
    capa: "https://picsum.photos/seed/dune/300/450",
    status: StatusLeitura.LENDO,
    notas: "A especiaria deve fluir."
  },
  {
    id: '3',
    titulo: "O Guia do Mochileiro das Galáxias",
    autor: "Douglas Adams",
    genero: "Ficção Científica",
    ano: 1979,
    paginas: 224,
    paginaAtual: 0,
    avaliacao: 4,
    sinopse: "Segundos antes da Terra ser demolida para dar lugar a uma via expressa galáctica, Arthur Dent é resgatado do planeta por seu amigo Ford Prefect.",
    capa: "https://picsum.photos/seed/hitchhiker/300/450",
    status: StatusLeitura.QUERO_LER,
    notas: ""
  },
  {
    id: '4',
    titulo: "Código Limpo",
    autor: "Robert C. Martin",
    genero: "Programação",
    ano: 2008,
    paginas: 464,
    paginaAtual: 464,
    avaliacao: 5,
    sinopse: "Um manual de artesanato de software ágil. O livro foi dividido em três partes.",
    capa: "https://picsum.photos/seed/cleancode/300/450",
    status: StatusLeitura.LIDO,
    notas: "Essencial para qualquer desenvolvedor."
  },
  {
    id: '5',
    titulo: "Sapiens: Uma Breve História da Humanidade",
    autor: "Yuval Noah Harari",
    genero: "História",
    ano: 2011,
    paginas: 443,
    paginaAtual: 120,
    avaliacao: 4,
    sinopse: "Explora a história da humanidade, desde a Idade da Pedra até as revoluções políticas e tecnológicas do século XXI.",
    capa: "https://picsum.photos/seed/sapiens/300/450",
    status: StatusLeitura.PAUSADO,
    notas: "Perspicaz, mas denso."
  }
];