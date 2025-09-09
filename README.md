# ⚙️ sistemaestoque-api

API desenvolvida em **Node.js** com **TypeScript** e hospedada na Vercel para gerenciar um sistema de estoque e vendas.  
Ela fornece os endpoints necessários para cadastro de clientes, produtos, pedidos e pagamentos, sendo consumida por um aplicativo mobile feito em **React Native com Expo**.

---

## 🚀 Funcionalidades

- 👤 **Clientes**
  - Cadastro, listagem, edição e remoção.

- 📦 **Produtos**
  - Cadastro de novos produtos.
  - Controle de estoque (quantidade disponível).
  - Atualização e exclusão.

- 🛒 **Pedidos**
  - Registro de pedidos vinculando clientes e produtos.
  - Controle de quantidades.

- 💳 **Pagamentos**
  - Registro de pagamentos de pedidos.
  - Suporte a diferentes métodos de pagamento (dinheiro, cartão, etc).

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (ou outro banco que você estiver usando)
- [Prisma](https://www.prisma.io/) *(se estiver usando como ORM)*
- Outras bibliotecas auxiliares

---


---

## 📱 Endpoints Principais

### Clientes
- `GET /clientes` – lista todos os clientes
- `POST /clientes` – cadastra um novo cliente
- `PUT /clientes/:id` – atualiza um cliente
- `DELETE /clientes/:id` – remove um cliente

### Produtos
- `GET /produtos` – lista todos os produtos
- `POST /produtos` – cadastra um novo produto
- `PUT /produtos/:id` – atualiza um produto
- `DELETE /produtos/:id` – remove um produto

### Pedidos
- `GET /pedidos` – lista todos os pedidos
- `POST /pedidos` – cria um novo pedido

### Pagamentos
- `GET /pagamentos` – lista pagamentos
- `POST /pagamentos` – registra um pagamento

---

## ▶️ Como Executar o Projeto

### Pré-requisitos
- Node.js instalado
- PostgreSQL rodando (ou outro banco configurado)
- `npm` ou `yarn` instalado


# Rode as migrations (se usar Prisma)
npx prisma migrate dev

# Inicie o servidor
npm run dev

