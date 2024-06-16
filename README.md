# Testes automatizados

Repositório destinado ao estudo e aplicações de diferentes tipos de testes automatizados.

# Instalação e inicialização da aplicação

- Acesse o diretório apps/api em um bash: <br>
Execute os comandos um por um:<br>
yarn db:init - Inicia o banco de dados e roda a migration<br>
yarn install - Instala as dependencias<br>
yarn dev - Inicia o projeto localmente<br>

- Acesse o diretório apps/web em um bash diferente da API: <br>
Execute os comandos um por um:<br>
yarn install - Instala as dependencias<br>
yarn dev - Inicia o projeto localmente<br>

## Sobre a Aplicação

Aplicação funciona como um TODO, basicamente para gerenciar tarefas pessoais.

# Instalação e inicialização da aplicação

- Acesse o diretório apps/api em um bash: <br>
Execute os comandos um por um:<br>
yarn db:init - Inicia o banco de dados e roda a migration<br>
yarn install - Instala as dependencias<br>
yarn dev - Inicia o projeto localmente<br>

- Acesse o diretório apps/web em um bash diferente da API: <br>
Execute os comandos um por um:<br>
yarn install - Instala as dependencias<br>
yarn dev - Inicia o projeto localmente<br>

## Casos de Teste

**Como** um usuário<br>
**Eu** quero realizar o cadastro de tarefas<br>
**Para** gerenciar a quantidade de tarefas à fazer<br>

**Cadastrar uma tarefa**<br>
Dado que acessei a página do sistema em questão<br>
Quando digitar no campo "Add a new task" o seguinte valor: "Tarefa: {uuid}"<br>
E clicar no botão "Create"<br>
Então a tarefa será cadastrada e listada corretamente<br>
E a quantidade de "Created Tasks" deve aumentar para 1<br>

**Cadastrar uma tarefa duplicada**<br>
Dado que acessei a página do sistema em questão<br>
E que tenho uma tarefa já cadastrada com o título: "Tarefa: {uuid}"
Quando digitar no campo "Add a new task" o mesmo título da tarefa já cadastrada<br>
E clicar no botão "Create"<br>
Então deve ser exibido um modal contendo a informação de que a tarefa já existe<br>

**Cadastrar uma tarefa sem informar um título**<br>
Dado que acessei a página do sistema em questão<br>
Quando clicar no botão "Create" sem informar nenhum valor no campo "Add a new task"<br>
Então deve campo "Add a new task" deve exibir a critica de obrigatoriedade<br>

**Como** um usuário<br>
**Eu** quero realizar a edição de tarefas<br>
**Para** gerenciar as tarefas ja cadastradas<br>

**Marcar tarefa como concluída**<br>
Dado que acessei a página do sistema em questão<br>
E que tenho uma tarefa cadastrada
Quando clicar no toggle dessas tarefas<br>
Então a tarefa em questão deverá ser concluida e riscada<br>
E a quantidade de "Done Tasks" deve ser "1 de 1"<br>

**Excluir tarefa**<br>
Dado que acessei a página do sistema em questão<br>
E que tenho uma tarefa cadastrada
Quando clicar no ícone de lixeira dessa tarefas<br>
Então a tarefa deixará de ser listada<br>
E a quantidade de "Created Tasks" deve abaixar para 0<br>


By [Guilherme Oliveira Souza](https://github.com/KrevyyG).
