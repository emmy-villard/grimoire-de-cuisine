# Grimoire de cuisine

Carnet de recettes / planificateur de repas léger (meal planner) : frontend statique (HTML/CSS/JS natif) et API Node/Express connectée à PostgreSQL, le tout orchestré par Docker.

- **Démo publique** : https://grimoire.emmyvillard.fr (mise en ligne de référence).
- **Stack** : JS (ES modules), Express 5, PostgreSQL, Docker Compose, Vitest pour les tests frontend.
- **Fonctionnalités prévues** :
  - création/édition/suppression de recettes avec génération de slug,
  - affichage par ID ou par slug,
  - stockage des images (URL externe ou upload),
  - filtres par régime, portions/kcal, difficulté, temps de préparation/cuisson.

## Structure rapide

- `frontend/` : pages statiques, modules JS, tests Vitest.
- `backend/` : API Express (routes CRUD déjà posées, contrôleurs en cours d’implémentation).
- `docker/` : config PostgreSQL (init SQL), scripts d’orchestration.
- `launch.sh` : bootstrap Docker (génère `.env`, lance `docker compose`).

## Démarrage local (Docker)

### 1) Prérequis

- Docker et Docker Compose installés
- Ce dépôt cloné en local

### 2) Lancement simplifié (recommandé)

```bash
chmod +x launch.sh
./launch.sh
```

Le script :

- crée `.env` si besoin avec `POSTGRES_USER`, `POSTGRES_DB`, un `POSTGRES_PASSWORD` et un `API_TOKEN` aléatoires,
- accepte `PUBLIC_BASE_URL` pour forcer l’URL publique des uploads,
- ajoute `COMPOSE_PROJECT_NAME=grimoire` pour préfixer les services,
- démarre les services via `docker compose up --build`.

### 3) Lancement manuel

```env
POSTGRES_USER=app_user
POSTGRES_PASSWORD=password
POSTGRES_DB=app_db
DATA_MODE=DEMO # 'DEMO' pour localStorage, 'API' pour backend
API_BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:8000
API_TOKEN=demo-token # token partagé frontend/backend pour les routes protégées
PUBLIC_BASE_URL=http://localhost:3000 # optionnel, pour construire les URLs d'uploads
COMPOSE_PROJECT_NAME=grimoire
```

Puis depuis la racine :

```bash
docker compose up --build
```

Les fois suivantes, `docker compose up` suffit tant que les Dockerfile ne changent pas.

## Déploiement sur un VPS (avec reverse proxy)

- Mettre à jour `.env` avec les URLs publiques (`API_BASE_URL`, `FRONTEND_URL`, `PUBLIC_BASE_URL`) et les secrets.
- Configurer le reverse proxy (Nginx/Traefik) :
  - `/` → frontend (8000 interne)
  - `/api` et `/uploads` → backend (3000 interne)
  - HTTPS obligatoire, avec en-têtes `X-Forwarded-*`.
  - Exemple minimal Nginx (les `proxy_pass` pointent vers les services Docker `frontend` et `backend` présents sur le même réseau) :

  ```nginx
  server {
    listen 443 ssl;
    server_name grimoire.mondomaine.com;
    ssl_certificate /etc/ssl/certs/letsencrypt/fullchain.pem;
    ssl_certificate_key /etc/ssl/private/letsencrypt/privkey.pem;

    location / {
      proxy_pass http://frontend:8000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto https;
    }
    location /api {
      proxy_pass http://backend:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto https;
    }
    location /uploads {
      proxy_pass http://backend:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto https;
    }
  }
  ```

- **Important** :
  - le reverse proxy doit être sur le même réseau Docker que `frontend` et `backend` (ex.: `networks: [grimoire_default]` créé automatiquement par Docker Compose, ou configuration équivalente côté VPS) ;
  - vérifiez avec `docker network ls` puis `docker network inspect <nom_du_réseau>` que le proxy et les services partagent bien le même réseau.
- Sur le VPS : retirer ou firewaller les mappings 3000/8000/5432 si un reverse proxy frontal est utilisé ; les services restent accessibles sur le réseau Docker interne.
- Arbo recommandée : `/srv/grimoire/` pour le code ; vhost Nginx dans `/etc/nginx/conf.d/grimoire.conf`.

Cycle de déploiement :
1. Mettre à jour `.env`.
2. `docker compose up -d` depuis `/srv/grimoire/`.
3. Recharger Nginx (`nginx -s reload`), puis tester `https://grimoire.mondomaine.com/api/recipes` et un upload.
