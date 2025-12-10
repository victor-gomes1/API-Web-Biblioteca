# 📚 API de Gerenciamento de Livros (CRUD)
Este é o backend de um sistema simplificado de biblioteca, implementando as operações CRUD (Create, Read, Update, Delete) para a entidade Livro.

# Tecnologias Utilizadas

| Tecnologia | Função | 
|-------------| -------|
| Node.js  | Ambiente de execução | 
| TypeScript | Linguagem de desenvolvimento (com tipagem estrita) |
| Express.js | Framework web para roteamento e tratamento de requisições HTTP |
| TypeORM | ORM (Object-Relational Mapper) para comunicação com o banco de dados |
| SQLite | Banco de dados leve baseado em arquivo (utilizado em modo de desenvolvimento) |

# 🏗️ Arquitetura do Projeto
O projeto segue um modelo de arquitetura em camadas simplificado: Controller/Repository.

## Controller (/src/controllers):

- Recebe requisições HTTP e trata as respostas.
 
- Contém a Lógica de Negócio (validações de ISBN, campos obrigatórios, etc.).

- Chama o Repository para acesso aos dados.

## Repository (/src/repositories):

- Responsável pela comunicação direta com o TypeORM/Banco de Dados.

- Executa as operações básicas de CRUD.

## Entidade (/src/entities):

- Define o modelo de dados (Livro) e o mapeamento para a tabela do banco (via TypeORM).

# 🚀 Como Rodar o Projeto
Siga estes passos para configurar e iniciar o servidor na sua máquina local:

1. **Pré-requisitos**
Certifique-se de ter o Node.js e o npm (ou yarn) instalados.

2. **Instalação das Dependências**
Na raiz do projeto, instale todas as dependências listadas no package.json:


Comando:

```bash
npm install
```
# 📖 Endpoints da API (CRUD)
Todos os endpoints utilizam o prefixo base /api/livros.


| Operação    | Verbo HTTP | Rota              | Descrição                                              | Status de Sucesso                   |
|-------------|------------|-------------------|----------------------------------------------------------|-------------------------------------|
| **Criar**        | POST       | /api/livros        | Cadastra um novo livro.                                  | 201 Created                          |
| **Ler Todos**    | GET        | /api/livros        | Retorna a lista completa de livros.                      | 200 OK                               |
| **Ler por ID**   | GET        | /api/livros/{id}   | Retorna detalhes de um livro específico.                 | 200 OK / 404 Not Found               |
| **Atualizar**    | PUT        | /api/livros/{id}   | Atualiza um livro (requer objeto completo ou parcial).   | 200 OK / 404 Not Found               |
| **Excluir**      | DELETE     | /api/livros/{id}   | Remove um livro do sistema.                              | 204 No Content / 404 Not Found       |


# 🛠️ Persistência de Dados

- **Banco de Dados**: SQLite (baseado em arquivo).

- **Arquivo do DB**: O arquivo biblioteca.sqlite será criado automaticamente na raiz do projeto na primeira vez que você rodar o servidor.

- **Sincronização**: Utilizado o synchronize true no data-source.ts, o que significa que o TypeORM cria/atualiza o esquema do banco de dados automaticamente com base na Entidade Livro.ts a cada inicialização (ideal para desenvolvimento).
