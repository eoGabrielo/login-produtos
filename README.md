# Sistema de Login e Cadastro de Produtos

Um sistema web completo desenvolvido em Node.js com autenticação JWT e gerenciamento de produtos. O projeto inclui um backend robusto com MongoDB e um frontend responsivo.

## 🚀 Funcionalidades

### Autenticação
- **Cadastro de usuários** com senha criptografada
- **Login com JWT** (JSON Web Token)
- **Verificação de token** para rotas protegidas
- **Validação de dados** no backend

### Gerenciamento de Produtos
- **Cadastro de produtos** com informações completas
- **Listagem de produtos** em tabela responsiva
- **Exclusão de produtos** com confirmação
- **Atualização de estoque** em tempo real
- **Busca e filtros** por produtos

### Interface
- **Design responsivo** para desktop e mobile
- **Navegação intuitiva** entre páginas
- **Feedback visual** para ações do usuário
- **Validação de formulários** no frontend

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação com tokens
- **bcryptjs** - Criptografia de senhas
- **dotenv** - Variáveis de ambiente

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização responsiva
- **JavaScript** - Interatividade
- **Fetch API** - Comunicação com backend

## 📁 Estrutura do Projeto

```
login-produtos/
├── controllers/
│   └── authController.js      # Lógica de autenticação e produtos
├── models/
│   └── Schema.js             # Modelos do MongoDB
├── mongodb/
│   └── db.js                 # Conexão com banco de dados
├── routes/
│   └── authRoutes.js         # Rotas da API
├── public/
│   ├── index.html            # Página principal
│   ├── loginCadastro.html    # Login e cadastro
│   ├── cadastroProdutos.html # Formulário de produtos
│   ├── listaProdutos.html    # Lista de produtos
│   ├── dashboard.html        # Dashboard do usuário
│   ├── style.css             # Estilos gerais
│   ├── stylef.css            # Estilos de formulários
│   ├── styleProdutos.css     # Estilos da lista de produtos
│   └── stylespage.css        # Estilos da página principal
├── server.js                 # Servidor Express
├── package.json              # Dependências e scripts
└── README.md                 # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB instalado e rodando
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/login-produtos.git
cd login-produtos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/login-produtos
JWT_SECRET=sua_chave_secreta_aqui
```

4. **Inicie o servidor**
```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

5. **Acesse a aplicação**
Abra seu navegador e acesse: `http://localhost:3000`

## 📋 API Endpoints

### Autenticação
- `POST /auth/register` - Cadastro de usuário
- `POST /auth/login` - Login de usuário
- `GET /auth/check` - Verificar token

### Produtos
- `POST /auth/produtos` - Cadastrar produto
- `GET /auth/produtosListagem` - Listar produtos
- `DELETE /auth/produtosExcluir/:id` - Excluir produto
- `PATCH /auth/produtos/:id/estoque` - Atualizar estoque

## 🗄️ Modelos de Dados

### Usuário
```javascript
{
  userEmail: String (único, obrigatório),
  userPassword: String (criptografado, obrigatório)
}
```

### Produto
```javascript
{
  nome: String (obrigatório),
  descricao: String (obrigatório),
  codigo: String (único, obrigatório),
  preco: Number,
  estoque: Number (obrigatório)
}
```

## 🔐 Segurança

- **Senhas criptografadas** com bcrypt
- **Autenticação JWT** para rotas protegidas
- **Validação de dados** no backend
- **Sanitização de inputs** para prevenir ataques

## 🎨 Páginas do Sistema

1. **Página Principal** (`/`) - Landing page com informações do sistema
2. **Login/Cadastro** (`/loginCadastro.html`) - Autenticação de usuários
3. **Cadastro de Produtos** (`/cadastroProdutos.html`) - Formulário para adicionar produtos
4. **Lista de Produtos** (`/listaProdutos.html`) - Visualização e gerenciamento de produtos
5. **Dashboard** (`/dashboard.html`) - Área do usuário logado

## 👨‍💻 Desenvolvimento

### Scripts Disponíveis
```bash
npm run dev    # Inicia em modo desenvolvimento
npm start      # Inicia em modo produção
npm test       # Executa testes (a implementar)
```

### Estrutura de Desenvolvimento
- **Controllers**: Lógica de negócio
- **Models**: Definição dos dados
- **Routes**: Endpoints da API
- **Public**: Arquivos estáticos (HTML, CSS, JS)

