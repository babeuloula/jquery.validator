(function($) {
    $.fn.validator = function(options) {
        var valid  = true;
        var errors = [];

        var defauts = {
            errorClass: 'error',
            validClass: 'valid',
            parent: null,
            patterns: {
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
                ip: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',

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
            find: [
                'input',
                'select',
                'textarea'
            ],
            exclude: [
                'button',
                'button[type="button"]',
                'button[type="submit"]',
                'input[type="button"]',
                'input[type="hidden"]',
                'input[type="image"]', // buggy
                'input[type="reset"]',
                'input[type="submit"]'
            ]
        };

        if(options !== undefined) {
            if(options.patterns !== undefined) {
                $.each(defauts.patterns, function( index, value ) {
                    if(options.patterns[index] === undefined) {
                        options.patterns[index] = value;
                    }
                });
            }

            if(options.find !== undefined) {
                $.each(defauts.find, function(key, value) {
                    if($.inArray(value, options.homePages) === -1) {
                        options.find.push(value);
                    }
                });
            }

            if(options.exclude !== undefined) {
                $.each(defauts.exclude, function(key, value) {
                    if($.inArray(value, options.homePages) === -1) {
                        options.exclude.push(value);
                    }
                });
            }
        }

        var o = $.extend(defauts, options);

        var $selector = $(this);

        $selector.find(o.find.join(',')).not(o.exclude.join(',')).each(function() {

            var $input = $(this);

            var _tagName = this.nodeName.toLowerCase();
            var _requied = (($input.attr('data-required') !== undefined && $input.attr('data-required') === 'true') || ($input.attr('data-required') !== undefined && $input.attr('data-required') === '') || $input.attr('required') !== undefined);

            var _value = null;
            if(_tagName === 'button' || _tagName === 'input' || _tagName === 'select' || _tagName === 'textarea') {
                _value = $.trim($input.val());
            } else {
                _value = $.trim($input.html());
            }

            var _type = null;
            if($input.attr('data-type') !== undefined) {
                _type = $input.attr('data-type');
            } else if($input.attr('type') !== undefined) {
                _type = $input.attr('type');
            } else {
                _type = 'text';
            }

            $input.removeClass(o.errorClass);

            var _regex  = null;
            var regex   = null;
            var _min    = null;
            var _max    = null;
            var _step   = null;
            var _length = null;
            var _id     = null;
            var _label  = null;
            var _error  = null;
            var _parent = null;

            if($input.attr('data-parent') !== undefined) {
                _parent = $.trim($input.attr('data-parent'));
            } else if(o.parent !== null && o.parent !== '') {
                _parent = o.parent;
            }

            switch (_type) {
                case 'color':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.color);
                    break;

                case 'date':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.date);
                    break;

                case 'datetime':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.datetime);
                    break;

                case 'datetime-local':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.datetimeLocal);
                    break;

                case 'email':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.email);
                    break;

                case 'file':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.file);
                    break;

                case 'ip':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.ip);
                    break;

                case 'month':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.month);
                    break;

                case 'number':
                    _value = parseFloat(_value);

                    if($input.attr('data-min') !== undefined) {
                        _min = parseFloat($input.attr('data-min'));
                    } else if($input.attr('min') !== undefined) {
                        _min = parseFloat($input.attr('min'));
                    } else {
                        _min = -Infinity;
                    }

                    if($input.attr('data-max') !== undefined) {
                        _max = parseFloat($input.attr('data-max'));
                    } else if($input.attr('max') !== undefined) {
                        _max = parseFloat($input.attr('max'));
                    } else {
                        _max = Infinity;
                    }

                    regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.number);

                    if(!regex.test(_value) || _value < _min || _value > _max) {
                        valid = false;

                        if($input.attr('data-error') !== undefined) {
                            _error = $input.attr('data-error');
                        } else {
                            _id = $input.attr('id');
                            _label = $("label[for='"+_id+"']");

                            if(_label.length > 0) {
                                if(_requied && _value === '') {
                                    _error = "Le champs " + _label.text() + " est requis";
                                } else {
                                    _error = "Le champs " + _label.text() + " ne correspond pas";
                                }
                            } else {
                                if(_requied && _value === '') {
                                    _error = "Le champs est requis";
                                } else {
                                    _error = "Le champs ne correspond pas";
                                }
                            }
                        }

                        errors.push({
                            name: $input.attr('name'),
                            input: $input,
                            parent: (_parent !== null) ? $input.parents(o.parent) : null,
                            error: _error,
                            value: _value
                        });

                        if(_parent !== null) {
                            $input.parents(o.parent).addClass(o.errorClass);
                        } else {
                            $input.addClass(o.errorClass);
                        }
                    }
                    break;

                case 'password':
                    if(_requied) {
                        if($input.attr('data-min') !== undefined) {
                            _min = parseFloat($input.attr('data-min'));
                        } else if($input.attr('min') !== undefined) {
                            _min = parseFloat($input.attr('min'));
                        } else {
                            _min = 0;
                        }

                        if($input.attr('data-max') !== undefined) {
                            _max = parseFloat($input.attr('data-max'));
                        } else if($input.attr('max') !== undefined) {
                            _max = parseFloat($input.attr('max'));
                        } else {
                            _max = Infinity;
                        }

                        regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.password);

                        if(!regex.test(_value) || _value.length < _min || _value.length > _max) {
                            valid = false;

                            if($input.attr('data-error') !== undefined) {
                                _error = $input.attr('data-error');
                            } else {
                                _id = $input.attr('id');
                                _label = $("label[for='"+_id+"']");

                                if(_label.length > 0) {
                                    if(_requied && _value === '') {
                                        _error = "Le champs " + _label.text() + " est requis";
                                    } else {
                                        _error = "Le champs " + _label.text() + " ne correspond pas";
                                    }
                                } else {
                                    if(_requied && _value === '') {
                                        _error = "Le champs est requis";
                                    } else {
                                        _error = "Le champs ne correspond pas";
                                    }
                                }
                            }

                            errors.push({
                                name: $input.attr('name'),
                                input: $input,
                                parent: (_parent !== null) ? $input.parents(o.parent) : null,
                                error: _error,
                                value: _value
                            });

                            if(_parent !== null) {
                                $input.parents(o.parent).addClass(o.errorClass);
                            } else {
                                $input.addClass(o.errorClass);
                            }
                        }
                    }
                    break;

                case 'checkbox':
                case 'radio':
                    if(_requied) {
                        if (!$("input[name='" + $input.attr('name') + "']").is(':checked')) {
                            valid = false;

                            if($input.attr('data-error') !== undefined) {
                                _error = $input.attr('data-error');
                            } else {
                                _id = $input.attr('id');
                                _label = $("label[for='"+_id+"']");

                                if(_label.length > 0) {
                                    if(_requied) {
                                        _error = "Le champs " + _label.text() + " est requis";
                                    }
                                } else {
                                    if(_requied) {
                                        _error = "Le champs est requis";
                                    }
                                }
                            }

                            errors.push({
                                name: $input.attr('name'),
                                input: $input,
                                parent: (_parent !== null) ? $input.parents(o.parent) : null,
                                error: _error,
                                value: _value
                            });

                            if(_parent !== null) {
                                $input.parents(o.parent).addClass(o.errorClass);
                            } else {
                                $input.addClass(o.errorClass);
                            }
                        }
                    }
                    break;

                case 'range':
                    if(_requied || _value !== '') {
                        var isNumeric = $.isNumeric(_value);
                        _value = parseFloat(_value);

                        if($input.attr('data-min') !== undefined) {
                            _min = parseFloat($input.attr('data-min'));
                        } else if($input.attr('min') !== undefined) {
                            _min = parseFloat($input.attr('min'));
                        } else {
                            throw new Error("Aucun attribut minimum n'est spécifié");
                        }

                        if($input.attr('data-max') !== undefined) {
                            _max = parseFloat($input.attr('data-max'));
                        } else if($input.attr('max') !== undefined) {
                            _max = parseFloat($input.attr('max'));
                        } else {
                            throw new Error("Aucun attribut maximum n'est spécifié");
                        }

                        if($input.attr('data-step') !== undefined) {
                            _step = parseFloat($input.attr('data-step'));
                        } else if($input.attr('max') !== undefined) {
                            _step = parseFloat($input.attr('step'));
                        } else {
                            throw new Error("Aucun attribut step n'est spécifié");
                        }

                        if(_value < _min || _value > _max || _value % _step > 0 || !isNumeric) {
                            valid = false;

                            if($input.attr('data-error') !== undefined) {
                                _error = $input.attr('data-error');
                            } else {
                                _id = $input.attr('id');
                                _label = $("label[for='"+_id+"']");

                                if(_label.length > 0) {
                                    if(_requied && _value === '') {
                                        _error = "Le champs " + _label.text() + " est requis";
                                    } else {
                                        _error = "Le champs " + _label.text() + " ne correspond pas";
                                    }
                                } else {
                                    if(_requied && _value === '') {
                                        _error = "Le champs est requis";
                                    } else {
                                        _error = "Le champs ne correspond pas";
                                    }
                                }
                            }

                            errors.push({
                                name: $input.attr('name'),
                                input: $input,
                                parent: (_parent !== null) ? $input.parents(o.parent) : null,
                                error: _error,
                                value: _value
                            });

                            if(_parent !== null) {
                                $input.parents(o.parent).addClass(o.errorClass);
                            } else {
                                $input.addClass(o.errorClass);
                            }
                        }
                    }
                    break;

                case 'search':
                    if(_requied || _value !== '') {
                        _length = _value.split(' ').length;

                        if($input.attr('data-min') !== undefined) {
                            _min = parseFloat($input.attr('data-min'));
                        } else if($input.attr('min') !== undefined) {
                            _min = parseFloat($input.attr('min'));
                        } else {
                            _min = 0;
                        }

                        if($input.attr('data-max') !== undefined) {
                            _max = parseFloat($input.attr('data-max'));
                        } else if($input.attr('max') !== undefined) {
                            _max = parseFloat($input.attr('max'));
                        } else {
                            _max = Infinity;
                        }

                        if(_length < _min || _length > _max) {
                            valid = false;

                            if($input.attr('data-error') !== undefined) {
                                _error = $input.attr('data-error');
                            } else {
                                _id = $input.attr('id');
                                _label = $("label[for='"+_id+"']");

                                if(_label.length > 0) {
                                    if(_requied) {
                                        _error = "Le champs " + _label.text() + " est requis";
                                    } else {
                                        _error = "Le champs " + _label.text() + " ne correspond pas";
                                    }
                                } else {
                                    if(_requied) {
                                        _error = "Le champs est requis";
                                    } else {
                                        _error = "Le champs ne correspond pas";
                                    }
                                }
                            }

                            errors.push({
                                name: $input.attr('name'),
                                input: $input,
                                parent: (_parent !== null) ? $input.parents(o.parent) : null,
                                error: _error,
                                value: _value
                            });

                            if(_parent !== null) {
                                $input.parents(o.parent).addClass(o.errorClass);
                            } else {
                                $input.addClass(o.errorClass);
                            }
                        }
                    }
                    break;

                case 'tel':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.tel);
                    break;

                case 'time':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.time);
                    break;

                case 'url':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.url);
                    break;

                case 'week':
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp(o.patterns.week);
                    break;

                default:
                    _regex = ($input.attr('data-pattern') !== undefined) ? new RegExp($input.attr('data-pattern')) : new RegExp('^(.+)$', 'm');
                    break;
            }


            if(_requied || _value !== '') {
                if(_regex !== null) {
                    if(!_regex.test(_value)) {
                        valid = false;

                        if($input.attr('data-error') !== undefined) {
                            _error = $input.attr('data-error');
                        } else {
                            _id = $input.attr('id');
                            _label = $("label[for='"+_id+"']");

                            if(_label.length > 0) {
                                if(_requied && _value === '') {
                                    _error = "Le champs " + _label.text() + " est requis";
                                } else {
                                    _error = "Le champs " + _label.text() + " ne correspond pas";
                                }
                            } else {
                                if(_requied && _value === '') {
                                    _error = "Le champs est requis";
                                } else {
                                    _error = "Le champs ne correspond pas";
                                }
                            }
                        }

                        errors.push({
                            name: $input.attr('name'),
                            input: $input,
                            parent: (_parent !== null) ? $input.parents(o.parent) : null,
                            error: _error,
                            value: _value
                        });

                        if(_parent !== null) {
                            $input.parents(o.parent).addClass(o.errorClass);
                        } else {
                            $input.addClass(o.errorClass);
                        }
                    } else {
                        $input.addClass(o.validClass);
                    }
                }
            }
        });


        // On retire les erreurs en double (sur les radio ou checkbox)
        var name = null;
        $.each(errors, function( index, value ) {
            if(value.name === name) {
                errors.splice(index, 1);
            }
            name = value.name;
        });


        // Détéction de reCAPTCHA
        var $reCAPTCHA = $selector.find('.g-recaptcha');

        if($reCAPTCHA.length > 0) {
            if($.trim(grecaptcha.getResponse()) ===  "") {
                valid = false;

                errors.push({
                    name  : "g-recaptcha",
                    input : $reCAPTCHA,
                    parent: null,
                    error : ($reCAPTCHA.attr('data-error') !== undefined) ? $reCAPTCHA.attr('data-error') : "Le captcha n'est pas rempli",
                    value : null
                });
            }
        }


        return {
            isValid: valid,
            errors: errors
        };
    };
})(jQuery);