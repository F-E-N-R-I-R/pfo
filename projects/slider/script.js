$(function () {
    const versions = {
        PROTOTYPE() {
            const Slider = function() {
                this.init();
            };

            Slider.prototype = {
                settings: {
                    timeout: 1000,
                    slideWidth: 500,
                },
                slide: 0,
                direction: 1,
                timer: null,
                animateEnd: true,
                init() {
                    this.container = $('.container');
                    this.lent = this.container.find('.slider');
                    this.pagination = this.container.find('.pagination');
                    this.slides = this.lent.find('li');
                    this.MAX_SLIDES = this.slides.length;
                    this.next();
                    this._generatePagination();
                    this._bindEvents();
                },

                next() {
                    this.timer = setTimeout(() => {
                        this.slide = this._getNext();

                        this.goTo(this.slide);
                    }, this.settings.timeout);
                },

                goTo(index) {
                    this.lent.animate(
                        { 'marginLeft': - this.settings.slideWidth * index },
                        this.settings.timeout,
                        () => {
                            this.animateEnd = true;
                            this._setActive();
                            this.next()
                        }
                    );
                },

                _setActive() {
                    const pagers = this.pagination.find('li');

                    pagers.removeClass('active');
                    pagers.eq(this.slide).addClass('active');
                },

                _generatePagination() {
                    for (let i = 0; i < this.MAX_SLIDES; i++) {
                        this.pagination.append(
                            $('<li>', {
                                text: i + 1,
                                'data-index': i ,
                                class: i === 0 ? 'active' : '',
                            })
                        );
                    }
                },

                _getNext() {
                    const nextIndex = this.slide + this.direction;

                    if (nextIndex >= this.MAX_SLIDES) {
                        return 0;
                    } else if (nextIndex < 0) {
                        return this.MAX_SLIDES -1;
                    }

                    return nextIndex;
                },

                _bindEvents() {
                    this.container.on('click', '.pagination li', (e) => {
                        const index = $(e.target).data('index');
                        this._stop();
                        this.direction = this.slide > index ? -1 : 1;
                        this.slide = index;
                        this.goTo(index);
                    });

                    this.container.on('click', '.left', () => {
                        if (this.animateEnd) {
                            this.animateEnd = false;
                            this._stop();
                            this.direction = -1;
                            this.slide = this._getNext();
                            this.goTo(this.slide);
                        }
                    });

                    this.container.on('click', '.right', () => {
                        if (this.animateEnd) {
                            this.animateEnd = false;
                            this._stop();
                            this.direction = 1;
                            this.slide = this._getNext();
                            this.goTo(this.slide);
                        }
                    });
                },

                _stop() {
                    clearTimeout(this.timer);
                    this.lent.stop();
                }
            };

            new Slider();
        },

        ES5() {},

        ES6() {},

        RAW() {
            const slider =$('.slider');
            const dots = $('.dots').children();
            const slides = $('.slides');
            let i = 0;
            let sliderParam = 1;
            dots.filter(dots[0]).css('background-color', '#ffffff');

            let sliderTick = () => {
                if (sliderParam === 1 ) {
                    sliderGoForward()
                }
                if (sliderParam === -1) {
                    sliderGoBack()
                }
                if (sliderParam === 0) {
                    return
                }
                slides.removeClass('activeSlide').filter(slides[i]).toggleClass('activeSlide');
                dots.css('background-color', '#000000');
                dots.filter(dots[i]).css('background-color', '#ffffff');
            };

            let sliderReGo = (funk) => {
                setInterval(funk, 3000)
            };



            let onClickDots = () =>  {
                let indexElem = dots.index(event.target);
                i = indexElem;
                slides.removeClass('activeSlide').filter(slides[indexElem]).toggleClass('activeSlide');
                dots.css('background-color', '#000000');
                dots.filter(dots[indexElem]).css('background-color', '#ffffff');

            };

            let sliderGoBack = () => {
                if ( i > 0 ) {
                    --i
                }
                else {
                    i = slides.length - 1;
                }


            };

            let sliderGoForward = () => {
                if ( Math.abs(i) < slides.length - 1) {
                    i++
                }
                else {
                    i = 0;
                }
            };

            let onClickSlider = () => {
                if (event.target.id === 'sliderGoBack'){
                    sliderParam = -1;
                }
                if (event.target.id === 'sliderGoForward'){
                    sliderParam = 1;
                }
                if (event.target.id === 'sliderStop'){
                    sliderParam = 0;
                }


            };
            sliderReGo(sliderTick);

            dots.click( () =>{ onClickDots ()});
            slider.click( () =>{ onClickSlider ()});
        },
    };

    versions.PROTOTYPE();
});