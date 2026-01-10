# Grimoire de cuisine

Application web fullstack de gestion de recettes : frontend HTML/CSS/JS, API Node/Express, PostgreSQL et Docker.

## Lancer le projet avec Docker

### 1. Prérequis

- Docker et Docker Compose installés
- Ce dépôt cloné en local

### 2. Lancement simplifié (recommandé)

Un script `launch.sh` est disponible à la racine du projet pour automatiser le démarrage.

Assurez-vous qu’il est exécutable :

```bash
chmod +x launch.sh
```

Puis lancez simplement :

```bash
./launch.sh
```

Le script va :

- créer un fichier `.env` (s’il n’existe pas) avec :
  - `POSTGRES_USER=app_user`
  - `POSTGRES_DB=app_db`
   - un `POSTGRES_PASSWORD` généré aléatoirement,
   - un `API_TOKEN` généré aléatoirement (utilisé par le backend et envoyé automatiquement par le frontend),
   - `PUBLIC_BASE_URL` peut être défini pour forcer l’URL publique des uploads.
   - `COMPOSE_PROJECT_NAME=grimoire` pour préfixer les services Docker de ce projet (utile si plusieurs stacks cohabitent).
- démarrer tous les services avec `docker compose up --build`.

### 3. Lancement manuel

Si vous préférez faire les étapes à la main :

1. Créez un fichier `.env` à la racine du projet (au même niveau que `docker-compose.yml`) avec :

   ```env
   POSTGRES_USER=app_user
   POSTGRES_PASSWORD=password
   POSTGRES_DB=app_db
   DATA_MODE=DEMO # 'DEMO' pour localStorage, 'API' pour backend
   API_BASE_URL=http://localhost:3000 # URL de base de l'API backend
   FRONTEND_URL=http://localhost:8000
   API_TOKEN=demo-token # token partagé frontend/backend pour les routes protégées
   PUBLIC_BASE_URL=http://localhost:3000 # optionnel, utilisé pour construire les URLs d'uploads
   COMPOSE_PROJECT_NAME=grimoire # préfixe des services/volumes/réseaux pour éviter les collisions
   ```

> Note : l'`API_TOKEN` est injecté côté frontend pour réaliser les appels ; il ne constitue pas une authentification forte (visible dans les devtools).

2. Depuis la racine du projet, lancez :

   ```bash
   docker compose up --build
   ```

   Les fois suivantes, `docker compose up` seul suffira tant que vous ne changez pas les Dockerfile.

## Déploiement sur un VPS (avec reverse proxy)

Pour exposer l’application derrière Nginx/Traefik sur un domaine (ex. `grimoire.mondomaine.com`) :

- Variables d’environnement (dans `.env` du VPS) :
   - `API_BASE_URL=https://grimoire.domaine.com`
   - `FRONTEND_URL=https://grimoire.domaine.com`
   - `PUBLIC_BASE_URL=https://grimoire.domaine.com` (ou un domaine médias dédié)
   - `COMPOSE_PROJECT_NAME=grimoire` pour éviter les collisions avec d’autres stacks
- Ports : sur le VPS, retirez les mappings 3000/8000/5432 du compose ou bloquez-les via firewall ; le reverse proxy accèdera aux services par le réseau Docker interne.
- Proxy Nginx (à configurer hors dépôt) :
   - `/` → service frontend sur 8000 (interne)
   - `/api` et `/uploads` → service backend sur 3000 (interne)
   - Forcer HTTPS et passer les en-têtes `X-Forwarded-*`.
- Arbo recommandée sur le VPS :
   - `/srv/grimoire/` : tout le code du projet
   - `/srv/projetY/` (autres projets éventuels)
   - `/etc/nginx/conf.d/grimoire.conf` : vhost qui proxy vers les services Docker de `grimoire`.

Cycle de déploiement :
1. Mettre à jour `.env` avec les URLs publiques et secrets.
2. `docker compose up -d` depuis `/srv/grimoire/`.
3. Configurer/reloader Nginx (`nginx -s reload`), puis tester `https://grimoire.mondomaine.com/api/recipes` et un upload.