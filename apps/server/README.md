# Amcoeur API Server

The backend engine for the Amcoeur full-stack application.

## Overview

This Node.js application provides a RESTful API that powers both the showcase website and the backoffice. It handles data persistence, authentication, image processing, and email delivery.

## Key Features

- **RESTful API**: Endpoints for pages, forms, adoptions, and contacts.
- **Authentication**: Secure admin access integrated with Microsoft PKCE.
- **Email Delivery**: Powered by Nodemailer and `@amcoeur/email-builder` for multi-part (HTML/Text) newsletters.
- **Image Processing**: Automated resizing and compression via `Sharp`.
- **Caching**: Performance optimization using Redis.

## Tech Stack

- **Runtime**: Node.js 22 (ESM)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Cache**: Redis
- **Tooling**: TypeScript, esbuild, Nx

## Configuration

Requires a `.env` file at the root. See the main project `README.md` for the list of required variables.

## Development

Run the server in development mode (with auto-reload):

```bash
pnpm nx run server:serve
```

## Build

Generate a production bundle:

```bash
pnpm nx run server:build
```
