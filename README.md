<p align="center">
  <img src="https://github.com/user-attachments/assets/5c353b0b-9d46-4cf6-941f-82aa42f0de3f" alt="The News logo" style="width: 200px;">
</p>


<p align="center">
	<b><i>
    🚀 | Minha solução para o desafio técnico da vaga de Desenvolvedor Full Stack Jr (Front-end Specialist) na Waffle.
  </i></b><br>
</p>


<p align="center">
    <a href="#" target="_blank">Acesse o Site</a> 
</p>



## Sumário

1. [Desafio](#desafio)
2. [Sobre o Projeto](#sobre-o-projeto)
3. [Funcionalidades](#funcionalidades)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Instruções de Uso](#instruções-de-uso)
    - [Pré-requisitos](#pré-requisitos)
    - [Rodando o Projeto Localmente](#rodando-o-projeto-localmente)
7. [Testes](#testes)
8. [Referências](#referências)
9. [Licença](#licença)



## Desafio

O desafio consiste em criar uma plataforma de **gamificação** para aumentar o engajamento dos leitores da newsletter do **the news**. A solução deve incluir:

1. **Área Logada**: Onde os leitores podem visualizar seu **streak** (sequência de aberturas consecutivas) e estatísticas pessoais.
2. **Dashboard Administrativo**: Para a equipe da Waffle monitorar métricas de engajamento, como streaks, rankings e padrões de abertura.
3. **Integração com API**: Utilizando dados fornecidos via webhook da plataforma **Beehiiv**.



## Sobre o Projeto

Lorem ipsum!

## Backlog
14/02/2025 - Estruturação inicial do projeto, definição da arquitetura e organização dos diretórios.

15/02/2025 - Configuração do repositório e do projeto, definição dos estilos globais, implementação dos ícones favicon e adição do arquivo site.webmanifest, permitindo que o site seja adicionado à tela inicial de dispositivos móveis como um aplicativo.

## Funcionalidades

### **Área Logada para Leitores**
- **Login Simples**: Acesso via e-mail.
- **Streak de Leituras**: Exibição da sequência de aberturas consecutivas.
- **Histórico de Aberturas**: Visualização das newsletters abertas.
- **Mensagens Motivacionais**: Incentivos para manter o streak.

### **Dashboard Administrativo**
- **Métricas de Engajamento**: Visualização de streaks, rankings e padrões de abertura.
- **Filtros**: Por newsletter, período de tempo e status do streak.
- **Gráficos**: Para análise de engajamento.

### **Regras de Streak**
- **Cálculo Automático**: O streak aumenta +1 a cada dia consecutivo de abertura.
- **Reset**: O streak é zerado se o leitor não abrir a newsletter no dia seguinte.



## Tecnologias Utilizadas

- **Frontend**: React + TypeScript
- **Backend**: Python (Flask ou FastAPI)
- **Banco de Dados**: PostgreSQL
- **Estilização**: TailwindCSS
- **Testes**: Pytest (unitários) + Cypress (E2E)
- **Deploy**: Vercel (Frontend) + Heroku (Backend)



## Estrutura do Projeto

```
WaffleNewsletterStreaks/
├── frontend/               # Pasta do Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas (Área logada, Dashboard)
│   │   └── App.tsx         # Componente principal
├── backend/                # Pasta do Backend (Python)
│   ├── app/                # Aplicação principal
│   │   ├── routes/         # Endpoints da API
│   │   ├── models/         # Modelos do banco de dados
│   │   └── services/       # Lógica de negócio
│   ├── tests/              # Testes unitários
│   └── requirements.txt    # Dependências do Python
├── database/               # Scripts e migrações do banco de dados
├── tests/                  # Testes E2E (Cypress)
└── README.md               # Documentação do projeto
```



## Instruções de Uso

### Pré-requisitos

❗️ | Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (v18 ou superior)
- Python (3.8 ou superior)
- PostgreSQL
- Git

### Rodando o Projeto Localmente

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/WaffleNewsletterStreaks.git
   cd WaffleNewsletterStreaks
   ```

2. Instale as dependências:
   ```sh
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   pip install -r requirements.txt
   ```

3. Configure o banco de dados:
   - Crie um banco de dados PostgreSQL.
   - Configure as variáveis de ambiente no arquivo `.env` do backend.

4. Execute o projeto:
   ```sh
   # Backend
   cd backend
   python app/main.py

   # Frontend
   cd ../frontend
   npm start
   ```

5. Acesse o site em: `http://localhost:3000`.



## Testes

Para garantir a qualidade do projeto, foram implementados testes unitários e end-to-end (E2E):

1. **Testes Unitários**:
   - Execute com Pytest:
     ```sh
     cd backend
     pytest
     ```

2. **Testes E2E**:
   - Execute com Cypress:
     ```sh
     cd frontend
     npm run cypress
     ```



## Referências

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Flask](https://flask.palletsprojects.com/)
- [Documentação do FastAPI](https://fastapi.tiangolo.com/)
- [Documentação do Beehiiv API](https://developers.beehiiv.com/)
- [Documentação do TailwindCSS](https://tailwindcss.com/docs)



## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).



<p align="center">
  Desenvolvido com 💜 por [Seu Nome]
</p>

