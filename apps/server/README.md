# Amcoeur - API Server

This application is the backend API for the Amcoeur association. It is developed with Node.js, Express, and TypeScript, and communicates with MongoDB and Redis.

## 🚀 Development

This application is part of an Nx monorepo. It is recommended to run commands from the project root.

To start the server in development mode:

```bash
pnpm dev:server
```

Or via Nx:

```bash
pnpm nx serve server
```

## 🏗️ Build

To generate the production build:

```bash
pnpm nx build server
```

## ⚙️ Configuration

Ensure you have configured the necessary environment variables in a `.env` file. You can use `.env.example` as a template.

| Variable | Description |
| :--- | :--- |
| `DB_URI` | MongoDB database URI |
| `REDIS_URL` | Redis database URL |
| `MS_CLIENT_ID` | Microsoft Client ID for authentication |
| `CONTACT_EMAIL` | Main contact email |
| `ADMIN_EMAIL` | System administrator email |
| `CAPTCHA_SERVER_KEY` | Google ReCaptcha secret key |
| `NOREPLY_EMAIL` | Email for automatic sending |
| `NOREPLY_EMAIL_PASSWORD` | Automatic email password |
| `NODE_ENV` | Environment (`development` or `production`) |
