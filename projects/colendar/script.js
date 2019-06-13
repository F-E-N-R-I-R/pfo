$(function () {


    function TimerPage() {
        this.init();
    }

    TimerPage.prototype = {
        MAX_TIMERS: 4,
        timers: {size: 0},
        init() {
            this.container = $('.container');
            this.nameInputElement = this.container.find('input');
            this.btnAddCalendar = this.container.find('button');
            this.calendarContainer = this.container.find('.calendar-container');
            this.calendarValuesContainer = this.container.find('.calendar-values-container');

            this._bindEvents()
        },
        _bindEvents() {
            this.btnAddtimer.on('click', () => {
                this._addTimer();
            });
            this.container.on('timer:click:del', () => {
                this._deleteTimerFromStorage()
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
            this.nameInputElement.prop('disabled', this.timers.size >= this.MAX_TIMERS);
        },

        getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';

            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }

            return color;
        },

        _deleteTimerFromStorage () {
            this.timers.size -=1;q
            this.nameInputElement.prop('disabled', this.timers.size >= this.MAX_TIMERS);
        }



    };

    new TimerPage()
});