# TodoList

A focused task planner built with Next.js, TypeScript, Prisma, and PostgreSQL. It includes an inbox and project-based task workflow, with sign-in for user-specific work.

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
