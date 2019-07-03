$(function () {
    const versions = {
        PROTOTYPE() {
            const Form = function (options) {
                this.init(options);
            };

            const Card = function(options) {
                this.init(options);
            };

            const Mediator = function () {
                this.init();
            };

            const Validator = function (options) {
                this.init(options);
            };

            const Rules = function () {
            };

            const Composer = function (options) {
                this.init(options);
            };

            Form.prototype = {
                init(options) {
                    this.validator = options.validator;
                    this.container = $('.container');
                    this.elementForm = this.container.find('.form');
                    this.nameInputElement = this.elementForm.find('#name');
                    this.phoneInputElement = this.elementForm.find('#phone');
                    this.mailInputElement = this.elementForm.find('#mail');
                    this.passInputElement = this.elementForm.find('#pass');
                    this.confirmPassInputElement = this.elementForm.find('#confirmPass');
                    this.ageInputElement = this.elementForm.find('#age');

                    this._bindEvents();
                },

                _bindEvents() {
                    this.elementForm.on('submit',(e) => {
                        e.preventDefault();
                        if(!this.validator.valid(this._getValue())) {
                            this.container.trigger('mediator:create', this._getValue());
                        };
                    });
                },

                _getValue() {
                    return {
                        name: this.nameInputElement.val(),
                        phone: this.phoneInputElement.val(),
                        mail: this.mailInputElement.val(),
                        password: this.passInputElement.val(),
                        confirmPassword: this.confirmPassInputElement.val(),
                        age: this.ageInputElement.val(),
                        id: Date.now(),
                    };
                },
            };

            Card.prototype = {
                init(options) {
                    this.options = options;
                    this.cardsContainer = $('.cardsStacked');

                    this.addCard();
                },

                addCard() {
                    const value = $('<div>', {
                        class: 'card ' + this.options.id,
                        html:
                            $('<div>', {
                                class: 'card-body',
                                html:
                                    $('<h5>', { class: 'card-title', text: 'Name: ' + this.options.name}).get(0).outerHTML+
                                    $('<p>', { class: 'card-text', text: 'Phone: ' + this.options.phone}).get(0).outerHTML+
                                    $('<p>', { class: 'card-text', text: 'Email: ' + this.options.mail}).get(0).outerHTML+
                                    $('<p>', { class: 'card-text', text: 'Age: ' + this.options.age}).get(0).outerHTML
                            }),
                    });

                    this.cardsContainer.append(value);
                },
            };

            Mediator.prototype = {
                cards: [],
                init() {
                    this.container = $('.container');

                    this._bindEvents();
                },

                _bindEvents() {
                    this.container.on('mediator:create', (e, options) => {
                        this.cards[options.id] = options;
                        new Card(options);
                    });
                },
            };

            Rules.prototype = {
                required(str) {
                    return str.length ? null : 'Req';
                },
            };

            Composer.prototype = {
                init(options) {
                    this.rules = options.rules;
                },
                name(str) {
                    return this.rules.required(str);
                },
            };

            Validator.prototype = {
                init(options) {
                    this.composer = options.composer;
                },

                valid(elementsForm) {
                    return this.composer.name(elementsForm.name);
                },

            },

            new Form({ validator: new Validator({ composer: new Composer({ rules: new Rules() }) }) });
            new Mediator();
        },

        ES5() {},

        ES6() {},

        // RAW() {
        //     let storage = {
        //         cards: []
        //     };
        //
        //     const CardsProj = function() { this.init(); };
        //
        //     CardsProj.prototype = {
        //         init() {
        //             this.container = $('.container');
        //             this.registrationForm = this.container.find('.registrationForm');
        //             this.nameInput = this.registrationForm.find('#name');
        //             this.phoneInput = this.registrationForm.find('#phone');
        //             this.mailInput = this.registrationForm.find('#mail');
        //             this.signInBtn = this.registrationForm.find('#signInBtn');
        //             this.cardContainer = this.container.find('.cardContainer');
        //             this.forms = this.container.find('.form-group');
        //             this.addFileBtn = this.container.find('#addFileBtn');
        //             this.getPhotoInput = this.container.find('#avatar');
        //             this.blah = this.container.find('#blah');
        //
        //             this._bindEvents()
        //         },
        //
        //         _bindEvents(){
        //             this.addFileBtn.on('click',() => this.getPhotoInput.click());
        //             this.getPhotoInput.on('change', () => this.onChangeGetPhotoInput(this.getPhotoInput));
        //             this.signInBtn.on('click',() => this.onClickSignInBtn());
        //
        //         },
        //
        //         onChangeGetPhotoInput(){
        //             this.src = URL.createObjectURL(event.target.files[0]);
        //         },
        //
        //         onClickSignInBtn(){
        //             const src = this.src;
        //             const name = this.nameInput;
        //             const phone = this.phoneInput;
        //             const mail = this.mailInput;
        //             const registrationForm = this.blockContainer;
        //             const forms = this.forms;
        //             const cards = new Cards(name, phone, mail, registrationForm, forms, src)
        //
        //
        //         },
        //
        //
        //     };
        //
        //     new CardsProj();
        //     const Cards = function (name, phone, mail, registrationForm, forms, src) {
        //         this.src = src;
        //         this.name = name;
        //         this.phone = phone;
        //         this.forms = forms;
        //         this.mail = mail;
        //         this.registrationForm = registrationForm;
        //         this.validation()
        //     };
        //
        //     Cards.prototype ={
        //         addCards(){
        //             let name = this.name.val();
        //             let phone = this.phone.val();
        //             let mail = this.mail.val();
        //             let src = this.src;
        //             const nameIs = $('<h4>',{ text: name});
        //             // const photo =$('<img>',{src:src});
        //             const number = $('<P>',{class:'cardInfo', text:'Number: ' + phone});
        //             const mailIs = $('<P>',{class:'cardInfo', text:'E-mail: ' + mail});
        //             const col = $('<div>',{class:'col-sm-6 col-md-4'});
        //             const photo = $('<div>',{class:'cardContainer'});
        //             photo.css('backgroundImage', 'url('+src+')');
        //             const card = $('<div>',{class:'thumbnail'});
        //             const cardInfo = $('<div>',{class:'caption'});
        //             const cardContainer = $('.row')[0];
        //
        //             mailIs.appendTo(cardInfo);
        //             number.appendTo(cardInfo);
        //             photo.appendTo(card);
        //             nameIs.appendTo(card);
        //             cardInfo.appendTo(card);
        //             card.appendTo(col);
        //             col.appendTo(cardContainer);
        //
        //             this.forms.each(() => {
        //                 // this.getPhotoInput.val("");
        //                 // console.log(this.getPhotoInput.val());
        //                 const input = this.forms.find('input');
        //                 console.log(input.val);
        //                 input.removeClass('error');
        //                 input.val('')
        //             });
        //
        //         },
        //
        //         validation(){
        //             if ( !this.validator() ) {
        //                 this.addCards()
        //             }
        //         },
        //
        //         validator (){
        //             let errorMassage = $('.text-error');
        //             errorMassage.remove();
        //             const nameInput    = this.name;
        //             let name = !nameInput.val();
        //             const nameForm = this.name.parent()[0];
        //             if ( name ) {
        //                 name = true;
        //                 const errSpanName = $('<span>',{class:'text-error for-name', text:'Поле name обязательно к заполнению'});
        //                 errSpanName.appendTo(nameForm)
        //                 nameInput.toggleClass('error', name );
        //             } else { nameInput.toggleClass('success', name ); }
        //
        //             const regMail     = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/;
        //             const mailInput    = this.mail;
        //             let email = !mailInput.val();
        //             const emailForm = this.mail.parent()[0];
        //
        //             if ( email ) {
        //                 const errSpanMail = $('<span>',{class:'text-error for-email', text: 'Поле e-mail обязательно к заполнению'});
        //                 errSpanMail.appendTo(emailForm);
        //                 mailInput.toggleClass('error', email );
        //             } else if ( !regMail.test( mailInput.val() ) ) {
        //                 email = true;
        //                 const errSpanMail = $('<span>',{class:'text-error for-email', text: 'Вы указали недопустимый e-mail'});
        //                 errSpanMail.appendTo(emailForm);
        //                 mailInput.toggleClass('error', email );
        //             }
        //
        //             const regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        //             const phoneInput    = this.phone;
        //             let phone = !phoneInput.val();
        //             const phoneForm = this.phone.parent()[0];
        //
        //             if ( phone ) {
        //                 const errSpanPhone = $('<span>',{class:'text-error for-phone', text: 'Поле phone обязательно к заполнению'});
        //                 errSpanPhone.appendTo(phoneForm);
        //                 phoneInput.toggleClass('error', phone );
        //             } else if ( !regPhone.test( phoneInput.val() ) ) {
        //                 phone = true;
        //                 const errSpanPhone = $('<span>',{class:'text-error for-phone', text: 'Вы указали недопустимый телефон'});
        //                 errSpanPhone.appendTo(phoneForm);
        //                 phoneInput.toggleClass('error', phone );
        //             }
        //
        //             return ( email || name || phone)
        //         }
        //     };
        // },
    };

    versions.PROTOTYPE();
});

