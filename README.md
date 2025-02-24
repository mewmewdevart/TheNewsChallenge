<p align="center">
  <img src="https://github.com/user-attachments/assets/5c353b0b-9d46-4cf6-941f-82aa42f0de3f" alt="The News logo" style="width: 200px;">
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="Licença MIT">
  </a>
</p>

<p align="center">
	<b><i>
    🚀 | Minha solução para o desafio técnico da vaga de Desenvolvedor Full Stack Jr (Front-end Specialist) na Waffle.
  </i></b><br>
</p>

<p align="center">
    <a href="https://the-news-letter-streaks.vercel.app/" target="_blank">Acesso o resultado </a> 
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

Este projeto foi desenvolvido para criar uma solução de gamificação que incentiva os leitores da newsletter a manterem um hábito de leitura diário. Através de streaks e métricas de engajamento, os leitores são motivados a abrir as newsletters consecutivamente, enquanto a equipe da Waffle pode monitorar o desempenho das campanhas.

## 💡 Funcionalidades

Aqui está uma versão melhorada das suas anotações em formato Markdown, com melhor organização, clareza e adição de detalhes para facilitar a leitura e compreensão:


**Área Logada para Leitores**

Funcionalidades Principais/
- **Login Simples**: 
  - Acesso via e-mail.
- **Streak de Leituras**:
  - Exibição da sequência de aberturas consecutivas de newsletters.
- **Histórico de Aberturas**:
  - Visualização das newsletters já abertas pelo usuário.
- **Mensagens Motivacionais**:
  - Incentivos para manter o streak ativo.

Funcionalidades Bônus/

- **Cadastro Obrigatório**:
  - O e-mail precisa estar cadastrado no sistema para permitir o login.
- **Acompanhamento de Desempenho**:
  - O usuário poderá visualizar:
    - A sequência atual de streaks.
    - O recorde pessoal (maior streak alcançado).
    - O total de newsletters lidas.
- **Ranking de Leitores**:
  - Exibição de um ranking dos **Top 5 Leitores**, baseado em streaks.
- **Histórico com Paginação e Busca**:
  - Lista paginada das newsletters lidas, com funcionalidade de busca.
  - Cada item do histórico exibe:
    - A newsletter lida.
    - A data de leitura.
    - Um link para releitura da newsletter (caso a URL esteja no formato correto: `https://thenewscc.beehiiv.com/p/data`).
  - **Observação**: Caso a URL da newsletter não esteja no formato esperado, o card será criado, mas não estará linkado, podendo ocasionar em "erro".

**Dashboard Administrativo**

Funcionalidades Principais/
- **Métricas de Engajamento**:
  - Visualização de streaks, rankings e padrões de abertura dos usuários.
- **Filtros**:
  - Filtragem por:
    - Newsletter específica.
    - Período de tempo.
    - Status do streak (ativo ou inativo).
- **Gráficos**:
  - Análise visual de engajamento dos usuários.

**Funcionalidades Bônus**
- **Exibição de E-mails**:
  - O mesmo e-mail que o leitor vê no perfil é exibido na área administrativa.
- **Ranking de Top 5 Leitores**:
  - Repetição do ranking baseado em streaks.
- **Gráficos de Engajamento**:
  - Gráficos simples que permitem visualizar:
    - Número de leitores por dia, semana ou mês.
- **Tabela de Dados**:
  - Tabela que coleta e exibe:
    - Dados básicos dos usuários.
    - O maior streak alcançado (`max_streak`).
    - O streak atual de cada usuário.
  - Filtros disponíveis:
    - Usuários ativos (`streak > 0`).
    - Usuários inativos (`streak = 0`).

**Regras de Streak**
Funcionalidades Principais/
- **Cálculo Automático**:
  - O streak aumenta em **+1** a cada dia consecutivo de abertura da newsletter.
- **Reset**:
  - O streak é zerado se o leitor não abrir a newsletter no dia seguinte.
- **Exceções**:
  - Domingos não quebram o streak, mantendo a sequência intacta.

### **Funcionalidades Bônus**
- **Registro de Recorde Pessoal**:
  - Adição do campo `max_streak` para armazenar o maior streak alcançado por cada usuário.

  
## 🚀 Minha experiencia


  
## 🛠️ Tecnologias Utilizadas

| **Frontend**         | **Backend**        | **Banco de Dados** | **Outras Ferramentas**       |
|----------------------|--------------------|--------------------|------------------------------|
| React + TypeScript   | Python (Flask)     | PostgreSQL         | Render (Deploy do Backend)              |
| TailwindCSS + Material UI         | Pytest (unitários) |                    | GitHub Actions (CI/CD)       |
|  ̶C̶y̶p̶r̶e̶s̶s̶ ̶(̶E̶2̶E̶)̶        |                    |                    |    Vercel (Deploy do FrontEnd)                          |
## 📂 Estrutura do Projeto

```
TheNewsLetterStreaks/
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
  curl -X GET "https://thenewsletterstreakschallenge.onrender.com/?email=joao@gmail.com&post_id=7&utm_source=newsletter&utm_medium=email"
  ```
