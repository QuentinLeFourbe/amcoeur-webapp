# Amcoeur Webapp

This monorepo contains a full-stack application including the showcase website, the backoffice, and an API. It is designed to allow volunteers of the Amcoeur association to manage website content easily and intuitively. The primary users of the site are elderly people, necessitating a clean and accessible interface.

## 📂 Project Structure

This monorepo consists of:

- **Showcase Website (`apps/client`)**: The public-facing website for the association.
- **Backoffice (`apps/backoffice`)**: An administration interface for association members.
- **API (`apps/server`)**: A RESTful API for managing pages, forms, adoptions, and emailing.
- **Types Library (`libs/types`)**: Shared TypeScript definitions used across all applications.
- **Email Builder Library (`libs/email-builder`)**: A shared React-based library for consistent email rendering.

## 📬 Contact Management & Emailing

The system allows importing a contact database to synchronize with the OVH mailing list.

### Import Format (CSV/Excel)

The import file must contain a header row with the following exact names (column order does not matter):

| Header (File) | Description | Database Field |
| :--- | :--- | :--- |
| **email** | Email address (Required, unique identifier) | `email` |
| **nom** | Last Name | `lastName` |
| **prenom** | First Name | `firstName` |
| **telephone** | Phone Number | `phone` |
| **code_postal** | Zip Code | `zipCode` |
| **ville** | City | `city` |
| **adresse** | Full Postal Address | `address` |

**Technical Notes:**
- The separator for CSV files must be a **semicolon ( ; )**.
- If an email already exists in the database, the contact information will be updated (**upsert**).
- Rows without a valid email will be ignored.

## 🚀 Technologies Used

- **Frontend**: React.js, TypeScript, Vite, Panda-CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (via Mongoose), Redis (caching)
- **Emailing**: React Email (@react-email/components)
- **Monorepo Management**: Nx

## ⚙️ Configuration

Environment variables should be configured in a `.env` file at the root of each application directory.

### Backoffice (`apps/backoffice/.env`):
```plaintext
VITE_MS_CLIENT_ID=<Microsoft PKCE Auth Client ID>
VITE_API_URL=<API Base URL, e.g., http://localhost:3000>
```

### Server Variables

```plaintext
CAPTCHA_SERVER_KEY=<Google ReCaptchaV2 secret key>
CONTACT_EMAIL=<Target email for contact forms>
ADMIN_EMAIL=<Target email for system notifications>
ADMIN_MS_ID=<Microsoft ID for admin access>
NOREPLY_EMAIL=<Email address for automated sending>
NOREPLY_EMAIL_PASSWORD=<Password for the automated email account>
DB_URI=<MongoDB connection URI>
REDIS_URL=<Redis connection URL>
MS_CLIENT_ID=<Microsoft PKCE Auth Client ID>
API_URL=<Absolute API URL for image resolution in emails>
NODE_ENV=<"development" or "production">
```

## ⬇️ Installation

```bash
# Install dependencies for the entire workspace
pnpm install
```

## 🚀 Development Workflow

### Database Setup

Run Redis and MongoDB using Docker:

```bash
pnpm run start-db
```

### Starting Applications

The project uses Nx to manage tasks. You can run individual applications or all of them at once.

**Run All (Client, Backoffice, Server):**
```bash
pnpm run dev
```

**Run Individual Apps:**
```bash
# Showcase Website
pnpm run dev-client

# Backoffice
pnpm run dev-backoffice

# API Server
pnpm run dev-server
```

## 🏗️ Building for Production

```bash
# Build all projects
pnpm nx run-many -t build
```

## 📄 License

This project is licensed under the [MIT](LICENSE) license.
