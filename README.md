# 🌱 Sistema Integrado de Gestão para Secretaria de Agricultura

## 📌 Descrição  
O **Sistema Agro 1.0** é um sistema informatizado para cadastro e gestão de produtos disponibilizados à agricultura familiar, além do agendamento de tratores e recursos para agricultores. O objetivo é **agilizar o atendimento, reduzir custos e facilitar o acesso a políticas públicas**, promovendo o desenvolvimento sustentável da região.  

---

## 🚀 Tecnologias Utilizadas  
- **Frontend:** React.js com TypeScript, Redux Toolkit  
- **Backend:** Node.js com Express  
- **Banco de Dados:** MySQL  
- **Gerenciamento de Estado:** Redux Toolkit  
- **Estilização:** CSS + Styled Components  
- **Ferramentas:** Scrum Solo, Figma, Start UML  

---

## 📥 Instalação e Configuração  

### 🔹 **Pré-requisitos**  
Antes de começar, você precisará ter as seguintes ferramentas instaladas:  
- [Node.js](https://nodejs.org/)  
- [MySQL](https://www.mysql.com/)  
- [Git](https://git-scm.com/)  

### 🔹 **1. Clone o Repositório**  
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

🔹 2. Configurar o Banco de Dados
Crie um banco de dados no MySQL e execute os scripts SQL que estão na pasta /database.

🔹 3. Configurar o Backend
sh
Copiar
Editar
cd backend
npm install
npm run dev
O backend roda por padrão na porta 3001.

🔹 4. Configurar o Frontend
sh
Copiar
Editar
cd frontend
npm install
npm start
O frontend roda por padrão na porta 3000.

📌 Funcionalidades
📌 1. Módulo de Agricultores
✅ Cadastro e edição de agricultores
✅ Listagem de agricultores
✅ Vinculação de técnicos responsáveis

📌 2. Módulo de Agendamentos
✅ Cadastro de agendamentos para recursos (tratores, veículos)
✅ Gerenciamento de status dos agendamentos

📌 3. Módulo de Recursos
✅ Cadastro e listagem de tratores e veículos
✅ Controle de disponibilidade

📌 4. Módulo de Relatórios
✅ Geração de relatórios semanais e mensais
✅ Exportação de dados

📌 5. Módulo de Login e Segurança
✅ Login com autenticação JWT
✅ Controle de permissões por tipo de usuário

📌 Estrutura do Projeto
sh
Copiar
Editar
📦 sistema-agro
 ┣ 📂 backend
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ 📜 server.js
 ┃ ┗ 📜 database.sql
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 store
 ┃ ┃ ┣ 📜 App.tsx
 ┃ ┃ ┣ 📜 index.tsx
 ┃ ┗ 📜 package.json
📌 Endpoints da API
📌 Base URL: http://localhost:3001/

📌 Agricultores
Método	Endpoint	Descrição
------------------------------------------------------------
GET	/agricultores	Lista todos os agricultores
POST	/agricultores	Cadastra um novo agricultor
------------------------------------------------------------
📌 Agendamentos
Método	Endpoint	Descrição
GET	/agendamentos	Lista todos os agendamentos
POST	/agendamentos	Cria um novo agendamento
------------------------------------------------------------
🛠 Como Contribuir?

Se quiser contribuir com o projeto, siga os passos:

Faça um fork do repositório
Crie uma branch para sua funcionalidade:
sh
Copiar
Editar
git checkout -b minha-nova-funcionalidade
Faça suas alterações e commite
sh
Copiar
Editar
git commit -m "Adiciona nova funcionalidade"
Envie para o repositório remoto
sh
Copiar
Editar
git push origin minha-nova-funcionalidade
Abra um Pull Request 🚀
------------------------------------------------------------------------------------------------------
📜 Licença
Este projeto é licenciado sob a MIT License.
-------------------------------------------------------------------------------------------------------
📌 Desenvolvido por Diego Sousa dos Santos 🚀





