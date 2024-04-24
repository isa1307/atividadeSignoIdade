# API Usuarios Node.js, Express e PostgreSQL, com calculo de idade e signo.
Este é um exemplo de uma API web construída com Node.js, Express e PostgreSQL para gerenciar usuários. A API permite a criação, leitura, atualização e exclusão (CRUD) de usuários em um banco de dados PostgreSQL.

## Configuração do Ambiente
Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.

Instale as dependências do projeto: npm install express pg

## Configuração do Projeto
Clonar o repositório:
https://github.com/isa1307/atividadeSignoIdade.git

### Instalar dependências:
npm i 

### Configurar o banco de dados:
Crie um banco de dados PostgreSQL com o nome 'atividade2204':
CREATE DATABASE atividade2204;
Ajuste as credenciais do banco de dados no arquivo app.js, se necessário.
Inicializando o Servidor
Para iniciar o servidor Express, execute o seguinte comando:
npm run dev
O servidor será iniciado na porta 3000 por padrão.

Rotas Disponíveis
GET /usuarios: Retorna todos os usuários cadastrados.
GET /usuarios/:id: Retorna um usuário específico com base no ID fornecido.
POST /usuarios: Adiciona um novo usuário.
PUT /usuarios/:id: Atualiza as informações de um usuário existente.
DELETE /usuarios/:id: Exclui um usuário com base no ID fornecido.


## O servidor será iniciado na porta especificada.
Certifique-se de substituir nome-do-arquivo.js pelo nome do arquivo onde o código está localizado.
