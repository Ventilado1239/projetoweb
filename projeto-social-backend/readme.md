# Projeto Final: Back-end de Rede Social Aberta

## 📖 Sobre o Projeto

Este repositório contém o código-fonte do back-end para uma aplicação web de rede social, desenvolvido como projeto final da disciplina. A API foi construída com foco em interatividade aberta, permitindo que usuários se conectem, compartilhem conteúdo, criem comunidades e se comuniquem de forma privada.

O sistema foi desenhado para não ter perfis privados, incentivando a livre descoberta de conteúdo e a formação de novas conexões baseadas em interesses em comum.

---

## ✨ Funcionalidades Implementadas

* *Autenticação e Usuários:*
    * Cadastro de novos usuários.
    * Login seguro com senhas criptografadas e geração de Token JWT.
    * Busca de perfil de usuário logado.

* *Posts e Interações:*
    * Criação de posts com texto, imagem ou vídeo.
    * Listagem de todos os posts em um feed principal.
    * Sistema de comentários em posts.
    * Sistema de avaliações (like/dislike) em posts, com lógica para adicionar, remover e alterar o voto.

* *Grupos e Comunidades:*
    * Criação de grupos temáticos com nome e descrição.
    * O criador do grupo é automaticamente definido como administrador.
    * Sistema para que outros usuários possam entrar nos grupos como membros.
    * Listagem de todos os grupos disponíveis.
    * Capacidade de criar posts dentro de um grupo específico (requer que o usuário seja membro).

* *Mensagens Privadas:*
    * Sistema de troca de mensagens privadas entre dois usuários.
    * Endpoint para enviar uma mensagem.
    * Endpoint para buscar o histórico completo de uma conversa.

* *Tags e Interesses:*
    * Sistema para que usuários possam atribuir até 5 tags de interesse ao seu perfil.
    * As tags são criadas dinamicamente se ainda não existirem.
    * Endpoint de busca para encontrar outros usuários que compartilham uma mesma tag.

---

## 🛠 Tecnologias Utilizadas

* *Ambiente:* Node.js
* *Framework:* Express.js
* *ORM:* Sequelize
* *Banco de Dados:* MySQL
* *Autenticação:* JSON Web Tokens (JWT)
* *Segurança:* Bcrypt.js para hashing de senhas

---

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para ter uma cópia do projeto rodando na sua máquina.

### 1. Pré-requisitos

Antes de começar, você precisa ter os seguintes programas instalados:
* [Node.js](https://nodejs.org/) (v18 ou superior)
* [Git](https://git-scm.com/)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) (Garanta que o servidor MySQL esteja rodando na sua máquina).

### 2. Clonar o Repositório

Abra seu terminal e clone o repositório para uma pasta de sua escolha:
bash
git clone [https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git)

Acesse a pasta do projeto:
bash
cd NOME_DO_SEU_REPOSITORIO


### 3. Instalar as Dependências

Este projeto usa diversas bibliotecas. O npm instalará tudo para você com um único comando:
bash
npm install


### 4. Configurar o Ambiente

A aplicação precisa se conectar a um banco de dados e usar chaves secretas.

*4.1. Crie o Banco de Dados:*
Abra seu gerenciador de MySQL (Workbench, DBeaver, etc.) e execute o seguinte comando para criar o banco que a aplicação vai usar:
sql
CREATE DATABASE rede_social_db;


*4.2. Configure as Variáveis de Ambiente:*
Na raiz da pasta do backend, crie uma cópia do arquivo .env.example e renomeie-a para .env.
bash
# No Windows (prompt de comando)
copy .env.example .env

# No Linux ou macOS
cp .env.example .env

Abra o arquivo .env e preencha com as suas credenciais do MySQL e crie um segredo para o JWT.


DB_HOST=localhost
DB_USER=root
DB_PASS=SUA_SENHA_AQUI
DB_NAME=rede_social_db
JWT_SECRET=CRIE_UMA_CHAVE_SECRETA_BEM_LONGA_E_ALEATORIA_AQUI


### 5. Rodar a Aplicação

*5.1. Primeira Execução (Criar as Tabelas):*
Na primeira vez que o projeto for executado, as tabelas precisam ser criadas no banco de dados.
-   Abra o arquivo server.js.
-   Altere a linha db.sequelize.sync({ force: false }) para db.sequelize.sync({ force: true }).
-   Salve o arquivo e rode o servidor com o comando abaixo. Espere a mensagem de sucesso no terminal.
-   *MUITO IMPORTANTE:* Depois que o servidor iniciar uma vez, pare-o (Ctrl + C) e volte a linha no server.js para force: false.

*5.2. Iniciando o Servidor:*
Com tudo configurado, use o seguinte comando para iniciar o servidor em modo de desenvolvimento:
bash
npm run dev

Seu servidor estará no ar e acessível em http://localhost:3001. Você está pronto para testar as rotas!
