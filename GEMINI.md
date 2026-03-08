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
