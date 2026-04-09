# Amcoeur Backoffice

The administration portal for members of the Amcoeur association.

## Overview

This application provides association members with tools to manage the showcase website content, handle animal adoptions, and run email campaigns. It is built with accessibility in mind to ensure ease of use for all volunteers.

## Key Features

- **Content Management**: Create and edit website pages and dynamic forms.
- **Adoption Management**: Manage animal profiles and track adoption applications.
- **Emailing**: A block-based email editor with real-time preview powered by `@amcoeur/email-builder`.
- **Contact CRM**: Import and manage subscriber databases for newsletters.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Panda-CSS (for type-safe, performant styles)
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod
- **Auth**: Microsoft PKCE Authentication

## Development

Run the backoffice in development mode (with HMR):

```bash
pnpm nx run backoffice:serve
```

## Build

Generate a production build:

```bash
pnpm nx run backoffice:build
```
