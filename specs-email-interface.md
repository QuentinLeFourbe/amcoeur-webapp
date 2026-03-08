# Spécifications : Gestion des Contacts et de l'Emailing (Amcoeur)

## 1. Contexte et Objectifs
Le système est divisé en deux modules distincts pour séparer la connaissance client de la diffusion marketing.

---

## 2. Module : Gestion des Contacts
Ce module gère la base de données locale et persistante de l'association.

*   **Visualisation** : Tableau paginé de tous les contacts enregistrés (Nom, Prénom, Email, Ville, etc.).
*   **Importation** : Import de fichiers CSV/Excel (format `nom;prenom;telephone;email;code_postal;ville;adresse`).
*   **Dédoublonnage** : Upsert automatique basé sur l'adresse email.
*   **Source de données** : MongoDB (Table `Contacts`).

---

## 3. Module : Emailing
Ce module gère les listes de diffusion et les communications sortantes.

*   **Statistiques** : Nombre d'abonnés réels sur OVH vs Nombre de désinscrits en base locale.
*   **Visualisation OVH** : Liste des emails actuellement inscrits sur la liste `amcoeur@amcoeur.org`.
*   **Désinscriptions** :
    *   Suivi des désabonnés via MongoDB.
    *   Export CSV de la liste noire des désinscrits.
*   **Synchronisation Intelligente** : Bouton pour injecter les Contacts locaux vers OVH (en excluant les désinscrits et les doublons).
*   **Mise en cache** : Les données OVH sont mises en cache dans Redis pour optimiser les performances.

---

## 4. Architecture UI (Backoffice)
La Sidebar comportera deux nouveaux liens :
1.  **Contacts** : Accès à la base de données brute.
2.  **Emailing** : Accès au pilotage de la newsletter et de la liste de diffusion.
