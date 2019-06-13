$(function () {

    let storage = {
        timers: [],
    };

    const BlocksProj = function() {
        this.init();
    };

    const AddTimer = function(timerNames) {
        this.name = timerNames;
        this.init()
    };

    const AddBlock = function(blockName, clickTime, color, container) {
        this.addBlock(blockName, clickTime, color, container)
    };

    AddTimer.prototype = {
        seconds: 0,

        init() {
            this.addNewTimerToView(this.name);
            this.reGo()
        },

        tick() {
            this.seconds++;
            this.timerBlock.find('.timer').text(this.formatTime());
            this.reGo()
        },

        formatTime() {
            this.seconds = ((this.seconds < 10) ? '0' : '') + this.seconds;
            return `${ parseInt(this.seconds/3600) }:${ parseInt(this.seconds/60)%60 }:${ this.seconds%60 }`;
        },

        reGo() {
            setTimeout(this.tick.bind(this), 100);
        },

        addNewTimerToView(name) {
            const delTimerBtn = $('<button>', {
                class: 'delTimerBtn',
                id: 'delTimerBtn',
                type: 'button',
                name: name,
                text: '✖'
            });
            const timer = $('<div>', {class: 'timer', text: '00:00:00'});
            const timerBlock = $('<div>', {class: 'timerBlock', id: name});
            const timerContainer = $('.timerWrapper');
            const randomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);

            timer.appendTo(timerBlock);
            delTimerBtn.appendTo(timerBlock);
            timerBlock.appendTo(timerContainer);
            delTimerBtn[0].style.backgroundColor = randomColor;
            timer[0].style.backgroundColor = randomColor;
            this.timerBlock = timerBlock
        },
    };


    AddBlock.prototype = {
        addBlock: (name, clickTime, color, container) => {
            const timerBlock = $('<div>', { class: 'timeBlock' });
            const blockName = $('<span>', {id: 'name', class: 'blockInfo', text: name});
            const clock = $('<span>', {id: 'clock', class: 'blockInfo', text: clickTime});

            timerBlock[0].style.backgroundColor = color;
            blockName.appendTo(timerBlock);
            clock.appendTo(timerBlock);
            timerBlock.appendTo(container);
        },
    };



    BlocksProj.prototype = {
        init() {
            this.container = $('#container');
            this.addTimerBtn = this.container.find('#addTimerBtn');
            this.blockNameInput = this.container.find('#blockName');
            this.timerContainer = this.container.find('.timerWrapper');
            this.blockContainer = this.container.find('.blockWrapper');

            this._bindEvents();
        },
        _bindEvents() {
            this.addTimerBtn.on('click', () => this.onClickAddTimerBtn());
            this.container.on('click', '#delTimerBtn', () => this.onClickDelTimerBtn());
            this.container.on('click', '.timer', () => this.onClickTimer());
            $('input[type="text"]').keyup(function () {
                if ($(this).val() != '') {
                    $('#addTimerBtn').prop('disabled', false);
                }
            });
        },
        onClickTimer() {
            const elem = event.target;
            const clickTime = elem.innerText;
            const name = elem.parentElement.id;
            const color = elem.style.backgroundColor;
            const container = this.blockContainer;
            console.log(name);
            const addBlock = new AddBlock(name, clickTime, color, container)
        },
        onClickDelTimerBtn() {
            const name = event.target.name;
            const timerBlok = this.timerContainer[0].childNodes;
            const storageObj = storage.timers;


            this.blockNameInput.prop('disabled', false);


            for (let i = 0; i < timerBlok.length; i++) {
                if (timerBlok[i].id === name) {
                    timerBlok[i].remove()
                }
            }
            for (let i = 0; i < storageObj.length; i++) {
                if (storage.timers[i].name === name) {
                    console.log();
                    storage.timers.splice(i, 1)
                }
            }
        },
        onClickAddTimerBtn() {
            const timer = new AddTimer(this.blockNameInput.val());
            this.blockNameInput.val("");
            this.disabledBtn();
            storage.timers.push(timer);
            if (storage.timers.length >= 4) {
                this.blockNameInput.prop('disabled', true)
            }

        },
        disabledBtn() {
            $('#addTimerBtn').prop('disabled', true);
        }
    };

    new BlocksProj();
});







