$(function () {
    const versions = {
        PROTOTYPE() {
        },

        ES5() {
        },

        ES6() {
            class CalendarPage {
                constructor() {
                    this.container = $('.container');
                    this.container.append(this._bindStructure());
                    this.calendarsContainer = this.container.find('.calendars-container');
                    this.nameInputElement = this.container.find('.name-cal');
                    this.btnAddCalendar = this.container.find('.add-cal');

                    this._bindEvent();
                }

                _bindStructure() {
                    return $('<form>', {
                            class: 'add-container',
                            html:
                                $('<input>', {type: 'text', class: 'name-cal'}).get(0).outerHTML +
                                $('<input>', {
                                    type: 'button',
                                    class: 'add-cal',
                                    value: '+',
                                    disabled: true
                                }).get(0).outerHTML
                        }).get(0).outerHTML +
                        $('<div>', {class: 'calendars-container'}).get(0).outerHTML
                }

                _bindEvent() {
                    this.btnAddCalendar.on('click', () => {
                        this._addCalendar();
                    });

                    this.nameInputElement.on('keyup', (e) => {
                        this.btnAddCalendar.prop('disabled', !this.nameInputElement.val().trim());
                        if (e.code === 13) {
                            this._addCalendar();
                        }
                    })
                }

                _addCalendar() {
                    const calendar = new Calendar({
                        name: this.nameInputElement.val().trim()
                    });
                    this.calendarsContainer.append(calendar.structure);
                    this.nameInputElement.val('');
                    this.btnAddCalendar.prop('disabled', true);
                }
            }

            class Calendar {
                monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                selectedDates = [];
                typeSelectDate = 'single';

                constructor(calendar) {
                    this.currentDate = this._getCurrentDate();
                    this.structure = this._bindStructure(calendar);
                    this.resultInputElement = this.structure.find('.result');

                    this._bindEvents();
                }

                _bindStructure(calendar) {
                    const generateWeek = weekDays => weekDays.map(text => $('<li>', {text}).get(0).outerHTML).join('');
                    const generateDays = days => days.map(({text, current, month, year}) => $('<li>', {
                        class: current ? 'actual-month' : 'other-month',
                        text,
                        current,
                        month,
                        year,
                    }).get(0).outerHTML).join('');

                    return $('<div>', {
                        class: 'calendar',
                        html:
                            $('<h3>', {text: calendar.name}).get(0).outerHTML +
                            $('<div>', {
                                class: 'calendar-control',
                                html:
                                    $('<button>', {class: 'left fa fa-caret-left'}).get(0).outerHTML +
                                    $('<span>', {text: this.currentDate.month + " " + this.currentDate.year}).get(0).outerHTML +
                                    $('<button>', {class: 'right fa fa-caret-right'}).get(0).outerHTML
                            }).get(0).outerHTML +
                            $('<ul>', {
                                class: 'days',
                                html: generateWeek(this.weekDays)
                            }).get(0).outerHTML +
                            $('<ul>', {
                                class: 'date',
                                html: generateDays(this._render(this.currentDate.year, this.monthNames.indexOf(this.currentDate.month)))
                            }).get(0).outerHTML +
                            $('<div>', {
                                class: 'btn-group',
                                role: 'group',
                                'aria-label': 'Basic example',
                                html:
                                    $('<button>', {
                                        type: 'button',
                                        class: 'btn btn-secondary single',
                                        text: 'Single'
                                    }).get(0).outerHTML +
                                    $('<button>', {
                                        type: 'button',
                                        class: 'btn btn-secondary multiple',
                                        text: 'Multiple'
                                    }).get(0).outerHTML +
                                    $('<button>', {
                                        type: 'button',
                                        class: 'btn btn-secondary range',
                                        text: 'Range'
                                    }).get(0).outerHTML
                            }).get(0).outerHTML +
                            $('<input>', {class: 'result', type: 'text'}).get(0).outerHTML +
                            $('<input>', {class: 'format', type: 'text'}).get(0).outerHTML
                    });
                }

                _getCurrentDate() {
                    const date = new Date();

                    return {
                        month: this.monthNames[date.getMonth()],
                        year: date.getFullYear(),
                    }
                }

                _render(year, month) {
                    let resultMonth = [];
                    let d = new Date(year, month);
                    let date;

                    resultMonth = this.getDaysMonth(month);
                    d.setMonth(d.getMonth() + 1, 0);
                    if (this.getDayWeek(d) !== 6) {
                        date = 1;
                        for (let i = this.getDayWeek(d); i < 6; i++) {
                            resultMonth.push({
                                text: date,
                                current: false,
                                month: d.getMonth() + 1,
                                year: d.getFullYear(),
                            });
                            date++;
                        }
                    }
                    d.setDate(0);
                    if (this.getDayWeek(d) !== 6) {
                        date = d.getDate();
                        for (let i = this.getDayWeek(d); i >= 0; i--) {
                            resultMonth.unshift({
                                text: date,
                                current: false,
                                month: d.getMonth(),
                                year: d.getFullYear(),
                            });
                            date--;
                        }
                    }

                    return resultMonth;
                }

                getDayWeek(date) {
                    let day = date.getDay();

                    if (day === 0) {
                        day = 7;
                    }

                    return day - 1;
                }

                getDaysMonth(m) {
                    let result = [];
                    let date = new Date(new Date().getFullYear(), m);

                    while (date.getMonth() === m) {
                        result[result.length] = {
                            text: date.getDate(),
                            current: true,
                            month: date.getMonth(),
                            year: date.getFullYear(),
                        };
                        date.setDate(date.getDate() + 1);
                    }

                    return result;
                }

                _bindEvents() {
                    this.structure
                        .on('click', '.date li', (e) => {
                            let day = $(e.target).closest('li');
                            if (!day) return;
                            this.getSelectedDates(day, this.typeSelectDate);
                            this.highlight(day);
                        })
                        .on('click', '.single', (e) => {
                            this.typeSelectDate = 'single';
                            console.log(e);
                        })
                        .on('click', '.multiple', (e) => {
                            this.typeSelectDate = 'multiple';
                            console.log(e);
                        })
                        .on('click', '.range', (e) => {
                            this.typeSelectDate = 'range';
                            console.log(e);
                        })
                }

                getSelectedDates(day, type) {
                    switch (type) {
                        case 'single': {
                            this.selectedDates = day;
                            console.log(this.selectedDates);
                            return this.selectedDates;
                        }
                        case 'multiple': {
                            this.selectedDates.push(day);
                            console.log(this.selectedDates);
                            return this.selectedDates;

                        }
                        case 'range': {
                            this.selectedDates.push(day);
                            console.log(this.selectedDates);
                            return this.selectedDates;
                        }
                    }
                }

                highlight(day) {
                    //single
                    if ($(day).hasClass("selected-date"))
                        day.removeClass('selected-date');
                    else {
                        day.addClass('selected-date');
                        this.resultInputElement.val(new Date(day.attr('year'), day.attr('month'), day.text()));
                    }

                    // multiple
                    // if ($(day).hasClass("selected-date"))
                    //     day.removeClass('selected-date');
                    // else {
                    //     day.addClass('selected-date');
                    //     this.resultInputElement.val(new Date(day.attr('year'), day.attr('month'), day.text()));
                    // }

                    //range
                }

                _delCalendar() {

                }
            }

            new CalendarPage();
        },

        RAW() {
            function Calendar() {
                this.date = new Date();
                this.month = this.date.getMonth();
                this.year = this.date.getFullYear();
                this.init()

            }

            Calendar.prototype = {
                init() {
                    this.container = $('#calendar');
                    this.table = this.container.find('tbody');
                    this.addCalendarToView();
                    console.log(this.month)
                },

                addCalendarToView() {
                    for (var i = 0; i < this.date.getDay(); i++) {
                        const placebo = $('<td>');
                        placebo.appendTo(this.table)
                    }

                    while (this.date.getMonth() === this.month) {
                        const dateCell = $('<td>', {text: this.date.getDate()});
                        dateCell.appendTo(this.table);

                        if (this.date.getDay() % 7 == 6) { // вс, последний день - перевод строки
                            this.table.append('<tr>');
                        }

                        this.date.setDate(this.date.getDate() + 1);
                    }

                    // добить таблицу пустыми ячейками, если нужно
                    if (getDay(this.date) != 0) {
                        for (var i = getDay(d); i < 7; i++) {
                            table += '<td></td>';
                        }
                    }
                }
            };

            new Calendar()
        },
    };

    versions.ES6();
});
