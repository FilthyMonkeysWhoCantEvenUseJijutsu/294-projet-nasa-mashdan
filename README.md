# 🌐 Mon Projet Vue.js & Vuetify

## 1. 🎨 Présentation du projet

### Concept
- API choisie : anomalies de la base de données de la NASA (`apis.divtec.me`), données riches (images, dates, centres, mots-clés)  
- Public cible : curieux d’astronomie et d’espace  
- Objectifs de l’application : parcourir les anomalies et consulter le détail de chacune  

### Fonctionnalités principales
- Affichage d’une liste d’éléments (via API)
- Recherche / Tri / Filtres
- Vue détail
- Fonctionnalité interactive (favoris, watchlist, paramètres…)
- Persistance locale (favoris ou préférences)

### Aperçu visuel
_(Capture d’écran de l’application)_  
`![Screenshot de l’application](img/screenshot.png)`

---

## 2. 📚 Parcours d'apprentissage

### Ressources utilisées
#### Documentation & tutos
- [Vue 3 Docs](https://vuejs.org/guide/introduction.html)
- [Vuetify Docs](https://vuetifyjs.com/en/components/all/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Public APIs List](https://github.com/public-apis/public-apis)
- Autres ressources...

#### Progression
- Semaine 1 : ...
- Semaine 2 : ...
- Semaine 3 : ...
- Semaine 4 : ...
- ...

---

## 3. 🛠️ Outils et méthodologie

### Environnement de développement
- **IDE** : VS Code / WebStorm / Autre
- **Versioning** : Git + GitHub
- **Dépendances principales** : Vue 3, Vuetify 3, Pinia, Axios/Fetch
- **Gestion API Keys** : `.env` + `.env.example`

### Installation & Run
- Cloner le repo : `git clone https://github.com/FilthyMonkeysWhoCantEvenUseJijutsu/294-projet-nasa-mashdan.git`
- Installer : `npm install`
- Variables d’environnement : `cp .env.example .env` (contient `VITE_API_URL`)
- Lancer : `npm run dev`
- Variables d’environnement : copier `.env.example` → `.env` et compléter les clés nécessaires  

### Méthodologie
- Découpage en composants réutilisables
- Props & Emits clairs
- Store global avec Pinia
- Commits réguliers et explicites
- Tests manuels (UI, persistance, erreurs API)
- ...

### Choix techniques
- API sélectionnée : NASA Anomalies (`https://apis.divtec.me/api/nasa/anomaly`)  
- Justification du choix : données variées avec images et textes, pas de clé d’API  
- Endpoints utilisés : `GET /api/nasa/anomaly?limit=100`  
- Limites/quotas connus :  

### Architecture (Descriptif + schéma simple + data-flow)
- `App.vue` : racine de l’application  
- `layouts/default.vue` : en-tête, contenu et pied de page  
- `pages/` : routes automatiques (`index.vue` avec recherche, filtre et tri, `favoris.vue`, `a-propos.vue`, `anomalies/[id].vue`, `[...path].vue` pour la 404)  
- `components/` : `AppHeader`, `AppFooter` (slot), `AnomalyCard` (props, bouton favori avec `@click.stop.prevent`, snackbar de confirmation)  
- `plugins/axios.js` : instance Axios (`baseURL` lue depuis `VITE_API_URL`)  
- `stores/anomalyStore.js` : store Pinia (state `anomalies`, `isLoading`, `error` ; state `favorites` (IDs) ; getters `totalAnomalies`, `centers`, `getAnomalyById`, `totalFavorites`, `isFavorite`, `getFavorites` ; actions `fetchAnomalies`, `init`, `toggleFavorite`, `loadFavorites`, `saveFavorites`, `cleanupFavorites`)  
- `utils/anomaly.js` : images, dates, nettoyage des textes de l’API
Outils utiles : Figma / Draw.io / ...

**Data-flow résumé :**  
- `App.vue` appelle `anomalyStore.init()` au montage → le **store** charge l’API via Axios une seule fois → les pages (liste, détail, favoris) lisent le state et les getters. Les favoris sont rechargés depuis `localStorage` (clé `anomaly_favorites`) dans `init()`, puis sauvegardés à chaque `toggleFavorite`.  
- Page liste : `anomalies` → `filteredByCenter` (`v-select`) → `filteredBySearch` (`v-text-field`) → `sortedAnomalies` (bouton A → Z / Z → A). Ce sont des `computed` chaînés : les données du store ne sont jamais modifiées.

---

## 4. 🧪 Tests et validation

### Tests techniques
- ✅ Appels API fonctionnels  
- ✅ Persistance des favoris vérifiée après refresh (`localStorage`, clé `anomaly_favorites`)  
- ✅ Navigation entre les vues OK  
- ...

### Tests d’UX
- Navigation intuitive  
- Recherche/filtre/tri faciles à comprendre  
- Feedback utilisateur (loading, erreurs, vide)  
- ...

### Tests d’accessibilité
- Contraste couleurs (Vuetify par défaut)  
- Labels et placeholders corrects  
- Navigation clavier possible  
- Focus visible  
- ...

### Tests d’erreurs & fallback
- API down → message d’erreur (`v-alert`) affiché à la place de la grille  
- Chargement → squelettes (`v-skeleton-loader`) affichés pendant la requête  
- Liste vide → message clair affiché (aucun favori : “Vous n'avez pas encore d'anomalies favorites.”)  
- Recherche ou filtre sans résultat → message “Aucune anomalie ne correspond à votre recherche ou à votre filtre.”  
- ...

---

## 5. 🤖 Usage d’intelligence artificielle

**⚠️ TRANSPARENCE OBLIGATOIRE** : Si vous utilisez une IA, vous DEVEZ :

### IA utilisée
- **Nom** : ChatGPT / Claude / GitHub Copilot / Autre  
- **Version** : _(ex. GPT-4)_  
- **Contexte** : Aide ponctuelle / Génération de code / Debugging  

### Utilisation détaillée
**Domaines d'aide :**
- Aide au code général : X%
- Génération de snippets Vue/Vuetify : X%  
- Aide à la structuration du projet : X%
- Debugging : X%  
- Recherche d’idées : X%  

**Compréhension et adaptation**
- Expliquer ce que fait le code généré  
- Dire comment il a été adapté au projet  

### Parties codées manuellement
- Composants principaux : X% personnel  
- Store & persistance : X% personnel  
- Routing & navigation : X% personnel  
- Tests & validation : 100% personnel  

### Apprentissage personnel
- Ce que j’ai appris grâce à l’IA  
- Comment elle m’a aidé à progresser  

---

## 6. 🎯 Bilan personnel

### Ce que j’ai appris
- Compétences techniques acquises  
- Découvertes surprenantes  
- Concepts difficiles maîtrisés  

### Difficultés rencontrées
- Problèmes techniques et solutions trouvées  
- Moments de blocage et dépassement  
- Aide reçue et sources  

### Réussites et fiertés
- Aspects du projet dont je suis fier  
- Progrès constatés depuis le début  
- Envies de développement futur  

### Améliorations possibles
- Ce que j’ajouterais avec plus de temps  
- Fonctionnalités bonus envisagées  
- Compétences à approfondir  

---

## 7. 📚 Références & Sources
- Documentation de l’API : [Nom de l’API](https://...)  
- Tutos clés utilisés : ...  
- Usage de l’IA : voir section ci-dessus  
- Autres ressources utiles : ...
