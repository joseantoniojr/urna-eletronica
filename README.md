# 🗳️ Urna Eletrônica — Simulação

Projeto educacional que simula o funcionamento de uma urna eletrônica brasileira, utilizando dados públicos de candidatos das Eleições Gerais de 2026.

> ⚠️ Este projeto é uma simulação para fins educacionais e não possui vínculo oficial com o Tribunal Superior Eleitoral (TSE).

## 📋 Sobre o projeto

A aplicação simula o processo de votação desde a seleção do estado até a apuração dos votos.

Os candidatos utilizados na aplicação são provenientes de dados públicos disponibilizados pelo TSE. Esses dados foram processados e convertidos de CSV para JSON para serem utilizados pela API da aplicação.

## ✨ Funcionalidades

- Seleção do estado
- Início da votação
- Consulta de candidato pelo número
- Voto em candidato
- Voto em branco
- Voto nulo
- Votação para dois senadores
- Bloqueio de voto duplicado para o mesmo senador
- Avanço automático entre os cargos
- Tela de finalização da votação
- Apuração dos votos
- Resultados separados por estado
- Resultado nacional para Presidente
- Quantidade de votos por candidato
- Percentual de votos
- Contagem de votos brancos
- Contagem de votos nulos

## 🛠️ Tecnologias

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express
- JavaScript

### Dados

- Dados públicos de candidatos das Eleições Gerais de 2026
- Arquivo CSV disponibilizado pelo TSE
- Conversão de CSV para JSON

## 🏗️ Arquitetura

O projeto é dividido em duas aplicações:

```text
urna-eletronica/
├── frontend/   # React + Vite
└── backend/    # Node.js + Express
```

O frontend é responsável pela interface da urna e pela interação com o eleitor.

O backend disponibiliza a API responsável por candidatos, votação e apuração.

## 🔄 Fluxo da aplicação

```text
INÍCIO
  ↓
Selecionar estado
  ↓
Iniciar votação
  ↓
Deputado Federal
  ↓
Deputado Estadual/Distrital
  ↓
Senador
  ↓
Senador
  ↓
Governador
  ↓
Presidente
  ↓
FIM
  ↓
Apurar votos
  ↓
Resultados
```

## 🗳️ Ordem de votação

1. Deputado Federal
2. Deputado Estadual ou Deputado Distrital
3. Senador
4. Senador
5. Governador
6. Presidente

Para o Distrito Federal, a aplicação utiliza Deputado Distrital no lugar de Deputado Estadual.

## 📊 Apuração

Após o término da votação, a aplicação apresenta:

- candidatos que receberam votos;
- posição no resultado;
- partido;
- quantidade de votos;
- percentual de votos;
- votos brancos;
- votos nulos.

O resultado para Presidente é apresentado separadamente como resultado nacional. Os demais cargos são organizados por estado.

## 🔌 API

### Estados

```http
GET /api/ufs
```

### Cargos

```http
GET /api/cargos
```

### Buscar candidato

```http
GET /api/candidatos/:cargo/:numero?uf=RJ
```

### Iniciar votação

```http
POST /api/eleicao/iniciar-votacao?uf=RJ
```

### Consultar votação atual

```http
GET /api/eleicao/votacao-atual
```

### Registrar voto

```http
POST /api/eleicao/votar/:cargo/:numero?uf=RJ
```

### Voto nulo

```http
POST /api/eleicao/voto-nulo
```

### Voto branco

```http
POST /api/eleicao/voto-branco
```

### Cancelar votação

```http
POST /api/eleicao/cancelar-votacao
```

### Consultar resultados

```http
GET /api/eleicao/resultados
```

## 🚀 Como executar

### 1. Clonar o projeto

```bash
git clone https://github.com/joseantoniojr/urna-eletronica.git
cd urna-eletronica
```

### 2. Executar o backend

```bash
cd backend
npm install
npm start
```

### 3. Executar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Depois acesse a URL disponibilizada pelo Vite.

## 📦 Conversão dos dados

Os dados de candidatos são disponibilizados pelo TSE em formato CSV.

O projeto possui um script responsável por processar esses dados e gerar o arquivo JSON utilizado pela API.

```bash
cd backend
node scripts/convertCandidates.js
```

Arquivo gerado:

```text
backend/data/candidatos.json
```

## 🎯 Objetivo do projeto

O projeto foi desenvolvido como uma aplicação prática para estudar e aplicar conceitos de desenvolvimento web.

Principais conceitos:

- React
- Componentização
- Hooks
- Gerenciamento de estado
- Consumo de API
- APIs REST
- Node.js
- Express
- Manipulação de CSV
- Conversão de dados
- Git e GitHub
- HTML semântico
- CSS
- Separação de responsabilidades entre frontend e backend

## 📚 Aprendizados

Durante o desenvolvimento foram trabalhados:

- Separação entre frontend e backend
- Serviços para comunicação com API
- Organização por controllers, services e routes
- Manipulação e transformação de dados públicos
- Controle de fluxo da aplicação
- Gerenciamento de estado no React
- Renderização condicional
- Renderização de listas
- Validação de dados
- Tratamento de erros
- Organização de código
- Versionamento com Git
