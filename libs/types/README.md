# @amcoeur/types

Shared TypeScript definitions and Zod schemas for the Amcoeur full-stack application.

## Overview

This library serves as the single source of truth for all data structures exchanged between the **Backoffice**, the **Showcase Website**, and the **API Server**. By centralizing types here, we ensure end-to-end type safety and consistent validation logic across the entire monorepo.

## Key Contents

- **DTOs**: Data Transfer Objects for API requests and responses (Adoptions, Contacts, Pages, etc.).
- **Schemas**: Zod validation schemas used for both frontend form validation and backend request parsing.
- **Enums**: Shared constants for roles, statuses, and categories.

## Usage

```typescript
import { EmailCampaignDto, emailCampaignSchema } from '@amcoeur/types';

// Use for type safety
const campaign: EmailCampaignDto = { ... };

// Use for validation
const result = emailCampaignSchema.safeParse(data);
```

## Development

Managed by Nx:
- **Build**: `nx build types`
- **Lint**: `nx lint types`
