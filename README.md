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
   FRONTED_URL = http://localhost:8000
   ```

2. Depuis la racine du projet, lancez :

   ```bash
   docker compose up --build
   ```

   Les fois suivantes, `docker compose up` seul suffira tant que vous ne changez pas les Dockerfile.