const calculator = {
    //TODO В Production version поменять на false, чтобы скрыть вывод рассчетов в консоль!!!
    isDebugMode: true,
    baseRate: 185,
    getWorkRegionCoefficient: () => parseFloat($('select.js-work-region').val()),
    getHoursPerShiftCoefficient: () => parseFloat($('select.js-hours-per-shift').val()),
    getDaysPerWeekCoefficient: () => parseFloat($('select.js-days-per-week').val()),
    getGenderCoefficient: () => parseFloat($('.js-gender:checked').val()),
    getAgeCoefficient: () => parseFloat($('.js-age:checked').val()),
    getHealthCardCoefficient: () => parseFloat($('.js-health-card:checked').val()),
    getHousingCoefficient: () => parseFloat($('.js-housing:checked').val()),
    getPaymentTypeCoefficient: () => parseFloat($('.js-payment-type:checked').val()),
    getSpecializationCoefficient: () => parseFloat($('.js-specialization.active').data('x')),
    getPersonsInShiftCoefficient() {
        let coefficient = 0;
        const personsInShift = parseInt($('.js-persons-in-shift-value').text());

        if (1 <= personsInShift && personsInShift < 5) {
            coefficient = 1;
        } else if (5 <= personsInShift && personsInShift < 10) {
            coefficient = 0.99;
        } else if (10 <= personsInShift && personsInShift < 20) {
            coefficient = 0.98;
        } else if (20 <= personsInShift && personsInShift < 30) {
            coefficient = 0.97;
        } else if (30 <= personsInShift && personsInShift <= 50) {
            coefficient = 0.96;
        }

        return coefficient;
    },
    getPaymentPostponementCoefficient() {
        let coefficient = 0;
        const paymentPostponement = parseInt($('.js-payment-postponement-value').text());

        if (1 <= paymentPostponement && paymentPostponement < 5) {
            coefficient = 1;
        } else if (5 <= paymentPostponement && paymentPostponement < 10) {
            coefficient = 0.98;
        } else if (10 <= paymentPostponement && paymentPostponement < 15) {
            coefficient = 0.99;
        } else if (15 <= paymentPostponement && paymentPostponement < 20) {
            coefficient = 1;
        } else if (20 <= paymentPostponement && paymentPostponement < 30) {
            coefficient = 1.02;
        } else if (30 <= paymentPostponement && paymentPostponement < 40) {
            coefficient = 1.04;
        } else if (40 <= paymentPostponement && paymentPostponement < 50) {
            coefficient = 1.06;
        } else if (50 <= paymentPostponement && paymentPostponement < 60) {
            coefficient = 1.08;
        } else if (60 <= paymentPostponement && paymentPostponement <= 90) {
            coefficient = 1.10;
        }

        return coefficient;
    },
    getTotalCoefficient: () => calculator.getWorkRegionCoefficient()
        * calculator.getHoursPerShiftCoefficient()
        * calculator.getDaysPerWeekCoefficient()
        * calculator.getPersonsInShiftCoefficient()
        * calculator.getGenderCoefficient()
        * calculator.getAgeCoefficient()
        * calculator.getHealthCardCoefficient()
        * calculator.getHousingCoefficient()
        * calculator.getPaymentTypeCoefficient()
        * calculator.getPaymentPostponementCoefficient()
        * calculator.getSpecializationCoefficient(),
    getCalculatedRate: () => calculator.baseRate * calculator.getTotalCoefficient(),
    setRate(rate) {
        $('.js-calculated-rate').text(rate.toFixed(2));
    },
    debug() {
        console.log('workRegion', calculator.getWorkRegionCoefficient());
        console.log('hoursPerShift', calculator.getHoursPerShiftCoefficient());
        console.log('daysPerWeek', calculator.getDaysPerWeekCoefficient());
        console.log('personsInShiftCoefficient', calculator.getPersonsInShiftCoefficient());
        console.log('gender', calculator.getGenderCoefficient());
        console.log('age', calculator.getAgeCoefficient());
        console.log('healthCard', calculator.getHealthCardCoefficient());
        console.log('housing', calculator.getHousingCoefficient());
        console.log('paymentType', calculator.getPaymentTypeCoefficient());
        console.log('paymentPostponement', calculator.getPaymentPostponementCoefficient());
        console.log('specialization', calculator.getSpecializationCoefficient());

        console.log('totalCoefficient', calculator.getTotalCoefficient());
        console.log('baseRate', calculator.baseRate);
        console.log('calculatedRate', calculator.getCalculatedRate());
    },
    recalculate() {
        if (calculator.isDebugMode) {
            calculator.debug();
        }

        calculator.setRate(calculator.getCalculatedRate());
    },
    init() {
        $('.js-hours-per-shift').change(calculator.recalculate);
        $('.js-days-per-week').change(calculator.recalculate);
        $('.js-work-region').change(calculator.recalculate);
        $('.js-gender').change(calculator.recalculate);
        $('.js-age').change(calculator.recalculate);
        $('.js-housing').change(calculator.recalculate);
        $('.js-health-card').change(calculator.recalculate);
        $('.js-payment-type').change(calculator.recalculate);
    }
};

$(document).ready(function(){

    $('.show-all').click(function (e) {
        e.preventDefault();
        $('.other-dir').toggleClass('d-none');
        $('.show-wrap').toggleClass('d-none');
    });

    $('.mob-menu-icon').click(function (e) {
        e.preventDefault();
        $('.menu').toggleClass('d-none');
        $('.top-line_down').toggleClass('bg-white');
    });

     $('.menu a').click(function (e) {
        e.preventDefault();
        $('.menu').addClass('d-none');
        $('.top-line_down').removeClass('bg-white');
    });

    $('.direction__item').click(function () {
        $('.direction__item').removeClass('active');
        $(this).addClass('active');
        calculator.recalculate();
    });

    $( "#slider-1" ).slider({
        animate: "slow",
        range: "min",    
        value: 10,
        min: 1,
        max: 50,
        slide : function(event, ui) {    
            $("#result-slider-1").text(ui.value);
            calculator.recalculate();
            }
    });

    $( "#result-slider-1" ).text($( "#slider-1" ).slider( "value" ));

    

    $( "#slider-3" ).slider({
        animate: "slow",
        range: "min",    
        value: 25,
        min: 1,
        max: 90,
        slide : function(event, ui) {    
            $("#result-slider-3").text(ui.value);
            calculator.recalculate();
            }
    });

    $( "#result-slider-3" ).text($( "#slider-3" ).slider( "value" ));
    

    $('.styler').styler();

    // плавное перемещение страницы к нужному блоку
    $("a.go").click(function (e) {
        e.preventDefault();
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination }, 900);
    });    

    // маска телефона

    $('.masked-phone').mask("+7 (999) 999-9999");

    

    // Инициализация слайдера
    $('.partners__slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3500,
        infinite: true,
        responsive: [
          {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
                }
          },
          {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
                }
          },
          {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
                }
          }
        ]
    });

    $('.directions__items').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3500,
        infinite: true,
        responsive: [
          {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
                }
          },
          {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
                }
          },
          {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
                }
          }
        ]
    });



    calculator.init();
    calculator.recalculate();

});    