# TodoList

A personal task planner built with Next.js, TypeScript, Prisma, and PostgreSQL.

## About the project

The app organizes work into an inbox, projects, and date or status views for today, upcoming, and completed tasks. Users can create projects and tasks, then track each task's description, due date, priority, and status. Sign-in keeps projects tied to their owner, and Prisma stores users, projects, sessions, and tasks in PostgreSQL.

Next.js pages are in `src/app/`; project and task operations are implemented as server actions in `src/actions/`.

## Local development

Requirements: Node.js, npm, and Docker.

1. Install dependencies and create the local environment file:

   ```bash
   npm install
   cp .env.example .env
   ```

2. Start PostgreSQL and the app:

   ```bash
   npm run db:up
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000). PostgreSQL listens on port `5432` and stores its data in a Docker volume. Stop the database with `npm run db:stop`. The example credentials are for local development.

## Useful commands

- Type check: `npm run typecheck`
- Format source files: `npm run format`

The main application is in `src/`, and the Prisma schema is in `prisma/`.
