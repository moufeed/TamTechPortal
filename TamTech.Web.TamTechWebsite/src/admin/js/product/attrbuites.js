//------------------------------------------------------------------
/* 
#1 -    attribute template & option template [attrTemplate , optTemplate ]
#2 -    append attrubite template to dom 
#3 -    toggle atrribute status to update
#4 -    toggle attribute buttons and show error message [update ,insert, error]
#5 -    save attribute
#6 -    remove attribute
#7 -    add  new attribute value
#8 -    save attribute value
#9 -    update attribute value
#10 -   remove attribute value
#12 -
#13 -
*/
//------------------------------------------------------------------







$(document).ready(function () {


//------------------------------------------------------------------
//#region #1  attribute template & option template
//------------------------------------------------------------------
var attrTemplate = '<section id="attr_item-@@">'+
    '<div class="clearfix inputitem">'+
    '<div class="row attribute">'+
    '<div class="col-md-4 col-sm-4 p-0">'+ 
    '<div class="form-group clearfix">'+
    '<label for="Attribute-type-@@" class="control-label col-md-3 col-sm-12 col-xs-12 ">Type</label>'+
    '<div class="col-md-9 col-sm-12 col-xs-12 ">'+
    '<input type="text"   name="Attributes[@@].type" id="Attribute-type-@@" class="form-control ignore" disabled value="select" />'+
    '<span asp-validation-for="Attributes[@@].type" class="text-danger invalid_field"></span></div></div></div>'+
    '<div class="col-md-4 col-sm-4 p-0">'+
    '<div class=" form-group clearfix">'+
    '<label for="Attribute-name-@@" class="control-label col-md-3 col-sm-12 col-xs-12 ">Name</label>'+
    '<div class="col-md-9 col-sm-12 col-xs-12 ">'+
    '<input type="text"   name="Attributes[@@].Name" id="Attribute-name-@@" class="form-control " />'+
    '<span asp-validation-for="Attributes[@@].Name" class="text-danger invalid_field"></span></div></div></div>'+
    '<div class="col-md-4 col-sm-4 col-xs-12 p-0">'+
    '<div class="form-group clearfix text-right">'+
    '<a class="btn btn-save-link save-attrbute" data-id="@@" data-new="true">'+
    '<i class="fa fa-check" aria-hidden="true"></i> save</a>'+
    '<a class="btn btn-remove-link remove-attrbute" data-new="true" data-id="@@">'+
    '<i class="fa fa-trash-o"></i> Delete</a>'+
    '</div></div></div>'+
    '<div class="attr_values collapse" id="values-@@">'+
    '<div class="options-box" id="options-@@">'+
    '<div class="form-group m-y-2 " id="opt-@@-##">'+
    '<div class="clearfix">'+
    '<label for="Value-@@-##" class="control-label col-md-2  col-xs-12 col-sm-4 m-y-2">Option Value</label>'+
    '<div class="col-md-3 col-xs-12 col-sm-8 m-y-2">'+
    '<input type="text" name="Attributes[@@][Values][##][Value]" class="form-control" id="Value-@@-##" /></div>'+
    '<label for="Price -@@-##" class="control-label col-md-2  col-xs-12 col-sm-4 m-y-2">Price</label>'+
    '<div class="col-md-3 col-xs-12 col-sm-8 m-y-2">'+
    '<input type="number" name="Attributes[@@][Values][##][Price]" class="form-control" id="Price-@@-##" min="0" />'+
    '</div>'+
    '<div class="col-md-2 col-xs-12">'+
    '<a class="btn btn-remove-link  pull-right m-y-2 remove-option"   data-id="opt-@@-##"><i class="fa fa-trash-o"></i> Delete</a>'+
    '<a class="btn btn-save-link save-option pull-right m-y-2" data-id="opt-@@-##" data-new="true">'+
    '<i class="fa fa-check" aria-hidden="true"></i>save</a>'+
    '</div></div><hr class="line" />'+
    '</div></div>'+
    '<div class="option-footer text-right">'+
    '<a class="btn btn-addContent m-y-2 small" id="addOptions" data-attr="@@"><i class="fa fa-plus"></i> Add option</a></div></div></div>'+
    '<hr class="m-t0 m-b5" />'+
    '</section>';
    
    
    var optTemplate =
        '<div class="form-group m-y-2 " id="opt-@@-##">' +
        '<div class=" clearfix">' +
        '<label for="Value-@@-##" class="control-label col-md-2  col-xs-12 col-sm-4 m-y-2">Option Value</label>' +
        '<div class="col-md-3 col-xs-12 col-sm-8 m-y-2">' +
        '<input type="text" name="Attributes[@@][Values][##][Value]" class="form-control ignore" id="Value-@@-##" /></div>' +
        '<label for="Price-@@-##" class="control-label col-md-2  col-xs-12 col-sm-4 m-y-2">Price</label>' +
        '<div class="col-md-3 col-xs-12 col-sm-8 m-y-2">' +
        '<input type="number"  name="Attributes[@@][Values][##][Price]" class="form-control ignore" id="Price-@@-##" min="0" value="0"/></div>' +
        '<div class="col-md-2 col-xs-12">' +
        '<a class="btn btn-remove-link  pull-right m-y-2 remove-option"  data-new="true"  data-id="opt-@@-##">' +
        '<i class="fa fa-trash-o"></i> Delete</a>'+
        '<a class="btn btn-save-link save-option pull-right m-y-2" data-id="opt-@@-##" data-new="true">'+
        '<i class="fa fa-check" aria-hidden="true"></i>save</a>'+
        '</div></div><hr class="line" /></div>';
//------------------------------------------------------------------
//#endregion #1
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #2   append attrubite template to dom  
//------------------------------------------------------------------
$('#addAttrbutes').on('click', function (e) {
    e.preventDefault();
    var temp = attrTemplate.replace(/@@/g, attrIdx).replace(/##/g, 0);
    $('#a_wrapper').append(temp);
    attrIdx++;
});
//------------------------------------------------------------------
//#endregion #2
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #3 toggle atrribute status to update
//------------------------------------------------------------------
var inputTempValue={} ;
$(document).on('click','.update-attrbute', function (e) {
    e.preventDefault();
    $(this).hide();
    var id = $(this).data('id');
    var inputName = $('#Attribute-name-'+id);
    inputTempValue[id] =inputName.val();
    inputName.removeAttr('disabled');
    $('.save-attrbute[data-id="'+id+'"]').removeClass('hidden');
}); 
//------------------------------------------------------------------
//#endregion #3
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #4 toggle attribute buttons and show error message
//------------------------------------------------------------------
function $toggleUpdateSaveButtons($this ,inputName , id ){
    $this.addClass('hidden');
    $('.update-attrbute[data-id="'+id+'"]').show();
    inputName.attr('disabled','disabled').removeClass('valid_field');
}  

 //insert case
function $addUpdateButton($this ,inputName , id ){
     
    inputName.attr('disabled','disabled').removeClass('valid_field');
    $('.remove-attrbute[data-id="'+id+'"]').removeAttr('data-new');
    $this.removeAttr('data-new').addClass('hidden'); 
    $this.before('<a class="btn  btn-link btn-values" role="button"'+
    'data-toggle="collapse" href="#values-'+id+'" aria-expanded="false" aria-controls="values-'+id+'">'+
    '<i class="fa fa-cubes" aria-hidden="true"></i>Values</a>');
    $this.after('<a class="btn btn-update-link update-attrbute" data-id="'+id+'">'+ 
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a>');

   $("#values-"+id).attr('data-attribute',inputName.val() )     ;
}


function showErrorsMsg(erros){
    var errorMessage ="";
    $.each(erros,function(key,value){
        errorMessage += "<strong>"+key+"</strong><br>"+ value +"<br>";
    })
    $notification.error(false ,errorMessage , 4000  );
}
//------------------------------------------------------------------
//#endregion #4
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #5 save attribute
//------------------------------------------------------------------
$(document).on('click','.save-attrbute',function (e) {
    e.preventDefault();

    var $this = $(this),
        isNew = $this[0].hasAttribute("data-new"),
        id = $this.data('id'),
        inputName = $('#Attribute-name-'+id);
    
    if(isNew){
      
        if(inputName.val().length > 0 ){
            var att_data = {
                name : inputName.val(),
                type : $('#Attribute-type-'+id).val(),
                productid : pid
            };
            $.ajax({
                url: '/Admin/Products/Attributes/Create',
                    type: 'POST',
                    dataType: "json",
                    data: att_data ,
                    beforeSend:function(){
                        $this.find('i').removeClass().addClass('fa fa-spinner fa-pulse ');
                    },
                    complete: function(){
                        $this.find('i').removeClass().addClass('fa fa-check');
                    }
                }) 
                .done(function (data) { 
                    if(data.success){
                         
                        $addUpdateButton($this ,inputName , id );
                        $notification.success("success", "", 2000, "fa fa-check");
                    }
                    else{
                        
                        showErrorsMsg(data.data)
                    }
                })
                .fail(function (jqXHR, Status) {
                    $notification.error("Error!", jqXHR.statusText  , 2000, "fa fa-exclamation-circle");
                });
        }else{
            inputName.addClass('invalid_field').removeClass('valid_field') ;
            inputName.on('change', ()=>  inputName.removeClass('invalid_field') ); 
        }
    
    }else{
        
        if(inputName.val() != inputTempValue[id]){
            var attdata = {
                originalName : inputTempValue[id] ,
                name : inputName.val(),
                type : $('#Attribute-type-'+id).val(),
                productid : pid
            }; 
            $.ajax({
                url: '/Admin/Products/Attributes/edit',
                    type: 'POST',
                    dataType: "json",
                    data: attdata ,
                    beforeSend:function(){
                        $this.find('i').removeClass().addClass('fa fa-spinner fa-pulse ');
                    },
                    complete: function(){
                        $this.find('i').removeClass().addClass('fa fa-check');
                    }
                }) 
                .done(function (data) { 
                    if(data.success){
                         
                        $notification.success("success", "", 2000, "fa fa-check");
                        $toggleUpdateSaveButtons($this ,inputName , id );
                        $refreshCombinationsTable(data.data);
                    }
                    else{
                        
                        showErrorsMsg(data.data);
                    }
                })
                .fail(function (jqXHR, Status) {
                    $notification.error("Error!", jqXHR.statusText  , 2000, "fa fa-exclamation-circle")
                    inputName.val(inputTempValue[id]);
                });
        }else{
            $this.find('i').removeClass().addClass('fa fa-check');
            $toggleUpdateSaveButtons($this ,inputName , id );
        }  
        
    }
}); 

//------------------------------------------------------------------
//#endregion #5
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #6 remove attributes
//------------------------------------------------------------------
function removeAttribute($this){
    if (attrIdx >= 0) {
        var id = $this.data('id');
        $('#attr_item-' + id).remove();

        
        /*  
            // replace all ids of elements list
            var items = $('#a_wrapper').find('section[id^="attr_item"]');
            items.each(function (i, itm) {
                var item = $(itm);
                item.attr('id', 'attr_item-' + i);
                var btn = item.find('.remove-attrbute');
                btn.attr('data-id', i);
                var update_btn = item.find('.update-attrbute');
                update_btn.attr('data-id', i);
                var collapse = item.find('a[data-toggle="collapse"]');
                collapse.attr("aria-controls","values-"+i).attr("href","#values-"+i);
                var collapseBox = item.find(".attr_values.collapse");
                collapseBox.attr('id',"values-"+i);
                var atrrInput = item.find('input[id^="Attribute-"]');
                atrrInput.each(function (j, input) {
                    var id = input.id.replace(/\d/g, i)
                    var name = input.name.replace(/\d/g, i);
                    $(input).attr('name', name);
                    $(input).attr('id', id);
                })
                var attrOpt = item.find('[id^="options-"]');
                attrOpt.attr('id', 'options-' + i);
                var addOpt = item.find('#addOptions');
                addOpt.attr('data-attr', i)
                var options = item.find('.form-group[id^="opt-"]');
                options.each(function (k, ots) {
                    var opt = $(ots);
                    var id = ots.id.replace(/\d/, i);
                    opt.attr('id', id);
                    var label = opt.find('label[for^="Value-"]');
                    label.attr('for', label.attr('for').replace(/\d/, i))
                    var input = opt.find('input[id^="Value-"]');
                    input.attr('id', input.attr('id').replace(/\d/, i));
                    input.attr('name', input.attr('name').replace(/\d/, i));
                    var Price = opt.find('label[for^="Price-"]');
                    Price.attr('for', label.attr('for').replace(/\d/, i));
                    var Priceinput = opt.find('input[id^="Price-"]');
                    Priceinput.attr('id', input.attr('id').replace(/\d/, i));
                    Priceinput.attr('name', input.attr('name').replace(/\d/, i));
                    var btn = opt.find('.remove-option');
                    btn.attr('data-id', btn.attr('data-id').replace(/\d/, i));
                })
            });
        attrIdx--; */
    }
}

function deleteattribute($this){

   
     $.ajax({
        url: '/Admin/Products/Attributes/delete',
        type: 'Get',
        dataType: "json",
        data: {
            productid : pid,
            name : $this.parents('.attribute').find('input[id^="Attribute-name"]').val() 
        }
    })
    .done(function(data){
        if(data.success){
            $notification.success("success", "", 2000, "fa fa-check");
            removeAttribute($this);
        }else{
            $notification.error("Error!", "", 2000, "fa fa-exclamation-circle");
        }
    })
    .fail(function (jqXHR, Status) {
        $notification.error("Error!", jqXHR.statusText, 2000, "fa fa-exclamation-circle");
    });
}


$(document).on('click', '.remove-attrbute', function (e) {
    e.preventDefault();
    var $this = $(this);
    isNew =  $this[0].hasAttribute("data-new");


    if(isNew){
        removeAttribute($this);
    }else{
        
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
                deleteattribute($this);
            }
    
        })
       
    }



   
})

//------------------------------------------------------------------
//#endregion #6
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #7  `add  new attribute value`
//------------------------------------------------------------------
$(document).on('click', '#addOptions', function (e) {
    e.preventDefault();
    var id = $(this).data('attr');
    var count = $('#options-' + id).children('[id^="opt-"]').length;
    
    var temp = optTemplate.replace(/@@/g, id).replace(/##/g, count);
    $('#options-' + id).append(temp);

});

//------------------------------------------------------------------
//#endregion #7
//------------------------------------------------------------------
/* 
'<a class="btn btn-remove-link  pull-right m-y-2 remove-option" data-id="'+id+'">'+
        '<i class="fa fa-trash-o"></i> Delete </a>'+
*/

//------------------------------------------------------------------
//#region #8 save attribute value
//------------------------------------------------------------------
 
    function $toggleSaveUpdateOption($this , opt , id){
        $('.Update-option[data-id="'+id+'"]').show(); 
        $this.addClass('hidden');
        opt.find('input').attr('disabled','disabled');
    }

    function $addUpdateOptionBtn($this , opt , id){
        $this.removeAttr('data-new')
            .addClass('hidden');
        $this.siblings().removeAttr('data-new');
var temp = 
        '<a class="btn btn-update-link Update-option pull-right m-y-2" data-id="'+id+'">'+
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a>';
        $this.after(temp);
         opt.find('input').removeClass('valid_field').attr('disabled','disabled');
    }
    


    function addNewOptionValue($this,opt,atrrname,id){
        if(opt.find('input')[0].value.length >  0 ){
           
            $.ajax({
                url: '/Admin/Products/Attributes/values/create',
                    type: 'POST',
                    dataType: "json",  
                    data: {
                        productid : pid,
                        value : opt.find('input')[0].value,
                        price :opt.find('input')[1].value,
                        attributename : atrrname
                    }  ,
                    beforeSend:function(){
                        $this.find('i').removeClass().addClass('fa fa-spinner fa-pulse ');
                    },
                    complete: function(){
                        $this.find('i').removeClass().addClass('fa fa-check');
                    }
                }) 
                .done(function (data) { 
                    if(data.success){
                        $addUpdateOptionBtn($this , opt , id);
                        $notification.success("success", "", 2000, "fa fa-check");
                    }else{
                       showErrorsMsg(data.data)
                    }
                 
                })
                .fail(function (jqXHR, Status) { 
                    $notification.error("Error!", jqXHR.statusText  , 2000, "fa fa-exclamation-circle")
                });
                 
        }else{

           $( opt.find('input')[0])
            .addClass('invalid_field')
            .removeClass('valid_field')
            .on('change',function(){
                 $(this).removeClass('invalid_field');
            });
           
        }
        delete inputOptionTemp[id];
    }

    $(document).on('click', '.save-option',function (e) {
        e.preventDefault();
        var $this = $(this),
            id =  $this.data('id'),
            opt = $( $this.parents('.form-group')[0]),
            isNew =  $this[0].hasAttribute("data-new"),
            atrrname =  $this.parents('.inputitem').find('input[id^="Attribute-name-"]').val();
            
        if(isNew){
            addNewOptionValue($this,opt,atrrname,id);
        }else{
            updateOptionValue($this,opt,atrrname,id);
        }
       
    }); 

//------------------------------------------------------------------
//#endregion #8
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #9 update attribute value
//------------------------------------------------------------------
var inputOptionTemp ={}; 
// update option 
$(document).on('click','.Update-option',function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    var opt = $($(this).parents('.form-group')[0]);
    opt.find('input').removeAttr('disabled');
    $(this).hide();
    inputOptionTemp[id] = {};
    inputOptionTemp[id]['val'] = opt.find('input')[0].value;
    inputOptionTemp[id]['price'] = opt.find('input')[1].value;
    $('.save-option[data-id="'+id+'"]').removeClass('hidden'); 
     console.log(inputOptionTemp);
});

function updateOptionValue($this,opt,atrrname,id){
    if(opt.find('input')[0].value  != inputOptionTemp[id]['val']  || opt.find('input')[1].value !=  inputOptionTemp[id]['price'] ){
        
        $.ajax({
            url: '/Admin/Products/Attributes/values/edit',
                type: 'POST',
                dataType: "json",
                data: {
                    productid : pid,
                    value : opt.find('input')[0].value,
                    price :opt.find('input')[1].value,
                    originalvalue : inputOptionTemp[id]['val'],
                    attributename : atrrname
                },
                beforeSend:function(){
                    $this.find('i').removeClass().addClass('fa fa-spinner fa-pulse ');
                },
                complete: function(){
                    $this.find('i').removeClass().addClass('fa fa-check');
                }
            }) 
            .done(function (data) { 
                if(data.success){
                    $notification.success("success", "", 2000, "fa fa-check");
                    $addUpdateOptionBtn($this , opt , id);
                    $refreshCombinationsTable(data.data);
                    delete inputOptionTemp[id];
                }else{
                   showErrorsMsg(data.data);
                } 
            })
            .fail(function (jqXHR, Status) {
                
                $notification.error("Error!", jqXHR.statusText  , 2000, "fa fa-exclamation-circle")
                opt.find('input')[0].value  = inputOptionTemp[id]['val'] ;
                opt.find('input')[1].value  =  inputOptionTemp[id]['price'] ;

                 

            });
    }else{
        $toggleSaveUpdateOption($this , opt , id);
    }
   
}



//------------------------------------------------------------------
//#endregion #9
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #10  remove attribute value
//------------------------------------------------------------------

function removeOptionRow($this ){

    var data = $this.data('id').split('-').slice(1);
    var index = parseInt(data[data.length - 1]);
    var id = parseInt(data[0]); 
    var count = $('#options-' + id).children('[id^="opt-"]').length - 1;


    var regex = /([a-zA-z]+)+(-\d+-)+(\d+)/g;
    if (count >= 0) {
        $('#opt-' + id + '-' + index).remove();

        if (index < count) {
            $('#options-' + id).children('[id^="opt-"]').each(function (i, option) {
                var opt = $(option);
                opt.attr('id', 'opt-' + id + '-' + i);
                $(option).find('.remove-option').attr('data-id', 'opt-' + id + '-' + i);
                var label = opt.find('label');
                label.each(function (l, lab) {
                    $(lab).attr('for', $(lab).attr('for').replace(regex, '$1-' + id + '-' + i))
                })
                var inputs = opt.find('input');
                inputs.each(function (c, input) {
                    var ipt = $(input);
                    var reg = /([a-zA-z]+\W)+(\d+)+([a-zA-z]+\W)+(\d+)+([a-zA-z]+\W)/g;
                    ipt.attr('name', ipt.attr('name').replace(reg, '$1' + id + '$3' + i + '$5'))
                })
            })
           
        }

    } 
}

function deleteOptionValue($this){
    
    var opt = $($this.parents('.form-group')[0]);
 
    $.ajax(
        {
            url: '/Admin/Products/Attributes/values/delete',
            type: 'GET',
            dataType: "json",
            data: {
                productid : pid,
                attributename : $this.parents('.inputitem').find('input[id^="Attribute-name-"]').val(),
                value :  opt.find('input')[0].value,
            },
        } )
    .done(function(data){
        if(data.success){
            $notification.success("success", "", 2000, "fa fa-check");
            removeOptionRow( $this );
        }else{
            $notification.error("Error!", "", 2000, "fa fa-exclamation-circle");
        }
    })
    .fail(function (jqXHR, Status) {
        $notification.error("Error!", jqXHR.statusText  , 2000, "fa fa-exclamation-circle")
    });
}


$(document).on('click', '.remove-option', function (e) {
    e.preventDefault();
    var $this = $(this);
    isNew = $this[0].hasAttribute("data-new");
    if(isNew){
        removeOptionRow( $this );
    }else{
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
                deleteOptionValue($this);
            }
    
        })
    }
   
})    
//------------------------------------------------------------------
//#endregion #10
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #
//------------------------------------------------------------------
//------------------------------------------------------------------
//#endregion #
//------------------------------------------------------------------

 
  
    
 
 

 

    //-- end --
}); 