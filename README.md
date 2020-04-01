# TODO application testing

## 1) RESTFull API

### Dans le répertoire dtku/fixtures/

Le fichier *tasksJson.json* contient toutes les données utilisées pour nos tests API.
Le but étant de ne pas avoir des données qui soient contenues dans nos tests.     

Le fichier *usersJson.json* contient les données utilisés pour créer un nouvel utilisateur via la méthide POST. 

### Dans le repertoire dtku/integration/tests_dtku/

Le fichier *dtku.js* contient notre logique d'appel des méthodes API pour réaliser nos tests.  
Voici la logique appliquée : 
 
 1. Init : Effacer la database
 2. Init : Charger les fixtures avant chaque appel
 3. Méthode PUT: CAS PASSANT 
 4. Méthode PUT : CAS NON PASSANT "TITRE" 
 5. Méthode PUT : CAS NON PASSANT "TAGS"
 6. Méthode POST : CAS PASSANT
 7. Méthode /GET 
 8. Méthode /task_id GET 
 9. Méthode PATCH : CAS PASSANT
 10. Méthode DELETE
 
### Dans le repertoire dtku/support/

Le fichier *commands.js* contient toutes les commandes Cypress que l'on peut ensuite appeler simplement sans notre code. 

Il contient par exemple les méthodes *login(), login_UI(), ..., deleteTask(), verifyTags()* 
 
TODO : 
 
Sécurité : 
 
Vérifier que l'on ne puisse pas supprimer une task que pour laquelle nous ne sommes pas le Owner. 

Méthode PATCH : CAS NON PASSANT 

Même avec un titre supérieur à 20 caractères, la méthode PATCH ne renvoit pas d'erreur.

Pour vérifier la réponse de la Méthode /GET, il faut faire une fixture avec le même schéma JSON que la réponse renvoyée par la méthode /GET. 

Ainsi, on pourra comparer si le schéma retourné est conforme à celui attendu (celui préalablement défini par notre fixture)     

## 2) Single page application web UI:  

Les tags ont bien une contrainte pour ne pas dépasser 20 charactères. 

Les titres n'ont pas cette contrainte. Il devrait y en avoir une. 

Le status de la tache (ex: In Progress) n'est pas clairement visible et nécessite un surlignage pour pouvoir être lu.

On ne peut pas aoouter ou supprimer un tag dans le mode "Edit" 

