 


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

     


    $('.offer-btn').on('click', function(event) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $('.contact-form').offset().top - 15
        }, 800);
        $('.contact-form textarea').val($(this).data('content'));
    });


    $('.nav-link[href^="#"]').on('click', function(event) {
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
    });

    var height = $('.main_header').height();
    var offset = 250;
    var duration = 300; 

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


    

 

$(".back-to-top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ 
        scrollTop: 0
    }, duration);
    return false;
})



    
 


$('#contact_form').validate(
    {
          errorClass: "invalid_field",
          validClass: "valid_field",
        rules: {
            Name: {
                required: true,
                minlength: 2
            },
            Mobile:{
                required: function(element) {
                    return $("#email").val().length == 0;  
                },
                number :true,
                minlength: 10
            },
            Email:{
                required:  function(element) {
                    return $("#phone").val().length == 0;  
                },
                email: true
            },
            Message: {
                required: true, 
                minlength: 4
            },
        },
        messages: {
            Mobile: "Enter your phone number or fill an email field",
            Email: "Enter your email or fill a phone field",
        },
        submitHandler: function (form) {
             
            var $form = $(form);
                $form.find('.lds-spinner').removeClass('d-none');
                $form.find('.btn-send').attr('disabled' ,"disabled");
                $form.valid()
                var url = $form.attr('action');
                var message ={};
                data = $form.serializeArray();
                $.each(data,function(key,val){
                    message[val.name] = val.value;
                })
                
                $.ajax({  
                    type: 'POST',
                    url: url,
                    data: message,  
                })
                .done(function (data) { 
                        if(data.success){
                            $form[0].reset();
                            $form.find('.lds-spinner').addClass('d-none');
                            $form.find('.btn-send').removeAttr('disabled' );
                            $('#ContactModel').modal('show');
                            $('#ContactModel').on('shown.bs.modal', function (e) {
                                var modal = $(this);
                                    modal.find('.customer_name').text(message['Name']);
                              })
                        }
                })
                .fail(function (jqXHR, Status) {
                        console.log(jqXHR, Status);
                        $form.find('.lds-spinner').addClass('d-none');
                        $form.find('.btn-send').removeAttr('disabled' );
                });

                return false;
        },
    }
);

    $('#phone').on('change', function(evt){
        $('#email').valid();
    })

    $('#email').on('change', function(evt){
        $('#phone').valid();
    })





});




