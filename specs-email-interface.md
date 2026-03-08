# Spécifications : Interface de Gestion et d'Envoi d'Emails (Amcoeur)

## 1. Contexte et Objectifs
L'objectif est de centraliser la gestion de la communication par email de l'association dans le Backoffice. 
Cette interface doit permettre de piloter la liste de diffusion OVH "Amcoeur" et de suivre finement l'attrition (désinscriptions) pour maintenir une base de données saine.

---

## 2. Fonctionnalités Clés

### A. Pilotage de la Liste de Diffusion (Source : OVH API)
*   **Visualisation du Statut** : Afficher le nom de la liste (`amcoeur@amcoeur.org`) et son état.
*   **Compteur d'abonnés** : Afficher dynamiquement le nombre total d'inscrits récupéré via l'API OVH.
*   **Gestion des membres** (Optionnel phase 2) : Rechercher si un email est présent dans la liste.

### B. Traçage des Désinscriptions (Source : MongoDB)
*   **Dashboard d'attrition** :
    *   Nombre total de désinscriptions enregistrées en base.
    *   Nombre de désinscriptions "en attente" (non encore envoyées dans le rapport hebdomadaire).
*   **Historique** : Liste chronologique des derniers emails désinscrits avec la date exacte.

### C. Export & Reporting
*   **Export CSV** : Bouton permettant de télécharger un fichier CSV contenant la liste complète des désinscrits (Email, Date).
*   **Statut du Rapport** : Indiquer quand le dernier rapport hebdomadaire a été envoyé à l'administration.

### D. Interface d'Envoi (Préparation)
*   **Éditeur de message** : Un champ sujet et un éditeur (Markdown ou HTML simple) pour préparer des communications.
*   **Test d'envoi** : Possibilité d'envoyer l'email préparé à une adresse de test avant diffusion globale.

### E. Importation de Contacts & Base de Données
*   **Import de fichiers** : Support des formats CSV (séparateur `;`) et Excel.
*   **Format attendu** (Entête) : `nom; prenom; telephone; email; code_postal; ville; adresse`.
*   **Gestion des données partielles** : Le système doit accepter l'import même si certains champs (hors email) sont manquants.
*   **Dédoublonnage** : L'email sert d'identifiant unique. Si un email existe déjà, les informations sont mises à jour (ou ignorées selon le choix de l'utilisateur).
*   **Base de données Client** : Création d'une table `Contacts` pour stocker ces informations de manière persistante, indépendamment d'OVH.

### F. Synchronisation Intelligente (Database ↔ OVH)
*   **Action manuelle** : Bouton de déclenchement dans le Backoffice.
*   **Logique cumulative** :
    1.  Récupération de tous les contacts de la base locale.
    2.  **Filtrage** : Exclusion immédiate de tout email présent dans la table `Unsubscribes`.
    3.  **Dédoublonnage OVH** : Vérification des abonnés déjà présents sur la liste OVH pour éviter les erreurs d'ajout.
    4.  **Injection** : Ajout des nouveaux contacts éligibles à la liste de diffusion via l'API OVH.
*   **Rapport de synchro** : Affichage du résultat (ex: "120 nouveaux contacts ajoutés, 15 ignorés car désinscrits, 45 déjà présents").

---

## 3. Architecture Technique (Vision DDD)

### Couche Domaine (Domain)
- **Entity `MailingList`** : Objet métier représentant la liste (nom, nb abonnés, domaine).
- **Entity `UnsubscribeRecord`** : Objet métier représentant une trace de désinscription.
- **Entity `Contact`** : Objet métier représentant un individu (nom, prénom, coordonnées, etc.).
- **Interface `IMailingListService`** : Contrat pour interagir avec le fournisseur (OVH) - *Méthodes : getSubscribers, addSubscriber, removeSubscriber*.
- **Interface `IContactRepository`** : Contrat pour la persistance des contacts.

### Couche Application (Use Cases)
- `GetMailingListStats` : Récupère les chiffres agrégés (OVH + MongoDB).
- `ExportUnsubscribesToCSV` : Transforme les données de la DB en flux CSV.
- `ProcessUnsubscribe` : Orchestre la suppression OVH + l'enregistrement DB.
- `ImportContactsFromFile` : Parse le fichier, valide les données et enregistre en masse.
- `SyncDatabaseWithMailingList` : Orchestre le filtrage et l'injection vers OVH.

### Couche Infrastructure
- **`OVHmailingListProvider`** : Implémentation réelle utilisant `@ovhcloud/node-ovh`.
- **`MongoUnsubscribeRepository`** : Persistance des traces de désinscription.
- **`MongoContactRepository`** : Implémentation Mongoose pour la gestion des contacts.
- **`FileParserService`** : Service utilitaire (CSV/Excel).
- **`ExpressController`** : Points d'entrée pour le Backoffice.

---

## 4. Design UI (Backoffice)
L'interface sera située dans une nouvelle section "Emailing" du Backoffice :
1.  **Header** : Stats rapides (Total Inscrits | Désinscrits cette semaine).
2.  **Main Content** :
    *   Onglet 1 : **Statistiques & Listes** (Tableau des derniers désinscrits + Bouton Export).
    *   Onglet 2 : **Campagne** (Formulaire d'envoi de mail).
3.  **Actions** : Bouton "Synchroniser avec OVH" pour rafraîchir les compteurs.

---

## 5. Prochaines Étapes Techniques
1.  **Backend** : Ajouter une méthode `getSubscribersCount` dans `mailingListService.ts`.
2.  **Backend** : Créer une route `GET /email/unsubscribes/export` générant le CSV.
3.  **Frontend** : Créer la page "Emailing" dans `apps/backoffice`.
