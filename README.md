# 📝 TodoApp - Full Stack Task Manager (Pour tuer l'ennui)

Une application de gestion de tâches moderne construite avec React et Node.js, utilisant MongoDB pour la persistance des données.

## 🌟 Fonctionnalités

- ✅ Créer de nouvelles tâches
- ✏️ Modifier des tâches existantes
- ✅ Marquer les tâches comme terminées/non terminées
- 🗑️ Supprimer des tâches
- 📱 Interface utilisateur responsive
- 🚀 API REST complète

## 🛠️ Technologies Utilisées

### Frontend
- **React 19.1.1** - Bibliothèque UI
- **Vite** - Build tool et serveur de développement
- **Tailwind CSS 4.1.13** - Framework CSS utilitaire
- **Axios 1.12.2** - Client HTTP pour les appels API

### Backend
- **Node.js** - Runtime JavaScript
- **Express 5.1.0** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose 8.18.1** - ODM pour MongoDB
- **dotenv 17.2.2** - Gestion des variables d'environnement

## 📁 Structure du Projet

```
TodoApp/
├── backend/
│   ├── config/
│   │   └── db.js              # Configuration MongoDB
│   ├── models/
│   │   └── todo.model.js      # Modèle Mongoose Todo
│   ├── routes/
│   │   └── todo.route.js      # Routes API REST
│   └── server.js              # Point d'entrée serveur
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Composant principal React
│   │   ├── main.jsx          # Point d'entrée React
│   │   └── index.css         # Styles globaux
│   ├── public/
│   └── package.json
├── package.json              # Dépendances racine
└── README.md
```

## ⚡ Installation et Démarrage

### Prérequis
- Node.js (v18 ou supérieur)
- MongoDB (local ou cloud)
- npm ou yarn

### 1. Cloner le projet
```bash
git clone <votre-repo-url>
cd TodoApp
```

### 2. Installer les dépendances
```bash
# Dépendances backend
npm install

# Dépendances frontend
cd frontend
npm install
cd ..
```

### 3. Configuration de l'environnement
Créer un fichier `.env` à la racine du projet :
```env
MONGO_URI=mongodb://localhost:27017/todoapp
NODE_ENV=development
PORT=5000
```

### 4. Démarrer l'application

#### Mode développement (frontend + backend séparés)
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### Mode production
```bash
# Build du frontend
npm run build

# Démarrer le serveur
npm start
```

## 🔧 Documentation API Backend

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Endpoints

#### 1. **GET /api/todos**
Récupère toutes les tâches.

**Réponse :**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789012345",
    "text": "Faire les courses",
    "completed": false,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
]
```

**Codes de statut :**
- `200` - Succès
- `500` - Erreur serveur

---

#### 2. **POST /api/todos**
Crée une nouvelle tâche.

**Corps de la requête :**
```json
{
  "text": "Nouvelle tâche"
}
```

**Réponse :**
```json
{
  "_id": "64a1b2c3d4e5f6789012346",
  "text": "Nouvelle tâche",
  "completed": false,
  "createdAt": "2025-01-15T11:00:00.000Z",
  "updatedAt": "2025-01-15T11:00:00.000Z"
}
```

**Codes de statut :**
- `201` - Tâche créée avec succès
- `500` - Erreur serveur

---

#### 3. **PATCH /api/todos/:id**
Met à jour une tâche existante.

**Paramètres d'URL :**
- `id` - ID MongoDB de la tâche

**Corps de la requête (optionnel) :**
```json
{
  "text": "Texte modifié",
  "completed": true
}
```

**Réponse :**
```json
{
  "_id": "64a1b2c3d4e5f6789012346",
  "text": "Texte modifié",
  "completed": true,
  "createdAt": "2025-01-15T11:00:00.000Z",
  "updatedAt": "2025-01-15T11:15:00.000Z"
}
```

**Codes de statut :**
- `201` - Tâche mise à jour avec succès
- `404` - Tâche non trouvée
- `400` - Erreur de validation

---

#### 4. **DELETE /api/todos/:id**
Supprime une tâche.

**Paramètres d'URL :**
- `id` - ID MongoDB de la tâche

**Réponse :**
```json
{
  "message": "Todo deleted"
}
```

**Codes de statut :**
- `200` - Tâche supprimée avec succès
- `500` - Erreur serveur

## 🗄️ Modèle de Données

### Schema Todo (MongoDB)
```javascript
{
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

## 🏗️ Architecture Backend

### 1. **server.js** - Point d'entrée
- Configuration Express
- Middleware JSON
- Routage vers `/api/todos`
- Gestion des fichiers statiques (production)
- Connexion à la base de données

### 2. **config/db.js** - Configuration MongoDB
```javascript
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
```

### 3. **models/todo.model.js** - Modèle Mongoose
- Définition du schéma Todo
- Validation des données
- Timestamps automatiques

### 4. **routes/todo.route.js** - Routes API
- Gestion CRUD complète
- Gestion d'erreurs
- Validation des paramètres

## 🚀 Scripts NPM

### Scripts racine
```json
{
  "dev": "nodemon backend/server.js",
  "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
  "start": "node backend/server.js"
}
```

### Scripts frontend
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

## 🔒 Variables d'Environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `MONGO_URI` | URL de connexion MongoDB | `mongodb://localhost:27017/todoapp` |
| `PORT` | Port du serveur | `5000` |
| `NODE_ENV` | Environnement d'exécution | `development` |

## 🐛 Débogage

### Erreurs courantes

1. **Erreur de connexion MongoDB**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:27017
   ```
   - Vérifiez que MongoDB est démarré
   - Vérifiez l'URL dans `.env`

2. **Port déjà utilisé**
   ```
   Error: listen EADDRINUSE :::5000
   ```
   - Changez le port dans `.env`
   - Ou tuez le processus : `npx kill-port 5000`

3. **Module non trouvé**
   - Réinstallez les dépendances : `npm install`

## 📈 Améliorations Futures

- [ ] Authentification utilisateur
- [ ] Catégories de tâches
- [ ] Dates d'échéance
- [ ] Notifications
- [ ] Mode hors ligne
- [ ] Tests unitaires
- [ ] Documentation API Swagger

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence ISC.

## 👨‍💻 Auteur

Votre nom - [votre-email@example.com]

---

**Fait avec ❤️ et Node.js**