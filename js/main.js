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
    });

    $( "#slider-1" ).slider({
        animate: "slow",
        range: "min",    
        value: 10,
        min: 1,
        max: 50,
        slide : function(event, ui) {    
            $("#result-slider-1").text(ui.value);
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

    


});    