# Amcoeur - Backoffice

This application is the administration interface for Amcoeur association members. It allows managing the showcase website content, adoption forms, and the contact database.

## 🚀 Development

This application is part of an Nx monorepo. It is recommended to run commands from the project root.

To start the backoffice in development mode:

```bash
pnpm dev:backoffice
```

Or via Nx:

```bash
pnpm nx serve backoffice
```

## 🏗️ Build

To generate the production build:

```bash
pnpm nx build backoffice
```

## ⚙️ Configuration

Ensure you have configured the necessary environment variables in a `.env` file. You can use `.env.example` as a template.

| Variable | Description |
| :--- | :--- |
| `VITE_MS_CLIENT_ID` | Microsoft Client ID for authentication |
