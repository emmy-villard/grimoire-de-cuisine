# Cahier des charges – Grimoire de cuisine

## 1. Caractéristiques essentielles
- Application web “Carnet de recettes / Meal planner light”.
- Frontend en **HTML/CSS/JS**.
- Backend **Node.js / Express** exposant une API REST (JSON uniquement).
- Base de données **PostgreSQL** pour stocker les recettes.
- Architecture en trois couches : frontend / API / base de données.

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
  - Reçoit un `id` dans l’URL (`?id=...`),
    charge la recette via l’API, pré-remplit le formulaire, puis envoie un `PUT /recipes/:id`.
  - Sans paramètre `id`, retourne 404 côté frontend (message “Recette non trouvée” ou redirection).

- `recipe.html`  
  - Page **détail d’une recette**.  
  - Reçoit un `id` dans l’URL (`recipe.html?id=...`).  
  - Au chargement : appelle `GET /recipes/:id` et affiche la recette.  
  - Se rendre directement à `site.com/recipe.html` **sans paramètre `id`** renvoie une erreur 404 côté frontend (ou une page “Recette non trouvée”).

---

## 3. Exigences principales

### 3.1. Gestion des recettes

- Créer une recette via un formulaire :
  - titre,
  - description courte,
  - temps de préparation,
  - difficulté,
  - ingrédients,
  - instructions,
  - image (upload **ou** lien direct).
- Afficher la **liste des recettes** sous forme de cartes (titre, temps, difficulté, image si disponible).
- Afficher le **détail d’une recette** (tous les champs).
- Modifier une recette existante.
- Supprimer une recette.

### 3.2. API / Back-end (Node/Express)

- Endpoints REST :
  - `GET /recipes` – liste des recettes,
  - `GET /recipes/:id` – une recette par id,
  - `POST /recipes` – créer,
  - `PUT /recipes/:id` – modifier,
  - `DELETE /recipes/:id` – supprimer.
- Validation minimale :
  - titre obligatoire,
  - difficulté dans une liste de valeurs autorisées,
  - gestion d’erreurs simples (id inexistant, données invalides, descriptions trop longues).

#### Gestion des images

- Lors de la création ou de la modification d’une recette, l’utilisateur peut :
  - soit **téléverser un fichier image**,
  - soit fournir une **URL d’image** existante.
- Si un fichier est téléversé :
  - le backend enregistre le fichier dans un dossier dédié (ex. `uploads/recipes/`),
  - une URL interne du type `/uploads/recipes/nom_de_fichier.jpg` est générée
    et stockée comme `image_url` en base.
- Si une URL externe est fournie :
  - elle est stockée telle quelle dans `image_url`.
- Le frontend affiche l’image si `image_url` est renseigné, sinon aucune image n’est montrée.

### 3.3. Base de données (PostgreSQL)

- Table `recipes` :
  - `id` (clé primaire),
  - `title` (maximum 50 caractères),
  - `description` (maximum 140 caractères),
  - `slug`,
  - `diet_type`,
  - `prepTime`,
  - `cookTime`,
  - `difficulty`,
  - `servings`,
  - `kcal_per_serving`,
  - `instructions`, (tableau)
  - `ingredients`, (tableau)
  - `image_url`,
  - `last_update`.