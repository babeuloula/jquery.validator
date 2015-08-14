# jQuery Validator

jQuery Validator vous permet de valider facilement vos formulaires.
Il contient une gestion des erreurs personnalisés, ainsi qu'une gestion des expressions régulières pour les champs à valider.

# Options

```
    errorClass: 'error', // Classe à afficher en cas d'erreur
    parent: null, // Si spécifié, la classe erreur sera sur ce parent
    patterns: { // Les patterns
        // #000000
        color: '^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$',

        // 2015-08-20
        date: '^[0-9]{4}-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$',

        // 2015-08-20 15:01
        datetime: '^[0-9]{4}-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):[0-5][0-9]$',

        // 2015-08-20 15:01:56
        datetimeLocal: '^[0-9]{4}-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])T([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9].[0-9]{0,3}$',

        // email@domaine.com
        email: '^[0-9a-zA-Z-_.]+@[0-9a-zA-Z-_.]+.[a-zA-Z]{2,4}$',

        // C:\fakepath\image.jpg
            // Pour tester les extentions :
            // '^(.+).(jpg|jpeg|png)$/i'
        file: '^(.+)$',

        // 192.168.1.200
        ip: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',

        // 2015-09
        month: '^[0-9]{4}-(0[0-9]|1[0-2])$',

        // 42
        number: '^(-|)[0-9]+$',

        // password
        password: '^(.+)$',

        // 0102030405
        tel: '^[0-9]{10}$',

        // 15:01
        time: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',

        // domaine.com ou www.domaine.com ou sous.domaine.com
        url: /^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/,

        // 2015-W35
        week: '^[0-9]{4}-W([0-4][0-9]|5[0-2])$'
    },
    find: [ // Les champs à verifier
        'input',
        'select',
        'textarea'
    ],
    exclude: [ // Les champs à exclure
        'button',
        'button[type="button"]',
        'button[type="submit"]',
        'input[type="button"]',
        'input[type="hidden"]',
        'input[type="image"]', // buggy
        'input[type="reset"]',
        'input[type="submit"]'
    ]
```

## Attributs

Vous pouvez aussi spécifier des attributs dans vos champs afin de spécifier les options

* **required** ou **data-required** ou **data-required="true"** : Indique que le champs est requis
* **min** ou **data-min** : Valeur minimum pour le range
* **max** ou **data-max** : Valeur maximum pour le range
* **step** ou **data-step** : Valeur de déplacement pour le range
* **data-pattern** : Pattern à exécuter spécialement pour ce champs
* **data-error** : Message d'erreur. S'il n'est pas spécifié un message par défaut sera créé avec le nom du label associé. Si aucun label n'est associé, un autre message par défaut sera créé

## Prise en charge des inputs

Tous les types de inputs (sauf *type="image"*) sont pris en charge (sauf ceux qui sont ignorés dans les options). 
Une détection est faite pour savoir si le plugin doit récupérer la valeur d'un input (*button*, *input*, *select* ou *textarea*) ou son code html (*div*, *span* ...).

## Valeurs de retour

jQuery Validator retour un objet avec 2 entrées :

* **isValid** : *true* ou *false*, permet de savoir si le formulaire est valide ou non
* **error** : Tableau contenant les erreurs :
	* **name** : L'attribut *name* du input
	* **input** : L'input qui à créer l'erreur
	* **parent** : *null* si aucun parent n'est spécifié dans les options, ou sinon le parent
	* **error** : Le message d'erreur
	* **value** : La valeur du input

# Cas particuliers

* type **search** : Les attributs *min* (ou *data-min*) et *max* (ou *data-max*) permettent de tester le nombre de mots.

# Améliorations prévues

* type **search** : Si l'attribut *max* (ou *data-max*) n'est pas spécifié, sa valeur sera l'infinie
* type **password** : Utiliser les attributs *min* (ou *data-min*) et *max* (ou *data-max*) pour vérifier la longueur du mot de passe 
* Création d'un attribut *data-parent* pour spécifier un parent spécifique à la place de celui des options

# Exemple

```
    <form>
	    <label for="date">Date d'achat</label>
	    <input type="text" data-type="date" name="date_fr" id="date" data-pattern="^([0-2][0-9]|3[0-1])/(0[0-9]|1[0-2])/[0-9]{4}$" required>
	    
	    <label>IP</label>
  	    <input type="text" data-type="ip" name="ip" data-required>

		<label>Prix</label>
  	    <input type="range" value="5" min="0" max="25" step="5" name="range" data-required="true">
	
		<input type="submit" id="submit" value="Payer">
  	    
    </form>
    
    <script>
	    jQuery(function($){
             $(document).on('click', '#submit', function(e) {
	             e.preventDefault();
                 e.stopPropagation();

                 $(".validator_errors").remove();

                 var validator = $("form").validator();

                 if(validator.isValid) {
                     // TODO
                 } else {
                     $errors = $("<div/>").addClass('validator_errors');
                     $.each(validator.errors, function( index, value ) {
                         $errors.append(value.error + "<br>");
                     });
                     
                     $("form").prepend($errors);
                 }
             });
         });
    </script>
```