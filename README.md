
<p align="center">
  <img src="https://github.com/user-attachments/assets/5c353b0b-9d46-4cf6-941f-82aa42f0de3f" alt="The News logo" style="width: 200px;">
</p>

<p align="center">
	<b><i>
    🚀 | Minha solução para o desafio técnico da vaga de Desenvolvedor Full Stack Jr (Front-end Specialist) na Waffle.
  </i></b><br>
</p>

<p align="center">
    <a href="https://thenewsletterstreakschallenge.onrender.com" target="_blank">Acesse o Site</a> 
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
7. [Endpoints da API](#endpoints-da-api)
8. [Testes](#testes)
9. [Referências](#referências)
10. [Licença](#licença)


## Desafio

O desafio consiste em criar uma plataforma de **gamificação** para aumentar o engajamento dos leitores da newsletter do **The News**. A solução deve incluir:

1. **Área Logada**: Onde os leitores podem visualizar seu **streak** (sequência de aberturas consecutivas) e estatísticas pessoais.
2. **Dashboard Administrativo**: Para a equipe da Waffle monitorar métricas de engajamento, como streaks, rankings e padrões de abertura.
3. **Integração com API**: Utilizando dados fornecidos via webhook da plataforma **Beehiiv**.


## Sobre o Projeto

Este projeto foi desenvolvido para criar uma solução de gamificação que incentiva os leitores da newsletter a manterem um hábito de leitura diário. Através de streaks e métricas de engajamento, os leitores são motivados a abrir as newsletters consecutivamente, enquanto a equipe da Waffle pode monitorar o desempenho das campanhas.


## Funcionalidades

### **Área Logada para Leitores**
- **Login Simples**: Acesso via e-mail (o email precisa estar cadastrado no sistema)
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
- **Backend**: Python (Flask)
- **Banco de Dados**: PostgreSQL
- **Estilização**: TailwindCSS
- **Testes**: Pytest (unitários) + Cypress (E2E)
- **Deploy**: Render (Backend)


## Estrutura do Projeto

(Mais relevantes)

```
WaffleNewsletterStreaks/
├── frontend/               # Pasta do Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas (Área logada, Dashboard)
│   │   └── App.tsx         # Componente principal
├── backend/                # Pasta do Backend (Python)
│   ├── app/                # Aplicação principal
│   │   ├── routes.py       # Endpoints da API
│   │   ├── models.py       # Modelo do banco de dados
│   │   ├── services.py     # Register do weebhook
│   │   └── utils.py        # Lógica de negócio
│   ├── tests/              # Testes unitários
│   └── requirements.txt    # Dependências do Python
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


## Endpoints da API

Para facilitar a visualização e compreensão das rotas implementadas no projeto, criei uma página HTML que oferece um design mais agradável. Acesse a documentação completa das rotas da API clicando no link abaixo:

[Documentação da API - Visualização Melhorada](https://thenewsletterstreakschallenge.onrender.com/documentation)


A API oferece os seguintes endpoints:

### **`/`**
- **Descrição**: Registra os dados enviados via webhook.
- **Método**: GET
- **Parâmetros**:
  - `email`: O endereço de e-mail do usuário.
  - `post_id`: O ID do post associado.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/?email=teste@example.com&id=123"
  ```
- **Resposta Esperada**:
  ```json
  {
    "message": "Webhook recebido e salvo com sucesso",
    "email": "teste@example.com",
    "id": "123"
  }
  ```

### **`/reads`**
- **Descrição**: Lista todas as leituras registradas no banco de dados.
- **Método**: GET
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/reads"
  ```
- **Resposta Esperada**:
  ```json
  [
    {
      "email": "teste@example.com",
      "id": 7,
      "post_id": "123",
      "timestamp": "Sun, 16 Feb 2025 23:11:06 GMT",
      "utm_campaign": null,
      "utm_channel": null,
      "utm_medium": null,
      "utm_source": null
    }
  ]
  ```

### **`/metrics`**
- **Descrição**: Retorna métricas sobre as leituras, como total de leitores, total de aberturas e média de aberturas por leitor.
- **Método**: GET
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

### **`/top-readers`**
- **Descrição**: Retorna os 10 leitores com as maiores sequências de leitura (streaks).
- **Método**: GET
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/top-readers"
  ```
- **Resposta Esperada**:
  ```json
  [
    {
      "email": "teste@example.com",
      "streak": 10
    },
    {
      "email": "joao@thenews.com",
      "streak": 8
    }
  ]
  ```

### **`/streak`**
- **Descrição**: Retorna a sequência de leitura (streak) de um e-mail específico.
- **Método**: GET
- **Parâmetros**:
  - `email`: O endereço de e-mail do usuário.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/streak?email=teste@example.com"
  ```
- **Resposta Esperada**:
  ```json
  {
    "email": "teste@example.com",
    "streak": 10
  }
  ```

### **`/history`**
- **Descrição**: Retorna o histórico de leituras de um e-mail específico.
- **Método**: GET
- **Parâmetros**:
  - `email`: O endereço de e-mail do usuário.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/history?email=teste@example.com"
  ```
- **Resposta Esperada**:
  ```json
  [
    {
      "post_id": "123",
      "timestamp": "Sun, 16 Feb 2025 23:11:06 GMT"
    },
    {
      "post_id": "456",
      "timestamp": "Mon, 17 Feb 2025 10:15:30 GMT"
    }
  ]
  ```

### **`/check-email`**
- **Descrição**: Verifica se um e-mail está registrado no banco de dados.
- **Método**: GET
- **Parâmetros**:
  - `email`: O endereço de e-mail do usuário.
- **Exemplo de Requisição**:
  ```bash
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/check-email?email=teste@example.com"
  ```
- **Resposta Esperada**:
  ```json
  {
    "message": "E-mail encontrado",
    "email": "teste@example.com"
  }
  ```


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
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação do Render](https://render.com/docs)


## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).


<p align="center">
  Desenvolvido com muito ☕ por
  <a href="https://linktr.ee/mewmewdevart" target="_blank">Larissa Cristina Benedito</a>
</p>
