# Cahier des charges – Carnet de recettes

## 1. Caractéristiques essentielles
- Application web “Carnet de recettes / Meal planner light”.
- Frontend en **HTML/CSS/JS**.
- Backend **Node.js / Express** exposant une API REST (JSON uniquement).
- Base de données **PostgreSQL** pour stocker les recettes.
- Architecture en trois couches : frontend / API / base de données.
- URLs lisibles pour les recettes, basées sur une **clé d’URL (`slug`)** dérivée du titre  
  (ex. `recipe.html?url_key=tarte-aux-poireaux` ou `/recipe/tarte-aux-poireaux`).

---

## 2. Structure des pages (pages statiques + API)

Les pages HTML sont **fixes** et servies telles quelles.  
Le contenu (liste, détail, etc.) est rempli côté navigateur avec du JavaScript qui appelle l’API.

- `index.html`  
  - Page d’accueil + **liste de toutes les recettes**.  
  - Au chargement : appel `GET /recipes`, génération des cartes.

- `new-recipe.html`  
  - Page de **création** d’une recette (formulaire → `POST /recipes`).

- `edit-recipe.html`  
  - Page d’**édition** générique.  
  - Reçoit un `id` ou un `url_key` dans l’URL (`?id=...` / `?url_key=...`),  
    charge la recette via l’API, pré-remplit le formulaire, puis envoie un `PUT /recipes/:id`.

- `recipe.html`  
  - Page **détail d’une recette**.  
  - Reçoit un `url_key` dans l’URL (`recipe.html?url_key=...`),  
    appelle `GET /recipes/slug/:slug` et affiche les données.

---

## 3. Exigences principales

### 3.1. Gestion des recettes

- Créer une recette via un formulaire :
  - titre,
  - description courte,
  - temps de préparation,
  - difficulté,
  - instructions.
- Afficher la **liste des recettes** sous forme de cartes (titre, temps, difficulté).
- Afficher le **détail d’une recette** (tous les champs).
- Modifier une recette existante.
- Supprimer une recette.

### 3.2. API / Back-end (Node/Express)

- Endpoints REST :
  - `GET /recipes` – liste des recettes,
  - `GET /recipes/:id` – une recette par id,
  - `GET /recipes/slug/:slug` – une recette par slug (`slug` = `url_key`),
  - `POST /recipes` – créer (génère un `slug` à partir du titre),
  - `PUT /recipes/:id` – modifier,
  - `DELETE /recipes/:id` – supprimer.
- Validation minimale :
  - tous champs obligatoires,
  - difficulté dans une liste de valeurs autorisées,
  - gestion d’erreurs simples (id/slug inexistant, données invalides, descriptions trop longues).

### 3.3. Base de données (PostgreSQL)

- Table `recipes` :
  - `id` (clé primaire),
  - `title` (maximum 50 caractères),
  - `slug` (unique, généré à partir du titre, utilisé dans les URLs),
  - `description` (maximum 140 caractères),
  - `time_minutes`,
  - `difficulty`,
  - `instructions`,
  - `last_update`.