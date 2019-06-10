$(function () {
    function Timer(options) {
        this.init(options);
    }

    Timer.prototype = {
        seconds: 0,
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
                        $('<span>', {class: 'del-timer-btn', text: '✖'}).get(0).outerHTML,
                });
        },

        _addRound() {
            this.options.valuesContainer.append(
                $('<span>', {
                    class: 'timer-value ' + this.options.id,
                    text: this.options.name + ' ' + this._getValue(),
                    css: {
                        'background-color': this.options.color
                    },
                })
            );
        },

        _destroy() {
            this.options.valuesContainer.find(`.${this.options.id}`).remove();
            this.container.remove();
        },

        _start() {
            setTimeout(() => this._tick(), 1000);
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
        },
        _addTimer(){
            const options = {
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
});