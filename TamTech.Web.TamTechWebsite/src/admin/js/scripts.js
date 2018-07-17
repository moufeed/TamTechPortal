 (function ($, sr) {
     // debouncing function from John Hann
     // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
     var debounce = function (func, threshold, execAsap) {
         var timeout;

         return function debounced() {
             var obj = this,
                 args = arguments;

             function delayed() {
                 if (!execAsap)
                     func.apply(obj, args);
                 timeout = null;
             } 
             if (timeout)
                 clearTimeout(timeout);
             else if (execAsap)
                 func.apply(obj, args);

             timeout = setTimeout(delayed, threshold || 100);
         };
     };
       
     // smartresize 
     jQuery.fn[sr] = function (fn) {
         return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
     };

 })(jQuery, 'smartresize');
 /**
  * To change this license header, choose License Headers in Project Properties.
  * To change this template file, choose Tools | Templates
  * and open the template in the editor.
  */

 var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
     $BODY = $('body'),
     $MENU_TOGGLE = $('#menu_toggle'),
     $SIDEBAR_MENU = $('#sidebar-menu'),
     $SIDEBAR_FOOTER = $('.sidebar-footer'),
     $LEFT_COL = $('.left_col'),
     $RIGHT_COL = $('.right_col'),
     $NAV_MENU = $('.nav_menu'),
     $FOOTER = $('footer');



 //---------------------------------------
 // Sidebar
 //---------------------------------------
 //#region  Sidebar

 $(document).ready(function () {
     // TODO: This is some kind of easy fix, maybe we can improve this
     var setContentHeight = function () {
         // reset height
         $RIGHT_COL.css('min-height', $(window).height());

         var bodyHeight = $BODY.outerHeight(),
             footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
             leftColHeight = $LEFT_COL.eq(1).height() + ( $SIDEBAR_FOOTER.height() || 0),
             contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;


         // normalize content
            
         contentHeight -= ($NAV_MENU.height() + footerHeight +125);
          
         $RIGHT_COL.css('min-height', contentHeight);
     };

     $SIDEBAR_MENU.find('a').on('click', function (ev) {
         var $li = $(this).parent();

         if ($li.is('.active')) {
             $li.removeClass('active active-sm');
             $('ul:first', $li).slideUp(function () {
                 setContentHeight();
             });
         } else {
             // prevent closing menu if we are on child menu
             if (!$li.parent().is('.child_menu')) {
                 $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                 $SIDEBAR_MENU.find('li ul').slideUp();
             }

             $li.addClass('active');

             $('ul:first', $li).slideDown(function () {
                 setContentHeight();
             });
         }
     });

     // toggle small or large menu
     $MENU_TOGGLE.on('click', function () {
         if ($BODY.hasClass('nav-md')) {
             $SIDEBAR_MENU.find('li.active ul').hide();
             $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
         } else {
             $SIDEBAR_MENU.find('li.active-sm ul').show();
             $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
         }

         $BODY.toggleClass('nav-md nav-sm');

         setContentHeight();

         $('.dataTable').each(function () {
             $(this).dataTable().fnDraw();
         });
     });

     // check active menu
     $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

     
     $SIDEBAR_MENU.find('a').filter(function () {
         return this.href === CURRENT_URL;
     }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
         setContentHeight();
     }).parent().addClass('active');

     // recompute content when resizing
     $(window).smartresize(function () {
         setContentHeight();
     });

     setContentHeight();

     // fixed sidebar
     if ($.fn.mCustomScrollbar) {
         $('.menu_fixed').mCustomScrollbar({
             autoHideScrollbar: true,
             theme: 'minimal',
             mouseWheel: {
                 preventDefault: true
             }
         });
     }

 });




 $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
 });
 $(document).ready(function () {

     $('.toggleblock').on('click',function () {
         var $this = $(this);
         var userId = $(this).data('id');
         var userName = $(this).data('username');
         var block_url = $(this).data('block-url');
         var unblock_url = $(this).data('unblock-url');
         var status = $(this).data('status');
         console.log(this, $this)


         if (status) {
             
             $.ajax({
                 url: unblock_url,
                     type: 'POST',
                 //crossDomain: true,
                 contentType: 'application/json',
                     // xhrFields: {
                     //     withCredentials: true
                     // },
                     dataType: "json",
                     cache: false,
                     data: JSON.stringify({
                         username: userName
                     })
                 })

                 .done(function (data) {
                      
                     if (data.success) {
                         $notification.success("success", "", 2000, "fa fa-check");


                         $('#UserStatus').removeClass('c-red')
                             .addClass('c-green')
                             .html(`<i class="fa fa-check"></i> Active `);

                         $this.data('status', !status)
                             .removeClass('unblock')
                             .addClass('block')
                             .text('block User');
                     } else {
                         var text = "";
                         $.each(data.messges, function (i, item) {
                              
                             text += item + "\s\n";
                         })
                         $notification.error("Error", text , 2000, "fa fa-exclamation-circle")
                     }
                    
                 })

                 .fail(function (jqXHR, Status) {
                     $notification.error("Error", jqXHR.statusText, 2000, "fa fa-exclamation-circle")
                 });


         } else {
             
             $.ajax({
                 url: block_url,
                 type: 'POST',
                // crossDomain: true,
                 // xhrFields: {
                 //     withCredentials: true
                 // },
                 contentType: 'application/json',
                 dataType: "json",
                 cache: false,
                 data: JSON.stringify({
                     username: userName
                 })
                      
                 })
                 .done(function (data) {
                     console.log(data)
                     if (data.success) {

                         $notification.success("success", "", 2000, "fa fa-check");


                         $('#UserStatus').removeClass('c-green')
                             .addClass('c-red')
                             .html(`<i class="fa fa-times-circle-o c-red"></i>  Blocked`);

                         $this.data('status', !status)
                             .removeClass('block')
                             .addClass('unblock')
                             .text('Unblock User');
                     } else {

                         var text = "\s\n";
                         $.each(data.messages, function (i, item) {

                             text += item + "\s\n";

                         })
                         $notification.error("Error", text, 2000, "fa fa-exclamation-circle")

                     }
                    
                 })

                 .fail(function (jqXHR, Status) {
                      
                     $notification.error("Error", jqXHR.statusText, 2000, "fa fa-exclamation-circle")
                 });
         }
     })

 })



  window.aspectRatio = function (img, target) {
     var css;
     if (img.width > img.height) {

         css = {
             "width": "100%",
             "height": "auto"
         }
         $(target).css(css);
     } else {
         css = {
             "width": "auto",
             "height": "100%"
         }
         $(target).css(css);
     }

 }

 //#region input file
 function readURL(input) {
     if (input.files && input.files[0]) {
         var reader = new FileReader();

         reader.onload = function (e) {
             var img = new Image();
             img.src = e.target.result;
             img.onload = () => aspectRatio(img, '#imagePreview');
             $('#imagePreview').css('opacity', 1).attr('src', e.target.result);

         };

         reader.readAsDataURL(input.files[0]);
     }
 }
 //---------------------------------------
 // input file  
 //---------------------------------------

 

 $(document).ready(function () {
     $('#avater').change(function () {
         readURL(this);
     })
 })
 

 //#endregion


 //---------------------------------------
 // Remove Item
 //---------------------------------------
 var Element = function (type, id) {

     return swal({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         type: 'error',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#df4818',
         confirmButtonText: 'Yes, delete it!'
     }).then((result) => {

         if (result.value) {

             // let $parent = $("#tr-"+id).parent();
             // $("#tr-"+id).remove();
             //  $parent.find('tr').each(function(i,tr){
             //     $(tr).children().eq(0).text(i+1);
             // })

             swal(
                 'Deleted!',
                 'has been deleted.',
                 'success'
             )
         }
         return result;
     })
 }
 $(document).on('click', '.remove_Item', function () {

     var id = $(this).data('id');
     var type = $(this).data('type');
     RemoveElement(type, id);

 })


