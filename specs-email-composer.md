# Spécifications : Éditeur de Campagnes Email (Amcoeur)

## 1. Objectifs
Permettre aux administrateurs de concevoir des emails professionnels et cohérents graphiquement en utilisant un système de blocs, similaire à l'éditeur de pages du site. L'email est envoyé à une liste prédéfinie ou à une adresse de test pour validation.

---

## 2. Configuration de l'Email
*   **Objet (Subject)** : Champ de texte obligatoire pour définir le titre du mail.
*   **Destinataire** : Par défaut, utilise la variable d'environnement `NEWSLETTER_TARGET_EMAIL` (qui peut être l'adresse de la mailing list OVH).
*   **Mode Test** : Possibilité de saisir une adresse email alternative pour un envoi de test.

---

## 3. Système de Blocs (Composition)
L'utilisateur compose son mail en ajoutant les blocs suivants dans l'ordre de son choix :

### A. Bloc "Titre"
*   **Données** : Texte simple.
*   **Rendu** : Titre centré, police élégante (Playfair Display), couleur Rose Amcoeur.

### B. Bloc "Zone de texte"
*   **Données** : Texte enrichi (Markdown).
*   **Rendu** : Paragraphes centrés, respectant les styles de formatage (gras, listes).

### C. Bloc "Image"
*   **Données** : Upload de 1, 2 ou 3 fichiers images.
*   **Dispositions (Layouts)** :
    *   **Image Simple** : Occupe toute la largeur du conteneur (centrée).
    *   **Duo** : Deux images côte à côte (50% de largeur chacune).
    *   **Trio** : Trois images côte à côte (33% de largeur chacune).
*   **Traitement Automatique** :
    *   **Redimensionnement** : Les images sont automatiquement ajustées pour tenir sur une seule ligne sans dépassement.
    *   **Compression** : Optimisation du poids des fichiers pour garantir une réception fluide dans les boîtes mail.
*   **Rendu** : Images centrées verticalement entre elles, bords légèrement arrondis.

---

## 4. Design et Template (Layout)
L'email généré doit respecter la charte graphique Amcoeur :
*   **Structure** : Conteneur central de 600px max (standard emailing).
*   **Fond** : Blanc ou très gris très clair pour le corps du mail.
*   **Bordures** : Bandes latérales **Rose Pâle** (`amcoeurPale`) pour rappeler l'identité visuelle du site.
*   **Signature Automatique** :
    *   Logo Amcoeur en bas.
    *   Lien de désinscription obligatoire : `Se désinscrire de la newsletter`.
    *   Lien vers le site officiel.

---

## 5. Interface Utilisateur (Backoffice)
Une nouvelle page "Composer un Email" avec un layout en deux colonnes (ou vertical sur mobile) :

1.  **Zone d'Édition (Gauche/Haut)** :
    *   Formulaire pour l'objet.
    *   Liste dynamique de blocs (Ajouter, Déplacer, Supprimer).
    *   Bouton "Envoyer la campagne" et "Envoyer un test".
2.  **Prévisualisation en Temps Réel (Droite/Bas)** :
    *   Rendu visuel fidèle de l'email tel qu'il apparaîtra dans une boîte de réception (simulé via une iframe ou un conteneur stylisé).

---

## 6. Architecture Technique

### Backend
*   **Contrôleur `emailing.ts`** : Nouvelle méthode `sendCampaign` qui reçoit les blocs, génère le HTML final et l'envoie via `Nodemailer`.
*   **Service `mailService.ts`** : Création d'un template HTML de base avec injection dynamique du contenu.

### Frontend
*   **Composant `EmailEditor`** : Utilise `useFieldArray` (React Hook Form) pour gérer la liste des blocs.
*   **Composant `EmailPreview`** : Transforme les blocs JSON en rendu HTML/CSS en temps réel.