- **Resposta Esperada**:
  ```json
  {
    "message": "Webhook received and saved successfully",
    "email": "joao@gmail.com",
    "id": "7",
    "streak": 1,
    "max_streak": 1
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
      "id": 9,
      "email": "joao@gmail.com",
      "post_id": "7",
      "utm_source": "newsletter",
      "utm_medium": "email",
      "utm_campaign": "weekly",
      "utm_channel": "marketing",
      "timestamp": "2025-02-21T19:11:14.484658",
      "streak": 1,
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
    "total_opens": 14,
    "average_opens": 1.4
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
      "reads": 7,
      "streak": 3,
      "max_streak": 3
    },
    {
      "email": "teste@example.com",
      "reads": 2,
      "streak": 2,
      "max_streak": 2
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
      "timestamp": "2025-02-22T03:15:43.475157",
      "streak": 3,
      "max_streak": 3
    },
    {
      "post_id": "6",
      "timestamp": "2025-02-21T19:07:04.591965",
      "streak": 3,
      "max_streak": 3
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

1. **Testes Unitários (Backend)**:
   - Execute com Pytest:
     ```sh
     cd backend-the-news
     pytest tests/
     ```

Foram realizados os seguintes testes no backend:

<details>
<summary><strong>Criação de Registros</strong></summary>
   - **Objetivo**: Verificar se um novo registro de leitura da newsletter é criado corretamente no banco de dados.
   - **Esperado**: O novo registro deve ser adicionado ao banco de dados e todos os campos fornecidos (como email, post_id, utm_source, etc.) devem ser corretamente armazenados. Além disso, os valores padrão para `streak`, `max_streak` e `current_streak` devem ser `0`.
</details>

<details>
<summary><strong>Valores Padrão</strong></summary>
   - **Objetivo**: Verificar se os valores padrão são atribuídos corretamente quando um novo registro é criado, caso não sejam fornecidos valores para esses campos.
   - **Esperado**: Quando um novo registro é criado sem valores explícitos para `streak`, `max_streak` e `current_streak`, esses campos devem ser configurados automaticamente como `0`.
</details>

<details>
<summary><strong>Restrições de Integridade</strong></summary>
   - **Objetivo**: Verificar se as restrições de integridade no banco de dados estão funcionando corretamente, como a prevenção de duplicação de registros.
   - **Esperado**: Tentar adicionar um registro com um email já existente deve resultar em um erro de integridade (erro `IntegrityError`), impedindo que o registro seja duplicado.
</details>

<details>
<summary><strong>Atualização de Registros</strong></summary>
   - **Objetivo**: Verificar se é possível atualizar um registro existente no banco de dados.
   - **Esperado**: O campo atualizado (como `utm_source`) deve refletir a mudança após o commit da transação. A alteração deve ser persistida no banco de dados.
</details>

<details>
<summary><strong>Exclusão de Registros</strong></summary>
   - **Objetivo**: Verificar se um registro pode ser excluído corretamente do banco de dados.
   - **Esperado**: Após a exclusão do registro, a busca por esse registro no banco de dados deve retornar `None`, indicando que o registro foi removido com sucesso.
</details>

<details>
<summary><strong>Validação de Email Inválido</strong></summary>
   - **Objetivo**: Verificar se é lançado um erro quando um email inválido é fornecido ao criar um novo registro.
   - **Esperado**: A tentativa de criar um registro com um email inválido deve gerar um `ValueError` com a mensagem "Invalid email address".
</details>

<details>
<summary><strong>Validação de Campos Nulos</strong></summary>
   - **Objetivo**: Verificar se é lançado um erro quando um campo obrigatório (como email) é deixado nulo.
   - **Esperado**: A tentativa de criar um registro com valores nulos nos campos obrigatórios deve gerar um `ValueError`, com a mensagem "Invalid email address" (ou mensagem similar, dependendo da validação).
</details>

<details>
<summary><strong>Verificação de Banco de Dados Vazio</strong></summary>
   - **Objetivo**: Verificar se a consulta de um email que não existe no banco retorna `None`, indicando que o registro não foi encontrado.
   - **Esperado**: Ao buscar um email não registrado no banco de dados, a função deve retornar `None`, confirmando que o registro não existe.
</details>

<details>
<summary><strong>Método Personalizado</strong></summary>
   - **Objetivo**: Verificar se o método personalizado de um modelo funciona corretamente.
   - **Esperado**: O método deve retornar o valor esperado, que pode ser um resultado calculado ou formatado a partir dos dados do registro.
</details>

<!-- 
2. **Testes E2E (Frontend)**:
   - Execute com Cypress:
     ```sh
     cd frontend
     npm run cypress
     ``` -->

## 📚 Referências

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do Material UI](https://mui.com/material-ui/getting-started/)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Flask](https://flask.palletsprojects.com/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação do Render](https://render.com/docs)


## 📜 Licença

Este projeto está licenciado sob a [
