 


function animateElements(){
    if(!$().appear)
            return console.log("Appear not Defined.")
    
    var elements = $('[data-animate]');
        if(elements.length > 0 ){
            elements.each(function( index,element){
                   var $element = $(element);
                   var clss = $element.data('animate') || 'fadeIn';                   
                   var time = $element.data('delay') || 800;
                   $element.addClass('not-animated');
                   $element.appear(function(i,t){
                    setTimeout(function(){
                        $element.addClass(clss + " animated-item");
                   }, time);
                   });
   
            })
 
        }
}
 




$(document).ready(function(){
    let height = $('.main_header').outerHeight();
    console.log(height)
    let [offset,duration] = [250,300];
    
    if(window.pageYOffset > 250 ){
        $('body').addClass('sticky_header').css('padding-top',height);
        $('.main_header').addClass('animated fadeInDown');
    }

    $(window).scroll(function(e){
        if(window.pageYOffset > 250 ){
            $('body').addClass('sticky_header').css('padding-top',height);
            $('.main_header').addClass('animated fadeInDown');
        }else{
            $('body').removeClass('sticky_header').css('padding-top',"0"); 
            $('.main_header').removeClass('animated fadeInDown');
        }
        
        if ($(this).scrollTop() > offset) {
            $(".back-to-top").fadeIn(duration);
        } else {
    
            $(".back-to-top").fadeOut(duration);
        }
})


$(window).scroll(function(e){
    if ($(this).scrollTop() > offset) 
        $(".back-to-top").fadeIn(duration);
    else 
        $(".back-to-top").fadeOut(duration); 
})

$(".back-to-top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ 
        scrollTop: 0
    }, duration);
    return false;
})


})



$(document).ready(function(){

     


   /*  $('.offer-btn').on('click', function(event) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $('.contact-form').offset().top - 15
        }, 800);
        $('.contact-form textarea').val($(this).data('content'));
    }); */


   /*  $('.nav-link[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        var offset = (this.getAttribute('href') == '#home' ) ? 0 :  target.offset().top - 15;
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: offset
            }, 800);
        }

         if($(window).width() < 580){
            $('#navbarContent').collapse('hide');
         }
    }); */

    /* 

   

    }) */





 

});




