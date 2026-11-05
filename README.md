# Prix Mboka

Application web de comparaison et de signalement des prix des produits courants dans les marchés de Brazzaville.

## 👥 Membres du Groupe 9 et Répartition du travail
* **PAMBOU Prince Isaac** 
* **MOUSSOUNDA Karène** 
* **MOUSSANA Dorcasse Benicia** 
* **KEDO Tony Bérenger** 
* **OWALA Brichelvie Jeannelle** *(contribution ponctuelle sur certaines tâches selon la disponibilité de la machine)*

> *Note : Sur les 5 membres du groupe, seuls 2 *(MOUSSANA Dorcasse Benicia et OWALA Brichelve)* se sont réellement manifestés et ont porté l'ensemble du projet à bout de bras.*

## 🔐 Compte de test (Auth.js)
Pour tester l'application sans créer de compte :
* **Email :** `test@prixmboka.cg`
* **Mot de passe :** `Test1234!`                                              

---

## 🚀 Stratégies de rendu (Rendu & Perf)

### 1. Page SSG (Static Site Generation) : `/marches` et `/comment-ca-marche`
* **Justification :** Ces pages affichent des données structurelles et des informations d'aide qui évoluent très rarement. Un rendu statique à la compilation garantit un temps de chargement instantané (`0ms` de temps de réponse serveur) et une excellente performance Lighthouse.

### 2. Page ISR (Incremental Static Regeneration) : `/prix`
* **Justification :** La page de consultation et de filtrage des prix par marché doit être extrêmement rapide tout en restant fraîche. L'ISR permet de régénérer la page en arrière-plan à intervalles réguliers (ex: `revalidate = 60`) pour intégrer les derniers signalements de la communauté sans compromettre la vitesse d'affichage.

### 3. Page SSR (Server-Side Rendering) : `/mes-signalements`
* **Justification :** Cette page est strictement personnelle et propre à chaque utilisateur connecté. Elle nécessite d'interroger la base de données en temps réel via Prisma en fonction de la session active (`auth()`) pour afficher les signalements de l'utilisateur de manière sécurisée et dynamique à chaque requête.