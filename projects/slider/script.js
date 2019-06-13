$(function () {
    const versions = {
        PROTOTYPE() {},

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

    versions.RAW();
});