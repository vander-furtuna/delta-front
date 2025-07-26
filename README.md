<h1 align="center">
<img width="100%" alt="Octagon Banner" src="https://github.com/user-attachments/assets/2e28cc7a-4ff0-4f7f-88c4-eec74d8ed975">
</h1>

<h3 align="center">
Δ Delta
</h3>


<p align="center">Aprenda, ensine e pratique com o Delta.</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/vander-furtuna/delta-front?color=%23ffd96e">
  
  <a href="https://github.com/matheralvs/todo-list/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/vander-furtuna/delta-front?color=%23bde7ff">
  </a>

  <a href="https://github.com/matheralvs/todo-list/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/vander-furtuna/delta-front?color=%23dabcff">
  </a>
</p>

## ✅ Sobre o projeto

Delta App é uma plataforma web que visa facilitar a gestão e acesso monitorias e atividades de cursos dentro da Universidade Federal do Ceará.

O projeto foi desenvolvido durante a disciplina de Engenharia de Sofwate em 2025.1

## ⚙️ Tecnologias

Tecnologias utilizadas no desenvolvimento do site:


<div align="center"> 
  <div style="display: inline_block"><br>
  <img align="center" alt="TypeScript icon" title="TypeScript" height="56" width="56" src="https://user-images.githubusercontent.com/101757815/218615230-79d0d48c-800f-42ee-aa31-e65631f4a4d9.svg">
  <img align="center" alt="React.js icon" title="React.js" height="56" width="56" src="https://user-images.githubusercontent.com/101757815/218615819-bd5190f0-5501-4cb2-bffc-86f0b2d2039e.svg">
     <img align="center" alt="Next.js icon" title="Next.js" height="56" width="56" src="https://user-images.githubusercontent.com/101757815/218617171-46ee14bb-7a75-4068-b174-afd57d835c72.svg">
  <img align="center" alt="Tailwind CSS Icon" title="Tailwind CSS" height="56" width="56" src="https://github.com/user-attachments/assets/92dee76c-e17a-4b13-8d5e-ef2e3fc470a5">
    </div>
</div>


## 🚀 Rodando o projeto

### 1. Pré‑requisitos

- Node.js (versão ≥ 16)
- `pnpm` instalado globalmente:
  ```bash
  npm install -g pnpm
  ```

### 2. Clonar o repositório

```bash
git clone https://github.com/vander-furtuna/delta-front.git
cd delta-front
```

### 3. Criar o arquivo de variáveis de ambiente

1. Renomeie ou copie o template `.env.example` para `.env` na raiz do projeto:
   ```bash
   cp .env.example .env
   ```
2. Abra o `.env` e defina as suas variáveis (exemplo):
   ```env
   NEXT_PUBLIC_API_URL=https://api.exemplo.com
   ```

> **Dica:** mantenha o arquivo `.env` fora do controle de versão adicionando `/.env` no `.gitignore`.

### 4. Instalar dependências

```bash
pnpm install
```

### 5. Rodar em modo de desenvolvimento

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.\
A cada salvamento de arquivo, o Next.js recarrega automaticamente.

### 6. Build e produção

1. Gerar build otimizado:
   ```bash
   pnpm build
   ```
2. Iniciar em modo de produção:
   ```bash
   pnpm start
   ```

Por padrão, o app ficará disponível em [http://localhost:3000](http://localhost:3000).


