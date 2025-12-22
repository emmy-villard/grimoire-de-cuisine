# AI Coding Agent Instructions – Grimoire de Cuisine

## Vue d’ensemble
Application portfolio « Grimoire de cuisine » :
- **Frontend** (`frontend/`) : HTML/CSS/JS statiques servis tels quels, logique côté navigateur en modules ES.
- **Backend** (`backend/`) : API Express 5 en mode ECMAScript modules, routes CRUD déjà déclarées mais contrôleurs encore factices.
- **Base de données** : PostgreSQL (schéma à définir, scripts attendus sous `docker/postgres/init/`).
- **Docker** : dossier présent mais non configuré (pas de `docker-compose.yml`).

Langue du projet : **français** (contenu, commentaires, UI). Conserver ce choix dans tout nouveau texte.

## Spécifications clés (résumé du cahier des charges)
- Application « Carnet de recettes / meal planner light ».
- Frontend statique qui consomme l’API pour : lister (`GET /recipes`), afficher (`GET /recipes/:id` ou `/recipes/slug/:slug`), créer (`POST /recipes` avec génération de `slug`), modifier (`PUT /recipes/:id`), supprimer (`DELETE /recipes/:id`).
- Champs requis pour une recette : titre, description (≤140 caractères), temps de préparation/cuisson, difficulté (valeurs autorisées), portions, kcal/portion, ingrédients, instructions, régime, image (upload ou URL), `slug`, `last_update`.
- Gestion d’images : soit URL externe stockée telle quelle, soit upload enregistré côté backend et servi via `/uploads/…`.

## État actuel du code

### Frontend
- Pages principales : `index.html` (liste), `new-recipe.html` (formulaire création), `recipe.html` (détail avec `getRecipe.js`) et `edit-recipe.html` (formulaire générique). Navigation simple via `<nav>`.
- JS modulaire (import natif) chargé via `assets/js/index.js`. Détection de la page par `window.location.pathname` pour déclencher `showRecipe`, `createRecipe` ou `editRecipe`.
- Données stockées en **localStorage** (`getAllRecipes`, `createRecipe`, `deleteRecipe`, `getNextId`). Si aucun enregistrement, fallback vers `assets/json/allRecipes.json`.
- `getRecipe.js` et `editRecipe.js` sont encore des stubs, `config.js` est vide (prévu pour config API). Pas encore d’appels réseau réels.
- Tests unitaires Vitest (voir `frontend/tests/unit/`) couvrant les modules JS + coverage configuré (`vitest.config.js`).

### Backend
- `backend/app.js` configure Express (JSON + CORS permissif via `allowAllOrigins`).
- `backend/routes/recipes.js` expose les 5 routes CRUD sur `/recipes` et délègue à des contrôleurs.
- Les contrôleurs (`controllers/*.js`) répondent pour l’instant via des JSON de placeholder et ne touchent pas la base.
- Pas de couche de persistance ni d’accès PostgreSQL encore implémentés. Aucun middleware d’upload ni validation.
- Scripts npm (`backend/package.json`) : `start` (node server.js), pas de tests.

### Base/PostgreSQL & Docker
- Pas encore de schéma ou migrations. Fichier `docker/postgres/init/01_schema.sql` attendu mais vide.
- Pas de `docker-compose.yml` ni de Dockerfile. À prévoir : services `frontend`, `backend`, `db`, volumes pour init SQL.
- Prévoir un `.env`/`.env.example` contenant `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `DATABASE_URL`, etc., consommés côté backend.

## Attentes pour les futures contributions
1. **Frontend**
  - Continuer d’écrire du JS modulaire sans bundler. Garder les IDs/classes existants.
  - Préparer progressivement la migration localStorage → API (utiliser `config.js` pour centraliser l’URL de l’API).
  - Ajouter/mettre à jour les tests Vitest lorsqu’un module change.
  - Respecter la charte visuelle actuelle (Roboto Slab + Open Sans) et les textes en français.

2. **Backend**
  - Implémenter les contrôleurs Express pour qu’ils manipulent la base PostgreSQL (utiliser `pg` ou un ORM léger).
  - Ajouter une couche de validation (ex. `zod`, validation maison) pour respecter les contraintes des specs.
  - Gérer l’upload d’images (multer + dossier `uploads/recipes/`).
  - Prévoir des tests (integration/unit) quand l’API aura du comportement.

3. **Base & migrations**
  - Définir `recipes` avec les colonnes listées dans les specs (types : `VARCHAR`, `TEXT`, `JSONB`, `TIMESTAMPTZ`, etc.).
  - Ajouter éventuellement des tables complémentaires (tags, catégories) via migrations versionnées.

4. **Docker & opérations**
  - Créer `docker-compose.yml` orchestrant backend, frontend (serveur statique ou simple `npm run serve`), PostgreSQL.
  - Monter `./docker/postgres/init/` vers `/docker-entrypoint-initdb.d/` pour appliquer `01_schema.sql` (et seeds `02_seed.sql`).
  - Documenter la procédure dans `README.md` (ex. `docker compose up --build`).

## Conseils généraux pour l’agent
- Toujours conserver le français dans les messages, labels, commentaires et JSON d’exemple.
- Avant toute modification, vérifier l’impact sur les tests Vitest du frontend et proposer `npm run test` depuis `frontend/` si pertinent.
- Lorsque le backend commencera à interagir avec PostgreSQL, garder les secrets hors dépôt (`.env.local`, `docker/.env`).
- Réutiliser les structures existantes (classe `recipe-card`, dataset `recipeId`, etc.) pour rester compatible avec les tests et le style actuel.
- Mentionner explicitement quand une fonctionnalité reste à l’état de stub pour éviter toute confusion (ex. `getRecipe.js`).

Ces instructions doivent évoluer dès qu’une des couches (API, DB, Docker) avance : mettre à jour ce fichier pour refléter la réalité avant de confier de nouvelles tâches à un agent.
