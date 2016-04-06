# jQuery Validator

jQuery Validator vous permet de valider facilement vos formulaires.
Il contient une gestion des erreurs personnalisés, ainsi qu'une gestion des expressions régulières pour les champs à valider.

# Options

```javascript
    errorClass: 'error', // Classe à afficher en cas d'erreur
    validClass: 'valid', // Classe à afficher en cas de succès
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
* **min** ou **data-min** : Valeur minimum pour le range et le number
* **max** ou **data-max** : Valeur maximum pour le range et le number
* **step** ou **data-step** : Valeur de déplacement pour le range
* **data-pattern** : Pattern à exécuter spécialement pour ce champs
* **data-error** : Message d'erreur. S'il n'est pas spécifié un message par défaut sera créé avec le nom du label associé. Si aucun label n'est associé, un autre message par défaut sera créé
* **data-parent** : Spécifie un parent différent de celui indiqué dans les options

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

* type **search** : Les attributs *min* (ou *data-min*) et *max* (ou *data-max*) permettent de tester le nombre de mots
* type **password** : Les attributs *min* (ou *data-min*) et *max* (ou *data-max*) permettent de tester le nombre de caractères

# Améliorations prévues

Aucune

# Exemple

Une démo est visible ici : [http://babeuloula.github.io/jquery.validator/](http://babeuloula.github.io/jquery.validator/)

```html
    <style>
        form.demo label, form.demo input, form.demo textarea, form.demo .error, form.demo .error_display {
          display: block;
        }

        form.demo label {
            margin-top: 10px;
        }

        form.demo input[type="text"], form.demo textarea {
            border-color: rgba(0, 0, 0, 0.2);
            border-style: solid;
            border-width: 1px;
            border-radius: 0.3rem;
            padding: 5px;
        }

        form.demo input[type="submit"] {
            margin-top: 10px;
            margin-bottom: 10px;
        }

        form.demo textarea {
          width: 100%;
          height: 200px;
        }

        form.demo .error_display {
            color: darkred;
            font-size: 12px;
        }
    </style>

    <form class="demo">
        <label for="date">Date *</label>
        <input type="text" data-type="date" name="date" id="date" placeholder="jj/mm/aaaa" data-error="Le champs doit être au format jj/mm/aaaa" data-required="true">

        <label for="email">Adresse email *</label>
        <input type="text" data-type="email" id="email" name="email" placeholder="email@domaine.fr" data-error="Le champs doit être au format email@domaine.fr" data-required="true">

        <label for="site_web">Site Internet</label>
        <input type="text" data-type="url" id="site_web" name="site_web" placeholder="www.domaine.fr" data-error="Le champs doit être au format www.domaine.fr">

        <label for="message">Message *</label>
        <textarea id="message" name="message" placeholder="Votre message" data-required="true"></textarea>

        <input type="submit" id="submit" value="Envoyer">

        <div>
            * Champs obligatoire
        </div>
    </form>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script type="text/javascript" src="dist/jquery.validator.min.js"></script>
    <script>
        jQuery(function($){
            $(document).on('click', '#submit', function(e) {
                e.preventDefault();
                e.stopPropagation();

                $(".error_display").remove();

                var validator = $("form.demo").validator({
                    patterns: {
                        date: '^([0-2][0-9]|3[0-1])/(0[0-9]|1[0-2])/[0-9]{4}$'
                    }
                });

                console.log(validator);

                if(validator.isValid) {
                    // TODO
                } else {
                    $.each(validator.errors, function(key, error) {
                        $('<small class="error_display">'+error.error+'</small>').insertAfter(error.input);
                    });
                }
            });
        });
    </script>
```