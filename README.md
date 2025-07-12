# Projeto de Gestão de Funcionários

## Sobre o projeto

Este projeto é uma aplicação web para gerenciar informações de funcionários, permitindo a visualização de uma lista com detalhes como nome, cargo, data de admissão, telefone e foto. A interface é responsiva, adaptando-se para diferentes tamanhos de tela, com uma tabela dinâmica que suporta expansão de linhas para visualizar informações adicionais.

A aplicação utiliza React com TypeScript, Material-UI para componentes visuais, Redux para gerenciamento de estado, e faz requisições a uma API REST para buscar os dados dos funcionários.

O projeto foi criado utilizando [Vite](https://vitejs.dev/), que oferece um ambiente de desenvolvimento rápido e moderno.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) para gerenciamento de pacotes
- Acesso à API backend que fornece os dados dos funcionários (deve estar rodando e acessível)

---

## Instruções para rodar a aplicação

1. **Clone este repositório**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. **Instale as dependências**

Usando npm:

```bash
npm install
```

Ou usando yarn:

```bash
yarn install
```

3. **Execute a aplicação em modo de desenvolvimento**

```bash
npm run dev
```

Ou com yarn:

```bash
yarn dev
```

4. **Abra o navegador**

Acesse [http://localhost:5173](http://localhost:5173) para visualizar a aplicação rodando localmente (porta padrão do Vite).

---

## Tecnologias utilizadas

- React + TypeScript
- Redux Toolkit
- Material-UI (MUI)
- Axios para chamadas HTTP
- Styled-components para estilos
- API REST para dados dos funcionários
- Vite como bundler e ambiente de desenvolvimento
