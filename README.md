# 👨‍💻‍ Sobre o projeto

Esse projeto é um frontend para a [Free Dictionary API](https://dictionaryapi.dev/).
Peguei a [ideia](https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL) dele no site [Frontend Mentor](https://www.frontendmentor.io/)
com o objetivo de aprender a codificar designs do Figma, mas no final acabei aprendendo muito mais coisas como por exemplo: uso de `localStorage` e `sessionStorage`
para cache, como usar o tailwind para implementar o dark mode, como detectar a preferência de tema do usuário utilizando a propriedade
`window.matchMedia("(prefers-color-scheme: dark)").matches` e como manipular o histórico do navegador usando o método `window.history.pushState()`.

### ⚙️ Funcionalidades

- Pesquisar por palavras usando tanto o campo de input como também a URL com a rota `/:palavraPesquisada`;
- Focar no input usando a tecla `/`;
- Desfocar do input usando a tecla `ESC`;
- Validação do formulário;
- Ouvir o áudio da palavra, quando disponível;
- Ver a fonética da palavra, quando disponível;
- Alterar a fonte da página entre serif, sans serif e monospace;
- Alterar tema da página entre claro e escuro. Na primeira interação com a página, o tema é escolhido de acordo com a preferência do sistema do usuário.

### 🧰 Ferramentas Utilizadas

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind](https://tailwindcss.com/)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## 💿 Como rodar na sua máquina

### Pré-requisitos

- **Git**;
- **Node + NPM**;

```shell
# Clone o repositório na sua máquina
$ git clone https://github.com/lleonardus/dictionary

# Abra a pasta do projeto
$ cd dictionary

# Instale as dependências
$ npm i

# Inicie o projeto
$ npm run dev
```

Após esse processo, o App vai estar rodando em **http://localhost:5173**
