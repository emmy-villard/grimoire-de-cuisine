# AI Coding Agent Instructions - Grimoire de Cuisine

## Project Overview
**Grimoire de Cuisine** is a fullstack recipe management web application with:
- **Frontend**: Static HTML/CSS/JS in `frontend/` directory
- **Backend**: Node.js/Express API (currently empty in `backend/`)
- **Database**: PostgreSQL
- **Infrastructure**: Docker containerization (`docker/` directory)

Language: French (content and comments are in French)

## Architecture & Data Flow

### Frontend Structure (`frontend/`)
- **Entry point**: `index.html` - Welcome landing page
- **Recipe listing**: `recipes.html` - Lists all available recipes with navigation links
- **Recipe pages**: Individual recipe files (`recipe-*.html`) with template structure:
  - Ingredients section (`<h3>Ingrédients</h3>`)
  - Preparation steps section (`<h3>Préparation</h3>`)
  - Empty `<li>` placeholders ready for content population

**Frontend pattern**: Multiple independent HTML files linked together. No JavaScript or CSS files currently implemented.

### Backend (In Development)
- Empty `backend/` directory - implementation pending
- Expected: Express.js API to serve recipes (likely from PostgreSQL)
- Should provide REST endpoints for recipe CRUD operations

### Docker Setup
- `docker/` directory present but empty - configuration pending
- Expected: Dockerfiles and compose files for containerized deployment

## Development Workflow

### Frontend Changes
1. Edit HTML files directly in `frontend/` - no build process
2. Recipe template pattern: Use `recipe-*.html` naming convention
3. Recipe pages follow consistent structure (see existing recipe files)
4. Add recipe links to `recipes.html` listing page

### Backend Development (When Active)
- Backend directory is empty - establish Node/Express server structure
- Configure PostgreSQL connection and migrations
- Build REST API endpoints for recipe operations

### Docker & Deployment
- Docker setup files needed in `docker/` directory
- Expected structure: separate services for frontend, backend, database

## Key Files & References
- `README.md` - Project overview
- `frontend/recipes.html` - Navigation hub for recipe discovery
- Recipe template: `frontend/recipe-*.html` (exemplified by `recipe-chakchouka-pois-chiches.html`)

## Current Development Stage
Project is in **early stages** with:
- ✅ Frontend skeleton and recipe page templates established
- ⏳ Backend API not yet implemented
- ⏳ Docker configuration pending
- ⏳ Database schema and migrations not yet created

## AI Agent Guidance
- **Frontend tasks**: Edit HTML templates directly, maintain recipe file naming (`recipe-*.html`), add links to `recipes.html`
- **Backend tasks**: When implementing, follow Express.js conventions, establish clear API routes for recipe operations
- **Cross-component**: Plan for frontend-backend integration through REST API calls
- **Consistency**: Maintain French language in content and comments; preserve existing file naming conventions
