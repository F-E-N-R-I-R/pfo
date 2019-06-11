$(function () {
    const versions = {
        PROTOTYPE() {
            function Timer(options) {
                this.init(options);
            }

            Timer.prototype = {
                seconds: 0,
                timer: null,
                init(options) {
                    this.options = options;
                    this.container = this._bindStructure();
                    this._start();
                    this._bindEvents();
                },

                getContainer() {
                    return this.container;
                },

                _bindEvents() {
                    var self = this;

                    this.container.find('.del-timer-btn').on('click', function () {
                        self._destroy();
                        self.options.container.trigger('timer:destroy', self.options);
                    });

                    this.container.find('.pause-btn').on('click', function () {
                        self._pause();
                    });

                    this.container.find('.timer').on('click', function () {
                        self._addRound();
                    });
                },

                _bindStructure() {
                    return $(
                        '<div>',
                        {
                            class: 'timer-block',
                            css: {
                                'background-color': this.options.color
                            },
                            html:
                                $('<span>', {class: 'timer', text: '00:00:00'}).get(0).outerHTML +
                                $('<button>', {class: 'btn btn-primary timer-btn pause-btn', text: '||'}).get(0).outerHTML +
                                $('<button>', {class: 'btn btn-danger timer-btn del-timer-btn', text: '✖'}).get(0).outerHTML,
                        });
                },

                _addRound() {
                    const value = $('<span>', {
                        class: 'timer-value ' + this.options.id,
                        text: this.options.name + ' ' + this._getValue(),
                        css: {
                            'background-color': this.options.color
                        },
                    });
                    const sameEl = this.options.valuesContainer.find('.' + this.options.id).last();

                    sameEl.length ? value.insertAfter(sameEl) : this.options.valuesContainer.append(value);
                },

                _destroy() {
                    this.options.valuesContainer.find(`.${this.options.id}`).remove();
                    this.container.remove();
                },

                _start() {
                    this.timer = setTimeout(() => this._tick(), 1000);
                },

                _pause(){
                   if (this.timer) {
                       clearTimeout(this.timer);
                       this.timer = null;
                       this.container.find('.pause-btn').text('>');
                   } else {
                       this._start();
                       this.container.find('.pause-btn').text('||');
                   }
                },

                _tick() {
                    this.seconds++;
                    this.container.find('.timer').text(this._getValue());
                    this._start();
                },
                _getValue() {
                    var seconds = '' + parseInt(this.seconds % 60);
                    var minutes = '' + parseInt(this.seconds / 60);
                    var hours = '' + parseInt(parseInt(this.seconds / 60) / 60);

                    return [
                        hours.length < 2 ? '0' + hours : hours,
                        minutes.length < 2 ? '0' + minutes : minutes,
                        seconds.length < 2 ? '0' + seconds : seconds,
                    ].join(":")
                },
            };

            function TimerPage() {
                this.init();
            }

            TimerPage.prototype = {
                MAX_TIMERS: 4,
                timers: {size: 0},
                init() {
                    this.container = $('.container');
                    this.container.append(this._bindStructure());
                    this.nameInputElement = this.container.find('input');
                    this.btnAddtimer = this.container.find('button');
                    this.timerContainer = this.container.find('.timers-container');
                    this.timerValuesContainer = this.container.find('.timers-values-container');

                    this._bindEvents()
                },
                _bindEvents() {
                    this.btnAddtimer.on('click', () => {
                        this._addTimer();
                    });

                    this.nameInputElement.on('keyup', (e) => {
                        this.btnAddtimer.prop('disabled', !this.nameInputElement.val());
                        if (e.keyCode === 13){
                            this._addTimer();
                        }
                    });

                    this.container.on('timer:destroy', (e, options) => {
                        delete this.timers[options.id];
                        this.timers.size -= 1;
                        this._updateInputState();
                    })
                },
                _bindStructure() {
                    return $(
                        '<div>',
                        {
                            class: 'timer-page',
                            html:
                                $('<input>', { type: 'text' }).get(0).outerHTML +
                                $('<button>', { class: 'btn', text: '+', disabled: true }).get(0).outerHTML +
                                $('<div>', { class: 'timers-container' }).get(0).outerHTML +
                                $('<div>', { class: 'timers-values-container' }).get(0).outerHTML,
                        });
                },
                _addTimer(){
                    const options = {
                        container: this.container,
                        name: this.nameInputElement.val(),
                        valuesContainer: this.timerValuesContainer,
                        color: this.getRandomColor(),
                        id: Date.now(),
                    };

                    this.timers[options.id] = new Timer(options);
                    this.timers.size = this.timers.size + 1;
                    this.timerContainer.append(this.timers[options.id].getContainer());
                    this.nameInputElement.val('');
                    this.btnAddtimer.prop('disabled', true);
                    this._updateInputState();
                },

                _updateInputState() {
                    this.nameInputElement.prop('disabled', this.timers.size >= this.MAX_TIMERS);
                },

                getRandomColor() {
                    const letters = '0123456789ABCDEF';
                    let color = '#';

                    for (let i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }

                    return color;
                }


            };

            new TimerPage()
        },

        ES5() {

        },

        ES6() {

        },

        UNDERSCORE() {

        },

        JQUERY() {

        },
    };

    versions.PROTOTYPE();
});