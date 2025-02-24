<p align="center">
  <img src="https://github.com/user-attachments/assets/5c353b0b-9d46-4cf6-941f-82aa42f0de3f" alt="The News logo" style="width: 200px;">
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="Licença MIT">
  </a>
</p>

<p align="center">
	<b><i>
    🚀 | Minha solução para o desafio técnico da vaga de Desenvolvedor Full Stack Jr (Front-end Specialist) na Waffle.
  </i></b><br>
</p>

<p align="center">
    <a href="https://the-news-letter-streaks.vercel.app/" target="_blank">Acessar o resultado </a> 
</p>

## 📖 Introdução

Este projeto foi desenvolvido como parte do desafio técnico para a vaga de Desenvolvedor Full Stack Jr (Front-end Specialist) na Waffle. A solução proposta visa aumentar o engajamento dos leitores da newsletter do **The News** através de uma plataforma de gamificação, onde os leitores podem acompanhar suas sequências de leitura (streaks) e métricas de engajamento.

## 📚 Sumário

1. [Desafio](#-desafio)
2. [Funcionalidades](#-funcionalidades)
    - [Área Logada para Leitores](#-área-logada-para-leitores)
    - [Dashboard Administrativo](#-dashboard-administrativo)
    - [Regras de Streak](#-regras-de-streak)
3. [Relatório](#-relatório)
    - [Perguntas a serem Respondidas](#-perguntas-a-serem-respondidas)
4. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
5. [Estrutura do Projeto](#-estrutura-do-projeto)
6. [Instruções de Uso](#-instruções-de-uso)
    - [Pré-requisitos](#-pré-requisitos)
    - [Rodando o Projeto Localmente](#-rodando-o-projeto-localmente)
7. [Endpoints da API](#-endpoints-da-api)
8. [Automação com GitHub Actions](#-automação-com-github-actions)
9. [Testes](#-testes)
10. [Resultado](#-resultado)
11. [Referências](#-referências)
12. [Licença](#-licença)

## 🎯 Desafio

Este projeto foi desenvolvido para criar uma solução de gamificação que incentiva os leitores da newsletter a manterem um hábito de leitura diário. Através de streaks e métricas de engajamento, os leitores são motivados a abrir as newsletters consecutivamente, enquanto a equipe da Waffle pode monitorar o desempenho das campanhas.

## 💡 Funcionalidades

### 📖 Área Logada para Leitores  

<details>
  <summary> Funcionalidades Principais</summary>

- **Login Simples**  
  - Acesso via e-mail.  

- **Streak de Leituras**  
  - Exibição da sequência de aberturas consecutivas de newsletters.  

- **Histórico de Aberturas**  
  - Visualização das newsletters já abertas pelo usuário.  

- **Mensagens Motivacionais**  
  - Incentivos para manter o streak ativo.  

</details>

<details>
  <summary> Funcionalidades Bônus</summary>

- **Cadastro Obrigatório**  
  - O e-mail precisa estar cadastrado no sistema para permitir o login, mas não está barrando o usuario caso o acesso seja feito via URL. 😢

- **Acompanhamento de Desempenho**  
  - O usuário poderá visualizar:  
    - A sequência atual de streaks.  
    - O recorde pessoal (maior streak alcançado).  
    - O total de newsletters lidas.  

- **Ranking de Leitores**  
  - Exibição de um ranking dos **Top 5 Leitores**, baseado em streaks.  

- **Histórico com Paginação e Busca**  
  - Lista paginada das newsletters lidas, com funcionalidade de busca.  
  - Cada item do histórico exibe:  
    - A newsletter lida.  
    - A data de leitura.  
    - Um link para releitura da newsletter (*caso a URL esteja no formato correto: `https://thenewscc.beehiiv.com/p/data`*).  
  - ⚠️ **Observação**: Se a URL não estiver no formato esperado, o card será criado, mas sem link de direcionamento. 

</details>


### 🛠️ Dashboard Administrativo




<details>
  <summary> Funcionalidades Principais</summary>

- **Métricas de Engajamento**  
  - Visualização de streaks, rankings e padrões de abertura dos usuários.  

- **Filtros**  
  - Filtragem por:  
    - Newsletter específica.  
    - Período de tempo.  
    - Status do streak (ativo ou inativo).  

- **Gráficos**  
  - Análise visual de engajamento dos usuários.  

</details>

<details>
  <summary> Funcionalidades Bônus</summary>

- **Exibição de E-mails**  
  - O mesmo e-mail que o leitor vê no perfil será exibido na área administrativa.  

- **Ranking de Top 5 Leitores**  
  - Repetição do ranking baseado em streaks.  

- **Gráficos de Engajamento**  
  - Exibição de gráficos com:  
    - Número de leitores por dia, semana ou mês.  

- **Tabela de Dados**  
  - Exibição de informações sobre os usuários, incluindo:  
    - Maior streak alcançado (`max_streak`).  
    - Streak atual de cada usuário.  
  - Filtros disponíveis:  
    - Usuários ativos (`streak > 0`).  
    - Usuários inativos (`streak = 0`).  

</details>

### 🔥 Regras de Streak  

<details>
  <summary> Funcionalidades Principais</summary>

- **Cálculo Automático**  
  - O streak aumenta em **+1** a cada dia consecutivo de abertura da newsletter.  

- **Reset Automático**  
  - O streak é zerado se o leitor não abrir a newsletter no dia seguinte.  

- **Exceções**  
  - Domingos **não quebram o streak**, mantendo a sequência intacta.  

</details>

<details>
  <summary> Funcionalidades Bônus</summary>

- **Registro de Recorde Pessoal**  
  - Armazena o maior streak já alcançado por cada usuário no campo `max_streak`.  

</details>

## 🚀 Relatório

Quando recebi o desafio por e-mail, fiquei extremamente animada com a proposta, mas também senti um certo receio de não conseguir desenvolver tudo o que estava sendo pedido. No entanto, a vida é feita de desafios e oportunidades de crescimento. Mesmo com medo, decidi encarar de frente. Assim, já no primeiro dia, criei o repositório no GitHub e comecei a planejar o projeto como um todo.

Conforme fui desenvolvendo, percebi que o desafio realmente exigia bastante, e meu receio inicial fazia sentido, haha. Enfrentei funcionalidades que nunca tinha implementado antes (ou que havia explorado apenas superficialmente). Meu conhecimento em SQL e Python era básico, pois tenho mais experiência com C e TypeScript. Mas agora, olhando para o projeto finalizado, vejo o quanto evoluí em poucos dias. Foi como correr uma maratona: a cada 100 metros conquistados, vinha uma enxurrada de novos aprendizados (comandos e macetes).

Pude colocar à prova minhas habilidades em Figma para a criação das interfaces, trabalhar com PostgreSQL para integrar o banco de dados ao backend e configurar um workflow no GitHub para executar um script a cada 24 horas. Essa solução foi necessária devido à limitação do serviço gratuito do Render, que impõe restrições na execução contínua de aplicações.

No final, ver o projeto funcional me motiva bastante. Gostaria de ter tido mais tempo e uma organização melhor para implementar novas funcionalidades, como:
- Criar uma lógica robusta para a utilização das tabelas.
- Implementar a exportação *CSV* dos dados do dashboard.
- Adicionar testes no frontend com o Cypress.
- Implementar um SEO e Acessibilidade mais robustos.
- Adicionar regras de Marketing, como um rodapé com redirecionamento para os Termos de Serviço e um texto sobre privacidade (seguindo as normas de LGPD).

Existem muitas formas de polir o projeto e espero que possamos trabalhar no **The News** verdadeiro, trazendo várias features 👀. O desafio me proporcionou um crescimento rápido e grandioso (sim, me sinto assim, haha). Por mais desafiador que fosse, a jornada de conseguir, falhar e conseguir novamente, diante de vários obstáculos, foi essencial para que eu conseguisse chegar até aqui.

### 🔍 Perguntas a serem Respondidas

<details>
  <summary> Stacks </summary>
	
1. **Stacks?**  
   Tecnologias Usadas: React, TypeScript, Material UI, Python, PyTest, PostgreSQL, Figma.
   
2. **Quais problemas você enfrentou ao desenvolver?**  
   Enfrentei vários problemas no backend, principalmente com a função de cálculo do streak, que quebrava com frequência. Deveria ter implementado testes (TDD) logo quando desenvolvia o backend em conjunto com o banco de dados, isso teria me poupado muito tempo ao tentar entender por que os dados no banco de dados não estavam fazendo sentido.

3. **Qual a organização que escolheu e por quê?**  
   - **Front-End:** Optei pela metodologia **Atomic Design**, uma abordagem eficaz para a criação de Design Systems. Ela permite quebrar a interface em componentes menores e mais reutilizáveis, que se agrupam em estruturas mais complexas à medida que subimos na hierarquia. O Atomic Design começa com átomos (elementos simples como botões ou campos de texto), formando moléculas (ex: campo de pesquisa com botão), organismos (conjuntos de moléculas, como uma seção de formulário) e, finalmente, páginas ou templates completos. Isso facilita a construção de interfaces escaláveis e consistentes.
   - **Back-End:** Segui o padrão esperado para projetos em Python, garantindo uma estrutura organizada e funcional.
</details>

<details>
  <summary> Dados </summary>
	
1. **Qual a estrutura do seu SQL?**  
   A estrutura do banco de dados segue o modelo de tabela para a `newsletter_read`, que lida com os dados dos leitores. Exemplo de como a tabela é estruturada:

```python
class NewsletterRead(db.Model):
    __tablename__ = 'newsletter_read'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    post_id = db.Column(db.String(255), unique=True, nullable=False, index=True)
    utm_source = db.Column(db.String(50), nullable=False, default="")
    utm_medium = db.Column(db.String(50), nullable=False, default="")
    utm_campaign = db.Column(db.String(50), nullable=False, default="")
    utm_channel = db.Column(db.String(50), nullable=False, default="")
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp(), index=True)
    streak = db.Column(db.Integer, default=0)
    max_streak = db.Column(db.Integer, default=0)

    __table_args__ = (
        Index('ix_newsletter_read_email_timestamp', 'email', 'timestamp'),
    )
```

2. **Como você lida com as inserções e consultas dos leitores?**

   **Inserções:**  
   O endpoint de webhook lida com a inserção de novos registros de leitura de newsletters. O processo envolve:
   1. **Recebimento de Dados:** Os dados são recebidos via parâmetros de consulta (email, post_id, utm_source, utm_medium, utm_campaign, utm_channel).
   2. **Validação:** Verifica se `email` e `post_id` estão presentes. Se faltar algum dado, retorna um erro 400.
   3. **Cálculo de Streak:** A função `calculate_streak` calcula o streak atual e o máximo para o e-mail fornecido.
   4. **Criação de Registro:** Cria um novo objeto `NewsletterRead` com os dados recebidos e os valores de streak calculados.
   5. **Inserção no Banco de Dados:** Adiciona o novo registro à sessão do banco de dados e faz o commit.
   6. **Tratamento de Erros:** Se ocorrer um erro, faz rollback e retorna um erro 500.

   **Consultas:**  
   - **Listagem de Leituras (/reads):** Consulta todos os registros na tabela `newsletter_read`.
   - **Métricas Gerais (/metrics):** Consulta o total de leitores e aberturas.
   - **Top Leitores (/top-readers):** Consulta os 10 leitores com mais leituras, utilizando cache para melhorar a performance.
   - **Streak de um Usuário (/streak):** Consulta o streak atual e o máximo de um e-mail específico.

3. **Ele é escalável? Explique.**  
   Sim, o projeto é escalável. O uso de índices e cache (em `/top-readers`) melhora a performance de consultas frequentes. O formato atual permite que ele seja facilmente particionado conforme necessário, mas pode ser ajustado conforme as demandas aumentem.

</details>

<details>
  <summary> Testes </summary>
	
1. **Quais testes você realizou?**  
   Utilizei o **PyTest** para testar o backend em Python. Gostaria de ter usado o **Cypress** no frontend, mas não foi possível.
   
2. **Quanto tempo levou o desenvolvimento e testes?**  
   O desenvolvimento dos testes com PyTest levou um dia, e ao todo, foram criados **10 testes** para validar o backend.

</details>



## 🛠️ Tecnologias Utilizadas



| **Frontend**         | **Backend**        | **Banco de Dados** | **Outras Ferramentas**       |
|----------------------|--------------------|--------------------|------------------------------|
| React + TypeScript   | Python (Flask)     | PostgreSQL         | Render (Deploy do Backend)   |
| TailwindCSS + Material UI | Pytest (unitários) |                    | GitHub Actions (CI/CD)       |
|                      |                    |                    | Vercel (Deploy do FrontEnd)  |

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
└── README.md               # Documentação do projeto
```

## 🚀 Instruções de Uso


### 🧰 Pré-requisitos


❗️ Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (v18 ou superior)
- **Python** (3.8 ou superior)
- **PostgreSQL**
- **Git**

### ⚙️ Rodando o Projeto Localmente

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
   - O **Frontend** estará disponível em: [http://localhost:3000](http://localhost:3000). <br>
     Você pode logar utilizando um dos e-mails criados via GET ou acessar o projeto diretamente pela URL do deploy: [https://the-news-letter-streaks.vercel.app/](https://the-news-letter-streaks.vercel.app/), usando o meu e-mail de teste: `larissa@thenews.com`.
   - O **Backend** estará disponível em: [http://127.0.0.1:5000](http://127.0.0.1:5000) ou, se preferir, utilize o meu endpoint hospedado: [https://thenewsletterstreakschallenge.onrender.com/](https://thenewsletterstreakschallenge.onrender.com/).

## 📡 Endpoints da API

Para facilitar a visualização e compreensão das rotas implementadas no projeto, criei uma página HTML que oferece um design mais agradável. Acesse a documentação completa das rotas da API clicando no link abaixo:


![Captura de tela de 2025-02-24 01-10-54](https://github.com/user-attachments/assets/1f7fbe5b-38e2-4feb-a8a7-4a052d42529d)

<p align="center">
    <a href="https://thenewsletterstreakschallenge.onrender.com/documentation" target="_blank">Documentação da API - Visualização Melhorada< </a> 
</p>


( ⚠️ Caso insira algum dado na API e os dados estejam desatualizados , execute em seguida o script run_update_streaks.py no backend para manter o banco de dados atualizado ou aguarde até 00h01 para que o Git Workflow execute o script e atualize o banco de dados. ) 

**Backend**:
```sh
     python run_update_streaks.py 
```

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

O projeto conta com um workflow automatizado via **GitHub Actions** para rodar um script periodicamente. 

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



## 📋 Resultado


#### Wireframes do Figma:

![Captura de tela de 2025-02-24 00-54-49](https://github.com/user-attachments/assets/1487c8ad-11bf-4970-a8fa-34e11b841983)

<p align="center">
    <a href="https://www.figma.com/design/9AGtCVgixIWjcjXDGSH2kF/Wireframes---Desafio-Tecnico-(Thew-News)?node-id=2035-40&t=YvBuWCfwbA7zNC7K-1" target="_blank">Acesso aos Wireframes (Prototipos) </a> 
</p>


#### Video do Projeto:
Video da Tela de Login, Tela do Usuario e do Dashboard + Responsividade do Projeto

https://github.com/user-attachments/assets/af16ddc4-63b0-4083-90fa-360d777aaff4

#### Printscreen das Telas:
##### Tela de Login / <br>

![screencapture-localhost-5173-2025-02-24-00_50_35](https://github.com/user-attachments/assets/1e49fae6-41c7-4d36-a177-30fe0fe5aa55)


(Clique na imagem e dê zoom para visualizar os diferentes tipos de responsividade)

![screencapture-localhost-5173-202![screencapture-localhost-5173-2025-02-24-00_44_32](https://github.com/user-attachments/assets/00b5938a-024a-4e4c-861c-53676a2d52d0)
5-02-24-00_44_32](https://github.com/user-attachments/assets/443caacc-a4a5-405b-a118-e8a0bed17836)

##### Tela do Usuario / <br>

![screencapture-localhost-5173-statsPage-2025-02-24-00_51_07](https://github.com/user-attachments/assets/2273797e-6f2e-4751-8759-d156fbbeacce)


(Clique na imagem e dê zoom para visualizar os diferentes tipos de responsividade)

![screencapture-localhost-5173-statsPage-2025-02-24-00_46_42](https://github.com/user-attachments/assets/aeec8717-c086-4425-b1dc-47bdda3f0272)


##### Tela Dashboard / <br>

![screencapture-localhost-5173-dashboardPage-2025-02-24-00_51_52](https://github.com/user-attachments/assets/ad48cafc-413c-49ca-a209-0b7bfcbee918)


(Clique na imagem e dê zoom para visualizar os diferentes tipos de responsividade)

![screencapture-localhost-5173-dashboardPage-2025-02-24-00_49_42](https://github.com/user-attachments/assets/269ffe8d-b047-4d5d-b888-b353012584dc)




## 📚 Referências

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do Material UI](https://mui.com/material-ui/getting-started/)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Flask](https://flask.palletsprojects.com/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação do Render](https://render.com/docs)





## 📜 Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).

<p align="center">
  Desenvolvido com muito ☕ por
  <a href="https://linktr.ee/mewmewdevart" target="_blank">Larissa Cristina Benedito</a>
</p>




