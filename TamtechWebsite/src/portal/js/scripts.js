 


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
 

$(document).ready(()=>{
    
    //-----------------------------------------------------------------------
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

//-----------------------------------------------------------------------

if($('[data-parallax]')){
    $.each($('[data-parallax]') ,function(key,item){
        let $this = $(item);
        let src = $this.data('parallax');
        $this.css("background-image",`url("${src}")`);
        let moveTitle = $this.data("scroll-title");
        $(window).scroll(function(e){
            var sc = $(this).scrollTop() ;
            $this.css('background-position-y',`${sc* 0.35  * -1}px`);
            if(moveTitle){
                $(document).find('#style-parallax').remove();
                $('body').append('<style id="style-parallax">.static-header:before{top : '+(sc* 0.25 )+'px; color:rgba(255,255,255,'+(0.35 + ((sc* 0.20 ) / 100) )+')}</style>');
            }
        })
    }) 
}

//-----------------------------------------------------------------------

if($('[data-grayscale]')){
    $.each($('[data-grayscale]') ,function(key,item){
        let $this = $(item);
        let src = $this.data('grayscale');
        $this.css("background-image",`url("${src}")`);
     
        $(window).scroll(function(e){
            var sc = $(this).scrollTop() ;

            $this.css('filter', `grayscale(${((sc* 0.30 ) / 100)})`);
             
        })
    }) 
}
if($('[data-zoom]')){
    $.each($('[data-zoom]') ,function(key,item){
        let $this = $(item);
        let src = $this.data('zoom');
        $this.css("background-image",`url("${src}")`);
       
        $(window).scroll(function(e){
            var sc = $(this).scrollTop() ; 

            $this.css('background-size', (sc / 20) + 100+"%");
             
        })
    }) 
}



//-----------------------------------------------------------------------

$('.dropdown').on('show.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
});

$('.dropdown').on('hide.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
});
 
  


}); //document ready
