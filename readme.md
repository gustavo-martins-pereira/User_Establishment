# API de Estabelecimento de Usuários

API backend para gerenciamento de estabelecimentos de usuários, construída com TypeScript e Express. Este projeto fornece uma API robusta para manipulação de dados de estabelecimentos com integração AWS DynamoDB para persistência de dados.

## Sumário

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação](#-instalação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Rotas da API](#-rotas-da-api)

## 🖥️ Tecnologias Utilizadas

<img alt="TypeScript Logo" height="60" width="60" src="./readme/typescript.svg" />&nbsp;
<img alt="Nodejs Logo" height="60" width="60" src="./readme/nodejs.svg" />&nbsp;
<img alt="Express Logo" height="60" width="60" src="./readme/express.svg" />&nbsp;
<img alt="AWS Logo" height="60" width="60" src="./readme/aws.svg" />&nbsp;
<img alt="DynamoDB Logo" height="60" width="60" src="./readme/dynamodb.svg" />&nbsp;

## ⚙️ Instalação

Instruções para configurar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/) ou [NVM](https://github.com/nvm-sh/nvm)

> ⚠️ O projeto foi construído com Node.js versão **v22.14.0**. Versões anteriores/posteriores podem não ser compatíveis. Se você tiver o **NVM** instalado, você pode instalar a versão correspondente com estes comandos:
```bash
# instala o nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# baixa e instala o Node.js (você pode precisar reiniciar o terminal)
nvm install 22.14.0

# verifica se a versão correta do Node.js está no ambiente
node -v # deve imprimir `v22.14.0`

# verifica se a versão correta do npm está no ambiente
npm -v
```

### Passos

1. Clone o repositório:
```sh
git clone https://github.com/gustavo-martins-pereira/User_Establishment.git
```

2. Navegue até o diretório do projeto:
```sh
cd User_Establishment
```

3. Instale as dependências:
```sh
npm install
```

4. Configure o arquivo `.env`:
> Você precisará configurar suas credenciais AWS e configuração do DynamoDB no arquivo `.env`. Certifique-se de ter uma conta AWS e as permissões necessárias para acessar o DynamoDB.

5. Configure o banco de dados:
```bash
npm run setup-db
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 📁 Estrutura do Projeto

```
/src
├── /aws
│   └── /dynamodb
├── /configs
├── /controllers
│   └── establishmentController.ts
├── /middlewares
├── /models
├── /repositories
├── /routes
│   ├── /validators
│   └── routes.ts
├── /services
│   └── /establishment
├── /utils
│   ├── /configs
│   ├── /handles
│   └── /errors
└── server.ts
.env
.env.example
.gitignore
LICENSE
package.json
readme.md
```

O projeto segue um padrão de arquitetura limpa com clara separação de responsabilidades:
- `aws`: Api para os serviços da AWS
- `configs`: Configurações da aplicação
- `controllers`: Manipulam requisições e respostas HTTP
- `middlewares`: Middlewares para as rotas da aplicação
- `models`: Modelo das entidades
- `respositories`: Arquivos de comunicação com os bancos de dados ou serviços da aplicação (como a aws)
- `services`: Contêm a lógica de negócios
- `routes`: Definem os endpoints da API e manipuladores de rotas
- `utils`: Contém funções utilitárias

## 🛣️ Rotas da API

### Usuários
- `POST /users` - Criar um novo usuário
- `GET /users/:id` - Obter usuário por ID
- `GET /users` - Obter todos os usuários
- `PUT /users/:id` - Atualizar usuário por ID
- `DELETE /users/:id` - Deletar usuário por ID

### Estabelecimentos
- `POST /establishments` - Criar um novo estabelecimento
- `GET /establishments/:id` - Obter estabelecimento por ID
- `GET /establishments/type/:type` - Obter estabelecimentos por tipo
- `GET /establishments` - Obter todos os estabelecimentos
- `PUT /establishments/:id` - Atualizar estabelecimento por ID
- `DELETE /establishments/:id` - Deletar estabelecimento por ID

### Produtos
- `POST /products` - Criar um novo produto
- `GET /products/:id` - Obter produto por ID
- `GET /products` - Obter todos os produtos
- `PUT /products/:id` - Atualizar produto por ID
- `DELETE /products/:id` - Deletar produto por ID

### Regras de Estabelecimento
- `POST /establishment-rules` - Criar uma nova regra de estabelecimento
- `GET /establishment-rules/establishment/:establishmentId` - Obter regras por ID do estabelecimento
- `PUT /establishment-rules/:id` - Atualizar regra de estabelecimento por ID
- `DELETE /establishment-rules/:id` - Deletar regra de estabelecimento por ID
