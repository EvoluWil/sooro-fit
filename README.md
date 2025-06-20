
# 🏋️‍♂️ Sooro Fit

Este projeto foi desenvolvido como parte do teste para Desenvolvedor Full Stack da Sooro Renner. Ele consiste em um sistema web completo, com funcionalidades voltadas ao controle e acompanhamento da evolução física dos alunos de uma academia, com base no IMC (Índice de Massa Corporal).

## 📁 Estrutura do Projeto

O sistema foi desenvolvido em um monorepo manual com a seguinte estrutura:

```
.
├── api/
│   └── Backend em NestJS
├── web/
│   └── Frontend em Next.js
├── package.json → Gerenciamento centralizado
└── README.md
```

---

## 🚀 Tecnologias Utilizadas

### Backend (API)
- NestJS
- TypeScript
- TypeORM + Migrations
- SQLite
- Yup (validações)
- JWT (autenticação)

### Frontend (WEB)
- Next.js
- React + TypeScript
- Chakra UI
- React Query
- React Hook Form + Yup
- Axios

---

## 🧪 Como executar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/EvoluWil/sooro-fit.git
cd sooro-fit
```

### 2. Instale as dependências

```bash
npm install:all
```

> Isso instala as dependências tanto da `api/` quanto da `web/`.

### 3. Execute as migrations e o seed

```bash
npm run migration:run
npm run seed
```

### 4. Rode o sistema (API + Web)

```bash
npm run dev
```

- A **API** será executada na porta `http://localhost:3333`
- A **WEB** será executada na porta `http://localhost:3000`

---

## 🔒 Perfis de Acesso

- **Administrador**: gerencia usuários e avaliações de IMC.
- **Professor**: gerencia seus alunos e avaliações.
- **Aluno**: acessa suas próprias avaliações.

---

## 📦 Funcionalidades implementadas

- Autenticação com JWT
- Cadastro e gestão de usuários (admin, professor, aluno)
- Cadastro e consulta de avaliações de IMC
- Classificação automática do IMC
- Filtros por aluno ou professor
- Validação e controle de acesso por tipo de usuário
- Interface intuitiva com Chakra UI

---

## 📝 Considerações Finais

Este projeto foi desenvolvido como parte do **desafio técnico da Sooro Renner**, com foco em performance, usabilidade, escalabilidade e boas práticas de desenvolvimento front-end.

Desenvolvido com 💛 por Willian Rodrigues.