# 📚 BookShelf

BookShelf é uma aplicação web para **gerenciamento de biblioteca pessoal**, desenvolvida em **React 19** com **Vite**.  
Ela permite cadastrar, organizar e acompanhar o progresso de leitura dos seus livros, com interface simples e responsiva.  

Atualmente, os dados são salvos no **LocalStorage** do navegador, o que garante persistência local sem necessidade de backend.  

---

## 🚀 Tecnologias Utilizadas

- **Vite** (bundler e dev server)  
- **React 19**  
- **TypeScript**  
- **Tailwind CSS (via CDN)**  
- **LocalStorage** para persistência de dados  

---

## 🛠️ Funcionalidades

### 1. Dashboard Principal
- Estatísticas da biblioteca:
  - Total de livros cadastrados  
  - Livros em leitura  
  - Livros finalizados  
  - Total de páginas lidas  

### 2. Biblioteca de Livros
- Exibição em **cards**  
- Cada card mostra:
  - 📖 Capa do livro (com fallback padrão)  
  - ✍️ Autor  
  - 📅 Ano de publicação  
  - ⭐ Avaliação por estrelas (1–5)  
  - Botões para visualizar, editar e excluir  

### 3. Gerenciamento de Livros
- **Adicionar novo livro** com formulário validado  
- **Editar livro** com formulário pré-preenchido  
- **Excluir livro** com confirmação  
- **Visualizar detalhes completos**, incluindo sinopse e progresso  

### 4. Autenticação Simples
- Tela de **login** com persistência via LocalStorage  
- Áreas restritas (Dashboard e formulários) só acessíveis após login  
- **Logout** disponível no cabeçalho  

### 5. Dark Mode
- Suporte a **tema escuro**  
- Preferência salva em LocalStorage  
- Detecta automaticamente o tema do sistema operacional  

### 6. Feedback e UX
- **Toasts** para confirmar ações (sucesso/erro)  
- Navegação fluida entre telas  
- Layout responsivo  

---

## 📂 Estrutura do Projeto

src/
├── App.tsx # Componente principal
├── index.tsx # Ponto de entrada React
├── index.html # HTML base (configura dark mode)
├── components/ # Componentes UI
├── hooks/ # Hooks customizados (useLocalStorage)
├── constants/ # Dados iniciais (INITIAL_BOOKS)
├── types/ # Tipagem TypeScript


---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- **Node.js** 18 ou superior  
- **npm** ou **yarn**

### Passos
```bash
# Instalar dependências
npm install

# Rodar localmente
npm run dev

# Gerar build de produção
npm run build

# Pré-visualizar build
npm run preview

🔮 Próximos Passos (Roadmap)

 Migrar armazenamento de LocalStorage → SQLite com Prisma ORM

 Criar API Routes para manipulação de dados

 Expandir modelo de livros com novos campos (ISBN, notas, progresso)

 Melhorar sistema de autenticação

📸 Preview

(adicione aqui prints da aplicação rodando quando quiser)

📜 Licença

Distribuído sob a licença MIT.
