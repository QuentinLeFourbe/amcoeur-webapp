# Amcoeur webapp [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=QuentinLeFourbe_amcoeur-webapp&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=QuentinLeFourbe_amcoeur-webapp) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=QuentinLeFourbe_amcoeur-webapp&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=QuentinLeFourbe_amcoeur-webapp)

This monorepo contains a fullstack application including the showcase website, the backoffice, and an API to allow volunteers of the Amcoeur association to modify the website content in a simple and intuitive way.

## 📂 Project Structure

This monorepo is managed with **Nx** and contains:

- **apps/client**: The public showcase website (React + Vite).
- **apps/backoffice**: The management interface for association members (React + Vite).
- **apps/server**: The backend API (Node.js + Express).
- **libs/types**: A shared types library between frontend and backend.

## 📬 Contact Management & Emailing

The system allows importing a client database to synchronize the OVH mailing list.

### Import Format (CSV/Excel)

For the import to work, your file must contain a header row with the following exact names (column order does not matter):

| Header (File) | Description | Database Field |
| :--- | :--- | :--- |
| **email** | Email address (Required, unique identifier) | `email` |
| **nom** | Last name | `lastName` |
| **prenom** | First name | `firstName` |
| **telephone** | Phone number | `phone` |
| **code_postal** | Zip code | `zipCode` |
| **ville** | City | `city` |
| **adresse** | Full postal address | `address` |

**Technical Notes:**
- The separator for CSV files must be a **semicolon ( ; )**.
- If an email already exists in the database, the contact information will be updated (**upsert**).
- Rows without a valid email will be ignored.

## 🚀 Technologies Used

- **Frontend**: React.js, TypeScript, Vite, Panda-CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB, Redis
- **Monorepo Management**: Nx, pnpm

## ⚙️ Configuration

Each application requires configuration through environment variables. Use the provided `.env.example` files as templates:

- **Backoffice**: `apps/backoffice/.env.example`
- **Server**: `apps/server/.env.example`

Simply copy these files to `.env` and fill in your local values.

### Backoffice (`apps/backoffice/.env`):
```plaintext
VITE_MS_CLIENT_ID=<Microsoft Client ID>
```

### Server (`apps/server/.env`):
```plaintext
DB_URI=mongodb://localhost:27017/amcoeur
REDIS_URL=redis://localhost:6379
# ... (see apps/server/.env.example for full list)
```

## ⬇️ Installation

The project uses **pnpm**.

```bash
pnpm install
```

## 🚀 Development

Start the databases (MongoDB & Redis via Docker):
```bash
pnpm db:start
```

### Main Commands (from root)

| Command | Description |
| :--- | :--- |
| `pnpm start` | Starts the API server |
| `pnpm dev:client` | Starts the showcase website |
| `pnpm dev:backoffice` | Starts the backoffice |
| `pnpm build` | Builds all projects |
| `pnpm test` | Runs tests for the entire workspace |
| `pnpm lint` | Runs linting for the entire project |

## 📄 License

This project is licensed under [MIT](LICENSE).
