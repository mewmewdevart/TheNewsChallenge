<p align="center">
  <img src="https://github.com/seu-usuario/repo/assets/logo.png" alt="The News logo" style="width: 200px;">
</p>

<p align="center">
  <a href="https://github.com/seu-usuario/WaffleNewsletterStreaks/actions">
    <img src="https://github.com/seu-usuario/WaffleNewsletterStreaks/workflows/CI/CD/badge.svg" alt="Status do CI/CD">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="Licença MIT">
  </a>
  <a href="https://thenewsletterstreakschallenge.onrender.com">
    <img src="https://img.shields.io/badge/Demo-Online-green.svg" alt="Demo Online">
  </a>
</p>

<p align="center">
	<b><i>
    🚀 | Minha solução para o desafio técnico da vaga de Desenvolvedor Full Stack Jr (Front-end Specialist) na Waffle.
  </i></b><br>
</p>

<p align="center">
    <a href="https://thenewsletterstreakschallenge.onrender.com" target="_blank">Acesse o Site</a> 
</p>
## 📖 Introdução

Este projeto foi desenvolvido como parte do desafio técnico para a vaga de Desenvolvedor Full Stack Jr (Front-end Specialist) na Waffle. A solução proposta visa aumentar o engajamento dos leitores da newsletter do **The News** através de uma plataforma de gamificação, onde os leitores podem acompanhar suas sequências de leitura (streaks) e métricas de engajamento.
## 📚 Sumário