function RemoveItem (table , itm ){

     var row =  table.row( $(itm).parents('tr') );
     var id = $(itm).data('id');
     var type = $(itm).data('type');
     var ajax_url = $(itm).data('url');

    
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#df4818',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {

            $.ajax(ajaxrequest = {
                url: ajax_url,
                    type: 'GET',
                    cache: false,
                    data: {}
                })
                .done(function (response) {
                    if(response.success){
                        row.remove().draw();
                        $notification.success("Deleted!", "Item has been deleted.", 2000, "fa fa-check");
                         
                    }else{
                          $notification.error("Error", response.messages, 2000, "fa fa-exclamation-circle")    
                    }
                })
                .fail(function (jqXHR, Status) {
                    $notification.error("Error", jqXHR.statusText, 2000, "fa fa-exclamation-circle")
                });
        }
         
    })
 }

 //---------------------------------------
 // Notification
 //---------------------------------------
 var $notification = {
     alert: function (type, title, message, delay, icon, timer) {
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
             },
             template: '<div data-notify="container" class="col-xs-11 col-sm-4 col-md-3 col-lg-2 alert alert-{0} alert-notify" role="alert"> ' +
                 '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                 '<span data-notify="icon"></span> ' +
                 '<span data-notify="title">{1}</span> ' +
                 '<span data-notify="message">{2}</span>' +
                 '<div class="progress" data-notify="progressbar">' +
                 '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                 '</div>' +
                 '<a href="{3}" target="{4}" data-notify="url"></a>' +
                 '</div>' 
         });
     },
     success: function (title, message, delay, icon = false, timer = false) {

         return this.alert('success', title, message, delay, icon, timer)
     },
     error: function (title, message, delay, icon = false, timer = false) {

         return this.alert('danger', title, message, delay, icon, timer)
     },
     info: function (title, message, delay, icon = false, timer = false) {

         return this.alert('info', title, message, delay, icon, timer)

     },
     warning: function (title, message, delay, icon = false, timer = false) {

         return this.alert('warning', title, message, delay, icon, timer)
     },
     notify: function (options) {
         return $.notify(options || {});
     }
 }

 //-------------------------------------------------------------------------
 //-------------------------------------------------------------------------
 //-------------------------------------------------------------------------

