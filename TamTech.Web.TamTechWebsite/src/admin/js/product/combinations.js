//------------------------------------------------------------------
/*
#1 -    combination modal   [show , ajax:get , hide ]  
#2 -    create combination  model   [fn]
#3 -    append new combination to table  [fn]
#4 -    append Errors to commbination modal [fn]
#5 -    validate and save new Combintion  [validate , ajax:post]
#6 -    toggle update combination button [fn]
#7 -    save updated Combination [ ajax:post ]
#8 -    toggle Publish Combination button [fn]
#9 -    publish & unpublish combination [ajax:get]
#10 -   refresh Combinations table  
#11 -   delete combination
#12 -   
#13 -   
*/
//------------------------------------------------------------------

$(document).ready(function () {
 
//------------------------------------------------------------------
//#region #1    combination modal
//------------------------------------------------------------------
$('#combinationModal').on('show.bs.modal', function (e) {
    var button = $(e.relatedTarget)
    var productid = button.data('productid');
    var modal = $(this);
    var trTemplate = "";
    modal.find('#pro_sku').val($('input[id="SKU"]').val()) || PSKU;

    $.getJSON('/Admin/Products/Attributes/get/' + productid, function (data) {

        
            if (data.success && data.data.length > 0) {
                
                modal.find('.atrributes_selects_box').html(" ");
                $.each(data.data, function (idx, attr) {
                    modal.find('.atrributes_selects_box').append(
                        '<div class="form-group clearfix" id="selects_box">' +
                        '<label class="control-label col-md-3 col-sm-4"> ' + attr.name + ' </label>' +
                        '<div class="col-md-9 col-sm-8 col-xs-12">' +
                        '<select class="form-control" name="attr-' + attr.name + '-' + idx + '"><option value="null">Select ' + attr.name + '</option></select></div></div>'
                    );
                    $.each(attr.values, function (i, opt) {
                        modal.find('select[name="attr-' + attr.name + '-' + idx + '"]')
                            .append('<option value="' + opt.value + '"> ' + opt.value + ' </option>')
                    })
                });
            }
             else if(data.success && data.data.length == 0){
                modal.find('#saveCombination').hide();
                modal.find('.atrributes_selects_box').html('<div class="alert alert-warning">This product does not have any attributes</div>');
            }
            else {
                $notification.error("Error!", "Oops! something wrong", 2000, "fa fa-exclamation-circle");
            }
        })
        .fail(function (jqXHR) {
            $notification.error("Error!", jqXHR.statusText, 2000, "fa fa-exclamation-circle")
        })

});
$('#combinationModal').on('hidden.bs.modal', function (e) {
    var modal = $(this);
    modal.find('.atrributes_selects_box').html('<div class="lds-ripple"><div></div><div></div></div>');
    if ($('#combinationModal').find('.alert').length > 0) {
        $('.alert').remove();
    }
    
});
//------------------------------------------------------------------
//#endregion #1
//------------------------------------------------------------------

//------------------------------------------------------------------
//#region  #2  create combination  model
//------------------------------------------------------------------
function createObj($form) { 
    let inputs = $form.find('input').serializeArray();
    let selects = $form.find('select').serializeArray();
    var deferred = new $.Deferred();
    let combinationData = {
        Attributes: {},
        productid: pid,
        ProductSku : PSKU
    };
    $.each(inputs, function (i, item) {
        combinationData[item.name] = item.value;
    })
    $.each(selects, function (i, select) {
        if (select.value != "null")
            combinationData.Attributes[select.name.split('-')[1]] = select.value;
        if (selects.length - 1 == i)
            deferred.resolve(combinationData);
    })
    return deferred.promise();
}

//------------------------------------------------------------------
//endregion  #2
//------------------------------------------------------------------

//------------------------------------------------------------------
//#region  #3   append new combination to table 
//------------------------------------------------------------------

function appendTableRow(row,key,refresh) {
    console.log(row)
    var attrHtml = ""; 
    if(refresh){
        attrHtml = key.replace(/,/g,"<br/>").replace(/:/g," : ");
        
    }else{
        $.each(row.attributes, function (index, item) {
            attrHtml += index + " : " + item + "<br/>";
        })
    }
 
    var temp = '<tr ><td>' + attrHtml + '</td><td>' +
    '<input type="number" step="1" class="form-control m-y-1 ignore" name="ProductAttributeCombinations[' + comb + '].Quantity"   value="' + row.quantity + '" disabled /></td><td>' +
    '<p class="form-control-static">' + row.sku + '</p></td><td>' +
    '<input type="number" step="any" class="form-control m-y-1 ignore" name="ProductAttributeCombinations[' + comb + '].Price" value="' + row.price + '" disabled /></td>' +
    '<td><input type="number" step="any" class="form-control m-y-1 ignore" name="ProductAttributeCombinations[' + comb + '].DiscountPrice" value="' + row.discountPrice + '" disabled /></td>' +
    '<td class="text-center" ><a data-sku="'+row.sku+'"  data-key="'+key+'" class="btn btn-link-pup toggle_comb_publish">   <span class="unpublished"> <i class="fa fa-eye-slash c-red"></i> <small>unpublished</small></span></a> </td>'+
    '<td><a href="#" class="btn btn-update-link update-combination  m-y-2 " data-index="' + comb + '">' +
    '<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit </a>' +
    '<a title="Delete Combination" data-sku="'+row.sku+'" data-key="'+key+'" data-id="' + comb + '" class="btn btn-remove-combination c-red m-y-2 remove-combination">'+
    '<i class="fa fa-trash-o"></i> Delete</a>'+
    '<a class="btn btn-save-link save-combination hidden m-y-2" data-index="' + comb + '">' +
    '<i class="fa fa-check" aria-hidden="true"></i> save</a></td></tr>';
    if(row.published){
         temp = temp.replace(/unpublished/g, 'published')
         temp = temp.replace('fa-eye-slash c-red','fa-eye c-green'); 
    }
    if($('.combinations-table').has('.empty_row ').length > 0){
        $('.combinations-table').find('.empty_row').remove();
    }
    $('.combinations-table tbody').append(temp);
    comb++;
} 

//------------------------------------------------------------------
//endregion #3
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region  #4  append Errors to commbination modal 
//------------------------------------------------------------------

function appendError(errors,$form) {
    var alertTemp = '<div class="alert alert-danger   alert-dismissible fade in" style="border-radius: 0;" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">×</span></button><ol id="errors_list" class="m-b0"></ol></div>';
    if ($('#combinationModal').find('.alert').length <= 0) {
        $form.before(alertTemp);
    }
    $.each(errors, function (key, value) {
        $.each(value, function (k, v) {
            $('#errors_list').append('<li>' + v + '</li>');
        })
    })
}

//------------------------------------------------------------------
//#endregion #4
//------------------------------------------------------------------
    
//------------------------------------------------------------------
//#region  #5   validate and save new Combintion  
//------------------------------------------------------------------
var cobinations_validator =  $(" #product_cobinations ").validate({
    errorClass: "invalid_field",
    validClass: "valid_field", 
    ignore: ".ignore",
    rules: { 
        "discountprice" :{
            lessThan: ["#combination_price" ,"price"],
        },
        "price" :{
            greaterThan: ["#discount_price" ,"Discount Price"],
        }
    },
    submitHandler: function (form) {
        var $form = $(form);
        createObj($form).then(function (result) {

            if ($('#combinationModal').find('.alert').length > 0) {
                    $('.alert').remove();
            }

            $.ajax({
                    url: '/Admin/Products/combinations/create',
                    type: 'POST',
                    dataType: "json",
                    data: result
                })
                .done(function (data) {
                    if (data.success) {

                        $notification.success("success", "", 2000, "fa fa-check");
                        $("[data-dismiss=modal]").trigger({
                            type: "click"
                        });
                        
                        appendTableRow(data.data,data.combinationkey);
                        $form[0].reset();
                    } else {
                         
                        appendError(data.data,$form);
                    }
                })
                .fail(function (jqXHR, Status) {
                     
                    if(jqXHR.status == 400 ){
                        appendError(jqXHR.responseJSON,$form);
                    }else{
                        $notification.error("Error!", jqXHR.statusText, 2000, "fa fa-exclamation-circle");
                    }
                })
        });
        return false;
    }
})
$("#combination_price").on('keyup',function(){
    cobinations_validator.element( "#discount_price" );
})
$("#discount_price").on('keyup',function(){ 
    cobinations_validator.element( "#combination_price" );
})

//------------------------------------------------------------------
//#endregion #5
//------------------------------------------------------------------


    
//------------------------------------------------------------------
//#region #6  toggle update combination button 
//------------------------------------------------------------------
function ShowUpdateBtn($this, $tr) {
    $tr.find(":input").attr('disabled', 'disabled');
    $this.addClass('hidden');
    $this.siblings('.update-combination').removeClass('hidden');
}

var combinationTemp = {};
$(document).on('click', '.update-combination', function (e) {
    e.preventDefault();
    var $tr = $($(this).parents('tr')[0]),
        index = $(this).data('index');
    $tr.find(":input").removeAttr('disabled');
    combinationTemp[index] = $tr.find(":input").serializeArray();

    $(this).addClass('hidden').siblings('a.save-combination').removeClass('hidden');
})
//------------------------------------------------------------------
//#endregion #6
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #7 save updated Combination
//------------------------------------------------------------------
$(document).on('click', '.save-combination', function () {
    var $tr = $($(this).parents('tr')[0]),
        index = $(this).data('index');
    data = $tr.find(":input").serializeArray();
    if (JSON.stringify(combinationTemp[index]) !== JSON.stringify(data)) {
        var comData = {
            Quantity: data[0].value,
            Sku: combinationTemp[index][1].value,
            newSku: data[1].value,
            price: data[2].value,
            productid: pid
        }
        $.ajax({
                url: '/Admin/Products/combinations/edit',
                type: 'POST',
                dataType: "json",
                data: comData
            })
            .done(function (data) {
                if (data.success) {
                    $notification.success("success", "", 2000, "fa fa-check");
                    ShowUpdateBtn($(this), $tr);
                } else {
                    showErrorsMsg(data.data);
                }
            })
            .fail(function (jqXHR, Status) {

                $notification.error("Error!", jqXHR.statusText, 2000, "fa fa-exclamation-circle");

                $.each(data, function (idx, item) {
                    $('input[name="' + item.name + '"]').val(combinationTemp[index][idx].value);
                });
            });
    } else {
        delete combinationTemp[index];
        ShowUpdateBtn($(this), $tr);
    }
})
//------------------------------------------------------------------
//#endregion #7
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #8  toggle Publish Combination button 
//------------------------------------------------------------------
function togglePublishCombBtn($this , status){
    if(status){
        if($this.find('span').hasClass('unpublished')){
            $this.find('span').removeClass('unpublished').addClass('published');
            $this.find('small').text('published');
            $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye c-green');
        }else{
            $this.find('span').removeClass('published').addClass('unpublished');
            $this.find('small').text('unpublished');
            $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye-slash c-red');
        }
    }else{
        if($this.find('span').hasClass('unpublished'))
        $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye-slash c-red');
        else
        $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye c-green');
    }
}
//------------------------------------------------------------------
//#endregion #8
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #9 publish & unpublish combination
//------------------------------------------------------------------
$(document).on('click','.toggle_comb_publish',function(e){
    e.preventDefault();
    var $this =$(this);
    $this.find('i').removeClass().addClass("fa fa-spinner fa-pulse");

    $.ajax({
        url: '/Admin/Products/combinations/publish',
        type: 'GET',
        dataType: "json",
        data: {
            productid : pid,
            combinationkey : $this.data('key'),
            sku : $this.data('sku'),
        }
    })
    .done(function (data) {

        if(data.success){
           togglePublishCombBtn($this , true)
        }else{
            $notification.error("Error!", "", 2000, "fa fa-exclamation-circle");
            togglePublishCombBtn($this , false);
        }
    })
    .fail(function (jqXHR, Status) {
        $notification.error("Error!", jqXHR.statusText, 2000, "fa fa-exclamation-circle");
        togglePublishCombBtn($this , false);
    });
}); 

//------------------------------------------------------------------
//#endregion #9
//------------------------------------------------------------------

 


//------------------------------------------------------------------
//#region #10  refresh Combinations table 
//------------------------------------------------------------------
window.$refreshCombinationsTable = function (newData){
     $('.combinations-table').find('tbody').html(' ');
     comb = 0;
     $.each(newData,function(index,row){
        appendTableRow(row,row.attributesvalues,true); 
     });
 }
//------------------------------------------------------------------
//#endregion #10
//------------------------------------------------------------------

 

//------------------------------------------------------------------
//#region #11   delete combination
//------------------------------------------------------------------

var emptyRowTemp = '<tr class="empty_row"><td colspan="7">'+                                    
"<div class='empty_table text-center'> <i class='fa fa fa-exclamation-circle'></i><p>No data available in table</p></div></td></tr>";

                             

$(document).on('click','.remove-combination',function(e){
    e.preventDefault();
    var $this = $(this);
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
            deleteCombination($this);
        }

    })
})

function deleteCombination($this){
    $.ajax({
        url: '/Admin/Products/combinations/delete',
        type: 'Get',
        dataType: "json",
        data: {
            productid : pid,
            combinationkey : $this.data('key'),
            sku : $this.data('sku'),
        }
    })
    .done(function(data){
        if(data.success){
            $notification.success("success", "", 2000, "fa fa-check");
            $this.parents('tr').remove();
            console.log($('.combinations-table tbody tr').length)
            if($('.combinations-table tbody tr').length == 0 ){
                $('.combinations-table tbody').append(emptyRowTemp);
            }
        }else{
            $notification.error("Error!", "", 2000, "fa fa-exclamation-circle");
        }
    })
    .fail(function (jqXHR, Status) {
        $notification.error("Error!", jqXHR.statusText, 2000, "fa fa-exclamation-circle");
    });
}

 


//------------------------------------------------------------------
//#endregion #11
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #12
//------------------------------------------------------------------
//------------------------------------------------------------------
//#endregion #12
//------------------------------------------------------------------



//------------------------------------------------------------------
//#region #13
//------------------------------------------------------------------
//------------------------------------------------------------------
//#endregion #13
//------------------------------------------------------------------

 
 

 //-- end --
});