// [==============================================================]
// [======================  calculator   =========================]
// [==============================================================]


const calculator ={
    increase(num , max){
        return (num < max ) ? ++num : num;
    },
    decrease(num){
        return (num > 0)  ? --num : num; 
    }
  }


// [==============================================================]
// [======================  notifications ========================]
// [==============================================================]
const  $notification = {
    alert(type, title, message, delay, icon, timer) {
        return $.notify({
            icon: icon,
            title: title,
            message: message,
        }, {
            type: type,
            delay: delay || 3000,
            timer: timer || 500,
            z_index: 9000,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            }
        });
    },
    success (title, message, delay, icon = false, timer = false) {

        return this.alert('success', title, message, delay, icon, timer)
    },
    error (title, message, delay, icon = false, timer = false) {

        return this.alert('danger', title, message, delay, icon, timer)
    },
    info (title, message, delay, icon = false, timer = false) {

        return this.alert('info', title, message, delay, icon, timer)

    },
    warning (title, message, delay, icon = false, timer = false) {

        return this.alert('warning', title, message, delay, icon, timer)
    },
    notify (options) {
        return $.notify(options || {});
    }
}   

// [==============================================================]
// [======================  product Manager ======================]
// [==============================================================]
const $productManage = {
    AddToCart(id){
        $notification.success("","The product has been added to your cart");
    },
    removeFromCart(id){
         
    },
    AddToCompare(id , link){
        $notification.success("",`The product has been added to your <a href='${link}'>product comparison</a>` ,15000);
    },
    removeFromCompare(id){
         
    },
    AddToWhitelist(id){
        $notification.success("","The product has been added to your whitelist");
    },
    removeFromWhitelist(id){
         
    }

}

// [==============================================================]
// [====================== shopping list  ========================]
// [==============================================================]
 //  hide shopinglist when click out side
  $(document).mouseup((e) =>
  {
      let container = $("#shopinglist");
      if (container.hasClass('show') && !container.is(e.target) && container.has(e.target).length === 0) 
          container.removeClass('show');
  });

 $(document).ready(()=>{
    $('.shopinglist-toggle').on('click', ()=> $('#shopinglist').toggleClass('show') );

    $('[data-toggle="tooltip"]').tooltip();


// [==============================================================]
// [====================== collapse menu  ========================]
// [==============================================================]


    $('.item-has-children').children('a').on('click',function(event){
        event.preventDefault();
        $(this).toggleClass('submenu-open').next('.sublist')
        .slideToggle(200).end().parent('.item-has-children')
        .siblings('.item-has-children').children('a')
        .removeClass('submenu-open').next('.sublist').slideUp(200);
    });


// [==============================================================]
// [====================== change view  ==========================]
// [==============================================================]

    $('.view-selector-grid').click(function(){
        $(this).addClass('active');
        $('.view-selector-list').removeClass('active');
        $('.products-view').removeClass('list-view').addClass('grid-view');
        localStorage.setItem('viewType','grid-view');
    })
    $('.view-selector-list').click(function(){
        $(this).addClass('active');
        $('.view-selector-grid').removeClass('active');
        $('.products-view').removeClass('grid-view').addClass('list-view');
        localStorage.setItem('viewType','list-view');
    })


// [==============================================================]
// [======================  share bar   ==========================]
// [==============================================================]

$('.sharebtn').click(function(event){
        event.preventDefault();
        let width      = 650,
            height     = 450,
            windowSRC  = $(this).attr('href'),
            windowTitle =$(this).parents('ul').data('window-title');
        window.open(
        windowSRC,windowTitle,
        `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=${width},height=${height},top=${(screen.height/2-height/2)},left=${(screen.width/2-width/2)}`
        );
    });

 

 //-----------------------------------------------------------------
    //end
 }); 
            
 

   
 

