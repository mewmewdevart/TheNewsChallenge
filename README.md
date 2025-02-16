
<p align="center">
  <img src="https://github.com/user-attachments/assets/5c353b0b-9d46-4cf6-941f-82aa42f0de3f" alt="The News logo" style="width: 200px;">
</p>

<p align="center">
	<b><i>
    🚀 | Minha solução para o desafio técnico da vaga de Desenvolvedor Full Stack Jr (Front-end Specialist) na Waffle.
  </i></b><br>
</p>

<p align="center">
    <a href="https://thenewsletterstreaks.onrender.com" target="_blank">Acesse o Site</a> 
</p>

---

## Sumário

1. [Desafio](#desafio)
2. [Sobre o Projeto](#sobre-o-projeto)
3. [Funcionalidades](#funcionalidades)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Instruções de Uso](#instruções-de-uso)
    - [Pré-requisitos](#pré-requisitos)
    - [Rodando o Projeto Localmente](#rodando-o-projeto-localmente)
7. [Testando o endpoint](#testando-o-endpoint-webhook)
8. [Testes](#testes)
9. [Referências](#referências)
10. [Licença](#licença)

---

## Desafio

O desafio consiste em criar uma plataforma de **gamificação** para aumentar o engajamento dos leitores da newsletter do **The News**. A solução deve incluir:

1. **Área Logada**: Onde os leitores podem visualizar seu **streak** (sequência de aberturas consecutivas) e estatísticas pessoais.
2. **Dashboard Administrativo**: Para a equipe da Waffle monitorar métricas de engajamento, como streaks, rankings e padrões de abertura.
3. **Integração com API**: Utilizando dados fornecidos via webhook da plataforma **Beehiiv**.

---

## Sobre o Projeto

Este projeto foi desenvolvido para criar uma solução de gamificação que incentiva os leitores da newsletter a manterem um hábito de leitura diário. Através de streaks e métricas de engajamento, os leitores são motivados a abrir as newsletters consecutivamente, enquanto a equipe da Waffle pode monitorar o desempenho das campanhas.

---

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

---

## Tecnologias Utilizadas

- **Frontend**: React + TypeScript
- **Backend**: Python (Flask)
- **Banco de Dados**: PostgreSQL
- **Estilização**: TailwindCSS
- **Testes**: Pytest (unitários) + Cypress (E2E)
- **Deploy**: Render (Backend)

---

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

---

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
   - Crie um banco de dados PostgreSQL local:
     ```sh
     createdb newsletter_streaks
     ```
   - Configure as variáveis de ambiente no arquivo `.env` do backend:
     ```bash
     SECRET_KEY=sua_chave_secreta
     DATABASE_URL=postgresql://usuario:senha@localhost/newsletter_streaks
     ```

4. Execute as migrações do banco de dados:
   ```sh
   cd backend
   flask db init
   flask db migrate -m "Criação inicial do banco de dados"
   flask db upgrade
   ```

5. Execute o projeto:
   ```sh
   # Backend
   python app/main.py

   # Frontend
   cd ../frontend
   npm start
   ```

6. Acesse o site em: `http://localhost:3000`.

---

## Testando o Endpoint `/webhook

Para testar o endpoint `/webhook` localmente ou em produção, você pode usar ferramentas como `curl`, Postman ou até mesmo o navegador. Exemplo de requisição:

```bash
curl -X GET "https://thenewsletterstreaks.onrender.com/webhook?email=teste@example.com&id=123&utm_source=teste&utm_medium=email&utm_campaign=newsletter&utm_channel=web"
```

Resposta esperada:
```json
{
  "message": "Webhook recebido e salvo com sucesso",
  "email": "teste@example.com",
  "id": "123"
}
```

---

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

---

## Referências

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Flask](https://flask.palletsprojects.com/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação do Render](https://render.com/docs)

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

<p align="center">
  Desenvolvido com muito ☕ por
  <a href="https://linktr.ee/mewmewdevart" target="_blank">Larissa Cristina Benedito</a>
</p>
