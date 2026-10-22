# TodoList

## Local development

1. Copy `.env.example` to `.env`.
2. Start PostgreSQL with `npm run db:up`.
3. Start the app with `npm run dev`.

The database listens on port `5432` and stores its data in a Docker volume.
Stop it with `npm run db:stop`. The example credentials are for local development.
