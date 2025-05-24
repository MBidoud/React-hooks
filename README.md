
# TP React Hooks - Application de Blog

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useCallback, useMemo) ainsi que la création de Hooks personnalisés à travers une application de blog simple.

## Installation et configuration initiale

1. Cloner le dépôt :

```bash
git clone https://github.com/pr-daaif/tp-react-hooks-blog.git
cd tp-react-hooks-blog
```

2. Créer votre propre dépôt sur Github et changer le remote :

```bash
# Supprimer le remote origine
git remote remove origin

# Ajouter votre nouveau remote
git remote add origin https://github.com/[votre-username]/tp-react-hooks-blog.git

# Premier push
git push -u origin main
```

3. Installer les dépendances :

```bash
npm install
```

4. Lancer l'application :

```bash
npm start
```

## Instructions pour le TP

Pour chaque exercice :

1. Lisez attentivement l'énoncé
2. Implémentez la solution
3. Testez votre implémentation (pensez à faire des copies d'écran)
4. Mettez à jour la section correspondante dans ce README avec :
   - Une brève explication de votre solution
   - Des captures d'écran montrant le fonctionnement
   - Les difficultés rencontrées et comment vous les avez résolues
5. Commitez vos changements avec un message descriptif

### Exercice 1 : État et Effets

#### Objectif : Implémenter l'affichage et la recherche de posts

- [x] 1.1 Compléter le hook `usePosts` pour récupérer les posts depuis l'API dummyjson.com
- [x] 1.2 Implémenter le composant `PostList` pour afficher les posts
- [x] 1.3 Ajouter la fonctionnalité de recherche par titre ou contenu dans `PostSearch`
- [x] 1.4 Documenter votre solution ici

_Votre réponse pour l'exercice 1 :_

```
J'ai implémenté le hook usePosts pour gérer la récupération des données depuis l'API dummyjson.com. Ce hook:

1. Utilise useState pour gérer l'état des posts, du chargement et des erreurs
2. Ajoute les états nécessaires pour la pagination (totalPosts, skip, hasMore)
3. Implémente la fonction fetchPosts qui utilise fetch pour récupérer les données et met à jour l'état en conséquence
4. Utilise useEffect pour déclencher le chargement des posts lorsque les filtres changent

Pour le composant PostList, j'ai:
- Créé une structure de cartes pour afficher chaque post
- Ajouté la gestion des tags avec des badges cliquables
- Géré le cas où aucun post n'est trouvé avec un message approprié
- Ajouté un bouton "Charger plus" pour le mode non-infini

Pour la fonctionnalité de recherche, j'ai:
- Implémenté un champ de recherche dans le composant PostSearch
- Ajouté un bouton pour effacer la recherche
- Transmis les termes de recherche au hook usePosts qui construit l'URL API appropriée

La principale difficulté a été de gérer correctement la pagination et l'ajout des nouveaux posts à la liste existante sans dupliquer les données.
```

![alt text](/screenshots/post-list.png)

### Exercice 2 : Hooks Personnalisés

#### Objectif : Créer des hooks réutilisables

- [x] 2.1 Créer le hook `useDebounce` pour optimiser la recherche
- [x] 2.2 Créer le hook `useLocalStorage` pour persister les préférences utilisateur
- [x] 2.3 Utiliser ces hooks dans l'application
- [x] 2.4 Documenter votre solution ici

_Votre réponse pour l'exercice 2 :_

```
Pour le hook useDebounce:
- J'ai créé un hook qui prend une valeur et un délai en paramètres
- Le hook utilise useState pour stocker la valeur "debouncée"
- Un useEffect est utilisé pour créer un timer qui met à jour la valeur debouncée après le délai
- Le timer est nettoyé si la valeur change avant que le délai soit écoulé
- Ce hook est intégré au hook usePosts pour optimiser les requêtes API lors de la recherche

Pour le hook useLocalStorage:
- J'ai implémenté un hook qui gère la persistance des données dans le localStorage du navigateur
- Le hook initialise son état en essayant de lire la valeur depuis localStorage
- Si la valeur n'existe pas ou ne peut pas être lue, il utilise la valeur initiale fournie
- Une fonction setValue permet de mettre à jour à la fois l'état React et la valeur dans localStorage
- Le hook supporte les valeurs fonctionnelles comme dans useState

J'ai utilisé ces hooks dans l'application:
- useDebounce est utilisé dans usePosts pour éviter de faire des requêtes API à chaque frappe
- useLocalStorage est utilisé pour persister le thème et le mode de défilement (infini ou pagination)

La principale difficulté rencontrée était de gérer correctement le cycle de vie des effets pour éviter des boucles infinies dans useDebounce.
```

![alt text](/screenshots/use-debounce.png)
![alt text](/screenshots/use-local-storage.png)

### Exercice 3 : Optimisation et Context

#### Objectif : Gérer le thème global et optimiser les rendus

- [x] 3.1 Créer le `ThemeContext` pour gérer le thème clair/sombre
- [x] 3.2 Implémenter le composant `ThemeToggle`
- [x] 3.3 Utiliser `useCallback` et `useMemo` pour optimiser les performances
- [x] 3.4 Documenter votre solution ici

_Votre réponse pour l'exercice 3 :_

```
Pour implémenter le système de thème, j'ai:

1. Créé ThemeContext avec createContext():
   - Développé un ThemeProvider qui utilise useLocalStorage pour persister le thème
   - Fourni une fonction toggleTheme pour basculer entre les thèmes clair et sombre
   - Créé un hook personnalisé useTheme pour accéder facilement au contexte

2. Implémenté le composant ThemeToggle:
   - Un bouton qui affiche une icône différente selon le thème actuel
   - Utilisation de useTheme pour accéder au thème actuel et à la fonction toggle
   - Interface utilisateur adaptative qui change son apparence selon le thème

3. Optimisé les performances avec useCallback et useMemo:
   - Utilisé useCallback pour les gestionnaires d'événements comme handleSearchChange et handleTagClick
   - Appliqué useMemo pour calculer les classes CSS conditionnelles dans PostDetails
   - Calculé efficacement la liste de tags uniques dans usePosts avec useMemo
   - Optimisé buildApiUrl dans usePosts avec useCallback pour éviter des recréations inutiles

4. Appliqué React.memo à tous les composants pour éviter les rendus inutiles:
   - ThemeToggle, PostList, PostSearch, PostDetails et LoadingSpinner utilisent React.memo
   - Les propriétés des composants sont optimisées avec useCallback pour que React.memo soit efficace

L'intégration des thèmes s'applique à tous les composants de l'application, avec des classes conditionnelles qui changent l'apparence des éléments en fonction du thème.
```

![alt text](/screenshots/dark-mode.png)

### Exercice 4 : Fonctionnalités avancées

#### Objectif : Ajouter des fonctionnalités de chargement et détail

- [x] 4.1 Implémenter le chargement infini des posts avec `useIntersectionObserver`
- [x] 4.2 Créer le composant `PostDetails` pour afficher les détails d'un post
- [x] 4.3 Ajouter la fonctionnalité de filtrage par tags
- [x] 4.4 Documenter votre solution ici

_Votre réponse pour l'exercice 4 :_

```
Pour les fonctionnalités avancées, j'ai implémenté:

1. Chargement infini avec useIntersectionObserver:
   - Créé un hook personnalisé qui utilise l'API IntersectionObserver pour détecter quand un élément devient visible
   - Le hook retourne une référence à attacher à l'élément et un état indiquant si l'élément est visible
   - Dans PostList, j'ai attaché cette référence à un élément en bas de la liste
   - Quand cet élément devient visible, le hook déclenche le chargement de nouveaux posts

2. Composant PostDetails pour afficher les détails d'un post:
   - Implémenté un composant qui affiche le titre, le contenu complet, les réactions et les tags d'un post
   - Ajouté un bouton pour fermer les détails et revenir à la liste
   - Appliqué le thème actuel avec des classes conditionnelles
   - Rendu les tags cliquables pour filtrer la liste par tag

3. Filtrage par tags:
   - Dans usePosts, j'ai extrait les tags uniques de tous les posts avec useMemo
   - Implémenté un sélecteur de tags dans PostSearch
   - Ajouté un état selectedTag dans App.js pour suivre le tag sélectionné
   - Modifié le paramètre tag dans usePosts pour filtrer les posts par tag
   - Rendu les tags cliquables dans PostList et PostDetails

La principale difficulté était de coordonner l'état entre les différents composants et de gérer correctement le cycle de vie de l'IntersectionObserver.
```

![alt text](/screenshots/post-details.png)

## Structure détaillée du projet

```
📁 ./
├─ 📄 README.md
├─ 📄 package.json
├─ 📁 public/
│  └─ 📄 index.html
└─ 📁 src/
   ├─ 📄 App.js               # Composant principal de l'application
   ├─ 📄 App.css              # Styles CSS de l'application
   ├─ 📁 components/
   │  ├─ 📄 PostList.js       # Liste des posts
   │  ├─ 📄 PostSearch.js     # Barre de recherche
   │  ├─ 📄 PostDetails.js    # Détails d'un post
   │  ├─ 📄 ThemeToggle.js    # Bouton pour changer de thème
   │  └─ 📄 LoadingSpinner.js # Indicateur de chargement
   ├─ 📁 hooks/
   │  ├─ 📄 usePosts.js       # Hook pour gérer les posts
   │  ├─ 📄 useDebounce.js    # Hook pour débouncer les valeurs
   │  ├─ 📄 useLocalStorage.js # Hook pour gérer le localStorage
   │  └─ 📄 useIntersectionObserver.js # Hook pour le chargement infini
   ├─ 📁 context/
   │  └─ 📄 ThemeContext.js   # Contexte pour le thème
   ├─ 📄 index.css
   └─ 📄 index.js
```

## Ressources utiles

- Documentation de l'API: [https://dummyjson.com/docs/posts](https://dummyjson.com/docs/posts)
- Documentation React Hooks: [https://fr.reactjs.org/docs/hooks-intro.html](https://fr.reactjs.org/docs/hooks-intro.html)
- Guide sur les hooks personnalisés: [https://fr.reactjs.org/docs/hooks-custom.html](https://fr.reactjs.org/docs/hooks-custom.html)

## Rendu

- Ajoutez l'URL de votre dépôt Github dans **Classroom** et envoyez la réponse dès le démarrage de votre projet.
- Les push doivent se faire au fur et à mesure que vous avancez dans votre projet.
- Le README.md doit être à jour avec vos réponses et captures d'écran.
- Chaque exercice doit faire l'objet d'au moins un commit avec un message mentionnant le numéro de l'exercice.

---

# Documentation de l'API dummyjson - Posts

Pour réaliser ce TP, vous utiliserez l'API dummyjson.com qui fournit des données fictives de posts de blog. Voici les points d'entrée que vous utiliserez :

## Points d'entrée API

### Récupérer tous les posts

```
GET https://dummyjson.com/posts
```

Paramètres de requête optionnels :

- `limit` : nombre de posts à récupérer (défaut: 30)
- `skip` : nombre de posts à sauter (pour la pagination)

Exemple : `https://dummyjson.com/posts?limit=10&skip=10`

### Récupérer un post spécifique

```
GET https://dummyjson.com/posts/{id}
```

Exemple : `https://dummyjson.com/posts/1`

### Rechercher des posts

```
GET https://dummyjson.com/posts/search?q={terme}
```

Exemple : `https://dummyjson.com/posts/search?q=love`

### Récupérer les posts par tag

```
GET https://dummyjson.com/posts/tag/{tag}
```

Exemple : `https://dummyjson.com/posts/tag/history`

## Format de réponse

### Liste de posts

```json
{
  "posts": [
    {
      "id": 1,
      "title": "His mother had always taught him",
      "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or whose decisions had led them astray.",
      "userId": 9,
      "tags": ["history", "american", "crime"],
      "reactions": 2
    },
    ...
  ],
  "total": 150,
  "skip": 0,
  "limit": 30
}
```

### Post unique

```json
{
  "id": 1,
  "title": "His mother had always taught him",
  "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or whose decisions had led them astray.",
  "userId": 9,
  "tags": ["history", "american", "crime"],
  "reactions": 2
}
```

## Conseils d'utilisation

- Pour la pagination, utilisez les paramètres `limit` et `skip`
- Pour calculer le nombre total de pages, utilisez la formule : `Math.ceil(total / limit)`
- Pour implémenter le défilement infini, chargez plus de posts quand l'utilisateur atteint le bas de la page
- Pour la recherche, utilisez le point d'entrée `/posts/search` avec le paramètre `q`
- Vous pouvez combiner les paramètres de recherche avec les paramètres de pagination
