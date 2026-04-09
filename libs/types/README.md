# @amcoeur/types

This library contains shared TypeScript types between the frontend (React) and the backend (Express) of the Amcoeur project.

## 🚀 Usage

The types are available as a local package within the Nx monorepo.

To build the library:

```bash
pnpm nx build types
```

Other applications (`apps/client`, `apps/backoffice`, `apps/server`) import directly from this package to ensure data consistency.
