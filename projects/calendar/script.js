$(function () {
    const versions = {
        PROTOTYPE() {},

        ES5() {},

        ES6() {},

        RAW() {
            function Calendar() {
                this.date = new Date();
                this.month = this.date.getMonth();
                this.year = this.date.getFullYear();
                this.init()

            }

            Calendar.prototype = {
                init(){
                    this.container =$('#calendar');
                    this.table = this.container.find('tbody');
                    this.addCalendarToView();
                    console.log(this.month)
                },

                addCalendarToView (){
                    for (var i = 0; i < this.date.getDay(); i++) {
                        const placebo = $('<td>');
                        placebo.appendTo(this.table)
                    }

                    while (this.date.getMonth() === this.month) {
                        const dateCell =$( '<td>', { text: this.date.getDate() } );
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

    versions.RAW();
});
