## OnlyBuyer Backend

NestJS service that powers the OnlyBuyer storefront. It connects to a MariaDB database via TypeORM and exposes REST endpoints secured by JWT authentication.

### Environment variables

The service expects the variables below at runtime (see `docker-compose.yml` for defaults):

- `PORT` – HTTP port (defaults to `3001`)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` – MariaDB connection
- `JWT_SECRET` – signing key for issued tokens
- `JWT_EXPIRES_IN` – token lifetime (for example `7d`)
- `CORS_ORIGINS` – comma separated list of allowed browser origins (e.g. `http://localhost:8080`)

### Running with Docker

```bash
# from repository root
docker compose up -d --build backend
```

This command builds the image defined in `Dockerfile`, runs database migrations automatically (`synchronize: true`), and exposes the API on port `3001`.

### Swagger documentation

Once the container is running, the OpenAPI UI is available at `http://localhost:3001/api/docs`.

### Local development without Docker

```bash
npm install
npm run start:dev
```

Be sure to export the environment variables listed above or create a local `.env` file before starting the service.

### Database seed data

The repository includes `shopdb.sql`, which Docker Compose mounts into MariaDB so that the schema and sample data are loaded automatically on first start. If you reset the database volume, the script runs again. Alternatively you can apply it manually:

```bash
mysql -h <host> -u <user> -p shopdb < shopdb.sql
```
