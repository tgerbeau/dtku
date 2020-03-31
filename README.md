# TODO application testing

1) RESTFull API

Dans le répertoire dtku/fixtures/

Le fichier *tasksJson.json* contient toutes les données utilisées pour nos tests API.
Le but étant de ne pas avoir des données qui soient contenues dans nos tests.     

Le fichier *usersJson.json* contient les données utilisés pour créer un nouvel utilisateur via la méthide POST. 

Dans le repertoire dtku/integration/tests_dtku/

Le fichier *dtku.js* contient notre logique d'appel des méthodes API pour réaliser nos tests.  
Voici la logique aplliquée : 
 
 1. Init : Effacer la database
 2. Init : Charger les fixtures avant chaque appel
 3. Méthode PUT: CAS PASSANT 
 4. Méthode PUT : CAS NON PASSANT TITRE 
 5. Méthode PUT : CAS NON PASSANT TAGS
 6. Méthode POST : CAS PASSANT
 7. Méthode GET: 
 8. Méthode /task_id GET 
 9. Méthode PATCH : CAS PASSANT
 10. Méthode DELETE
 
TODO : 
 
Sécurité : 
 
Vérifier que l'on ne puisse pas supprimer une task que pour laquelle nous ne sommes pas le Owner.            

2) Single page apllication web UI:  
