# Commandes Git pour envoyer vos modifications

Voici les étapes à suivre pour sauvegarder et envoyer vos dernières modifications (gestion des notes et calcul des résultats) sur votre dépôt en ligne.

Ouvrez un terminal dans le dossier de votre projet et exécutez ces commandes l'une après l'autre :

### 1. Ajouter toutes les modifications
Cette commande prépare tous les fichiers modifiés et nouveaux pour le commit.
```bash
git add .
```

### 2. Créer un commit
Cette commande sauvegarde vos modifications localement avec un message descriptif.
```bash
git commit -m "feat: ajout de la gestion des notes et calcul des resultats finaux"
```

### 3. Envoyer vers GitHub
Cette commande envoie vos commits locaux vers le dépôt distant sur la branche `fonctionnalite`.
```bash
git push origin fonctionnalite
```

### (Optionnel) Voir l'état des fichiers
Si vous voulez vérifier quels fichiers ont été modifiés avant de faire `git add .` :
```bash
git status
```