1. [Desafio](#-desafio)
2. [Sobre o Projeto](#-sobre-o-projeto)
3. [Funcionalidades](#-funcionalidades)
4. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
5. [Estrutura do Projeto](#-estrutura-do-projeto)
6. [Instruções de Uso](#-instruções-de-uso)
    - [Pré-requisitos](#-pré-requisitos)
    - [Rodando o Projeto Localmente](#-rodando-o-projeto-localmente)
7. [Endpoints da API](#-endpoints-da-api)
8. [Automação com GitHub Actions](#-automação-com-github-actions)
9. [Testes](#-testes)
10. [Referências](#-referências)
11. [Licença](#-licença)
## 🎯 Desafio

O desafio consiste em criar uma plataforma de **gamificação** para aumentar o engajamento dos leitores da newsletter do **The News**. A solução deve incluir:

1. **Área Logada**: Onde os leitores podem visualizar seu **streak** (sequência de aberturas consecutivas) e estatísticas pessoais.
2. **Dashboard Administrativo**: Para a equipe da Waffle monitorar métricas de engajamento, como streaks, rankings e padrões de abertura.
3. **Integração com API**: Utilizando dados fornecidos via webhook da plataforma **Beehiiv**.
## 🚀 Sobre o Projeto

Este projeto foi desenvolvido para criar uma solução de gamificação que incentiva os leitores da newsletter a manterem um hábito de leitura diário. Através de streaks e métricas de engajamento, os leitores são motivados a abrir as newsletters consecutivamente, enquanto a equipe da Waffle pode monitorar o desempenho das campanhas.
## 💡 Funcionalidades

### **Área Logada para Leitores**
- **Login Simples**: Acesso via e-mail (o email precisa estar cadastrado no sistema).
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
- **Exceções**: Domingos não quebram o streak, mantendo a sequência intacta.
## 🛠️ Tecnologias Utilizadas

| **Frontend**         | **Backend**        | **Banco de Dados** | **Outras Ferramentas**       |
|----------------------|--------------------|--------------------|------------------------------|
| React + TypeScript   | Python (Flask)     | PostgreSQL         | Render (Deploy)              |
| TailwindCSS          | Pytest (unitários) |                    | GitHub Actions (CI/CD)       |
| Cypress (E2E)        |                    |                    |                              |
## 📂 Estrutura do Projeto

```
WaffleNewsletterStreaks/
├── frontend-the-news/               # Pasta do Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas (Área logada, Dashboard)
│   │   └── App.tsx         # Componente principal
├── backend-the-news/                # Pasta do Backend (Python)
│   ├── app/                # Aplicação principal
│   │   ├── routes.py       # Endpoints da API
│   │   ├── models.py       # Modelo do banco de dados
│   │   ├── services.py     # Lógica de negócio
│   │   └── utils.py        # Funções utilitárias (ex: cálculo de streaks)
│   ├── tests/              # Testes unitários
│   └── requirements.txt    # Dependências do Python
├── tests/                  # Testes E2E (Cypress)
└── README.md               # Documentação do projeto
```
## 🚀 Instruções de Uso

### Pré-requisitos

❗️ Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (v18 ou superior)
- **Python** (3.8 ou superior)
- **PostgreSQL**
- **Git**

### Rodando o Projeto Localmente

1. **Clone o repositório**:
   ```sh
   git clone https://github.com/seu-usuario/WaffleNewsletterStreaks.git
   cd WaffleNewsletterStreaks
   ```

2. **Crie e ative um ambiente virtual (venv) para o backend**:
   - Para sistemas Unix/Linux/macOS:
     ```sh
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Para Windows:
     ```sh
     python -m venv venv
     .\venv\Scripts\activate
     ```

3. **Instale as dependências**:
   - **Frontend**:
     ```sh
     cd frontend-the-news
     npm install
     ```
   - **Backend**:
     ```sh
     cd ../backend-the-news
     pip install -r requirements.txt
     ```

4. **Configure o banco de dados**:
   - Crie um banco de dados PostgreSQL local:
     ```sh
     createdb newsletter_streaks
     ```
   - Configure as variáveis de ambiente no arquivo `.env` do backend:
     ```bash
     SECRET_KEY=sua_chave_secreta
     DATABASE_URL=postgresql://usuario:senha@localhost/newsletter_streaks
     ```

5. **Execute as migrações do banco de dados**:
   ```sh
   cd backend-the-news
   flask db init
   flask db migrate -m "Criação inicial do banco de dados"
   flask db upgrade
   ```

6. **Execute o projeto**:
   - **Backend**:
     ```sh
     python run.py
     ```
   - **Frontend**:
     ```sh
     cd ../frontend-the-news
     npm run dev
     ```

7. **Acesse o projeto**:
   - O **Frontend** estará disponível em: [http://localhost:3000](http://localhost:3000)
   - O **Backend** estará disponível em: [http://127.0.0.1:5000](http://127.0.0.1:5000)
## 📡 Endpoints da API

Para facilitar a visualização e compreensão das rotas implementadas no projeto, criei uma página HTML que oferece um design mais agradável. Acesse a documentação completa das rotas da API clicando no link abaixo:

<a href="https://thenewsletterstreakschallenge.onrender.com/documentation" target="_blank">Documentação da API - Visualização Melhorada</a> 

A API oferece os seguintes endpoints:

<details>
<summary><strong>GET /</strong></summary>

- **Descrição**: Registra os dados enviados via webhook.
- **Parâmetros**:
  - `email` (obrigatório): O endereço de e-mail do usuário.
  - `post_id` (obrigatório): O ID do post associado.
  - `utm_source` (opcional): Fonte da campanha UTM.
  - `utm_medium` (opcional): Meio da campanha UTM.
  - `utm_campaign` (opcional): Nome da campanha UTM.
  - `utm_channel` (opcional): Canal da campanha UTM.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/?email=teste@example.com&post_id=123&utm_source=newsletter&utm_medium=email"
  ```
- **Resposta Esperada**:
  ```json
  {
    "message": "Webhook received and saved successfully",
    "email": "teste@example.com",
    "id": "123",
    "streak": 3,
    "max_streak": 5
  }
  ```
</details>

<details>
<summary><strong>GET /reads</strong></summary>

- **Descrição**: Lista todas as leituras registradas no banco de dados.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/reads"
  ```
- **Resposta Esperada**:
  ```json
  [
    {
      "id": 1,
      "email": "larissa@thenews.com",
      "post_id": "1",
      "utm_source": "google",
      "utm_medium": "email",
      "utm_campaign": "promo",
      "utm_channel": "social",
      "timestamp": "2025-02-20T03:46:29.986297",
      "streak": 3,
      "max_streak": 1
    },
    {
      "id": 2,
      "email": "teste@example.com",
      "post_id": "2",
      "utm_source": "tiktok",
      "utm_medium": "socialpaid",
      "utm_campaign": "12/12/2024",
      "utm_channel": "web",
      "timestamp": "2025-02-20T17:04:36.362509",
      "streak": 2,
      "max_streak": 1
    }
  ]
  ```
</details>

<details>
<summary><strong>GET /metrics</strong></summary>

- **Descrição**: Retorna métricas sobre as leituras, como total de leitores, total de aberturas e média de aberturas por leitor.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/metrics"
  ```
- **Resposta Esperada**:
  ```json
  {
    "total_readers": 10,
    "total_opens": 50,
    "average_opens": 5.0
  }
  ```
</details>

<details>
<summary><strong>GET /top-readers</strong></summary>

- **Descrição**: Retorna os 10 leitores com mais leituras registradas.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/top-readers"
  ```
- **Resposta Esperada**:
  ```json
  [
    {
      "email": "larissa@thenews.com",
      "reads": 4
    },
    {
      "email": "teste@example.com",
      "reads": 2
    }
  ]
  ```
</details>

<details>
<summary><strong>GET /streak</strong></summary>

- **Descrição**: Retorna a sequência de leitura (streak) atual e a máxima de um e-mail específico.
- **Parâmetros**:
  - `email` (obrigatório): O endereço de e-mail do usuário.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/streak?email=larissa@thenews.com"
  ```
- **Resposta Esperada**:
  ```json
  {
    "email": "larissa@thenews.com",
    "streak": 3,
    "max_streak": 3
  }
  ```
</details>

<details>
<summary><strong>GET /history</strong></summary>

- **Descrição**: Retorna o histórico de leituras de um e-mail específico.
- **Parâmetros**:
  - `email` (obrigatório): O endereço de e-mail do usuário.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/history?email=larissa@thenews.com"
  ```
- **Resposta Esperada**:
  ```json
  [
    {
      "post_id": "10",
      "timestamp": "2025-02-22T03:15:43.475157"
    },
    {
      "post_id": "6",
      "timestamp": "2025-02-21T19:07:04.591965"
    }
  ]
  ```
</details>

<details>
<summary><strong>GET /check-email</strong></summary>

- **Descrição**: Verifica se um e-mail está registrado no banco de dados.
- **Parâmetros**:
  - `email` (obrigatório): O endereço de e-mail do usuário.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/check-email?email=larissa@thenews.com"
  ```
- **Resposta Esperada**:
  ```json
  {
    "message": "Email found",
    "email": "larissa@thenews.com"
  }
  ```
</details>

<details>
<summary><strong>GET /max-streak</strong></summary>

- **Descrição**: Retorna a maior sequência de leituras (max_streak) de um e-mail específico.
- **Parâmetros**:
  - `email` (obrigatório): O endereço de e-mail do usuário.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/max-streak?email=larissa@thenews.com"
  ```
- **Resposta Esperada**:
  ```json
  {
    "email": "larissa@thenews.com",
    "max_streak": 3
  }
  ```
</details>
## 🤖 Automação com GitHub Actions

Este projeto conta com um workflow automatizado via **GitHub Actions** para rodar um script periodicamente. 

### 🔄 O que o Workflow Faz?
- Executa o script `run_update_streaks.py` a cada **24 horas**.
- Atualiza os dados no banco de dados automaticamente.
- Garante que as métricas e streaks estejam sempre sincronizados sem intervenção manual.

### ⚙️ Configuração do Cron Job
O agendamento é definido no arquivo `.github/workflows/update_streaks.yml`, utilizando a seguinte expressão cron:

```yaml
on:
  schedule:
    - cron: "0 0 * * *" # Executa a cada 24 horas
```
## 🧪 Testes

Para garantir a qualidade do projeto, foram implementados testes unitários e end-to-end (E2E):

1. **Testes Unitários**:
   - Execute com Pytest:
     ```sh
     cd backend-the-news
     pytest tests/
     ```

2. **Testes E2E**:
   - Execute com Cypress:
     ```sh
     cd frontend
     npm run cypress
     ```
## 📚 Referências

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Flask](https://flask.palletsprojects.com/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação do Render](https://render.com/docs)
## 📜 Licença

Este projeto está licenciado sob a [
