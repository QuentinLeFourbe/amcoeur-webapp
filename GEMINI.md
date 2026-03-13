# Mandats d'Ingénierie Gemini CLI

## 🛡️ Typage Strict (TypeScript)

- **Interdiction du `any`** : L'utilisation du type `any` est formellement interdite dans tout le projet. Utilisez des types précis, des interfaces ou, à défaut, `unknown` avec un guard de type.
- **Types Partagés** : Privilégiez toujours l'utilisation et l'extension du package `@amcoeur/types` pour maintenir la cohérence entre le frontend (React) et le backend (Express).

## 🏗️ Architecture & Style

- **Pattern MVC** : Respectez l'architecture actuelle (Routes -> Controllers -> Models/Services). Ne pas introduire de DDD ou d'autres architectures complexes sans directive explicite.
- **Langue** :
  - Code (variables, fonctions, modèles, base de données) : **Anglais obligatoire**.
  - Commentaires techniques : **Français**.
  - Interface utilisateur : Support multilingue via `i18next`.

## 🚀 Déploiement & Ops

- **Fly.io** : Le port interne standard est le **3000**.
- **Images** : La persistance des images se fait via un volume monté sur `/app/apps/server/uploads`. Toute modification du stockage doit prendre en compte cette contrainte ou passer par Tigris (S3).
- **Cachage** : Privilégiez Upstash Redis via l'intégration native Fly.io.

## 📁 Gestion des Contacts

- **Identifiant Unique** : L'email est l'identifiant unique pour la base de données Contacts.
- **Respect de la vie privée** : Toujours filtrer les contacts via la table `Unsubscribes` avant toute action marketing ou synchronisation avec OVH.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
