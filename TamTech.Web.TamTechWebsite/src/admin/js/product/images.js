$(document).ready(function () {

var imgTemplate =
'<div class="col-md-55 animated zoomIn duration-300" >'+
'<figure class="imgbox imgnew" id="preview-@@">'+
'<a href="#" class="remove-btn" id="removeimage"><i class="fa fa-times"></i></a>'+
'<input type="checkbox" class="ignore" id="thumb-checkbox" />'+
'<div class="thumbnail">'+
'<img src="" alt="" id="imagePreview-@@"  /></div><i  class="fa fa-upload" ></i></figure></div>';
//-----------------------------------------------------------------
//--- Images  ------------------------------------------
//-----------------------------------------------------------------



function  removeImages(ids,urls,callback){
     
    $.ajax({
        url: '/admin/Products/images/delete',
            type: 'POST',
            dataType: "json",
            cache: false,
            data:{ images  : urls , ProductId  : pid }
        })
        .done(function (data) {
            $notification.success("success", "", 2000, "fa fa-check");
            if(callback && typeof(callback) == 'function') 
                callback(ids, data)
        })

        .fail(function (jqXHR, Status) {
            $notification.error("Error", jqXHR.statusText, 2000, "fa fa-exclamation-circle")
        });

     
}
// remove image

$(document).on('click','#removeimage', function(){
    var urls = [] , ids = [];
    var $parent =$(this).parent();
    var id = $parent.attr('id');
    var $img = $parent.find('img');
    
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
            
            if(!$parent.hasClass('imgnew')){
                ids.push(id);
                urls.push($img.attr('src'));
                removeImages(ids,urls ,function(itemsId,data){
                      $('.imgbox[id="'+id+'"]').parent().remove();
                });
            } else{
                var _id = parseInt(id.split("-")[1]);
                $parent.parent().remove();
                $('#inputsfiles input[id="input-'+_id+'"]').remove();
                if(_id < $index - 1){
                    reorderItems();
                }
                $index--;
            }
        }
    })


    
})
var $index = 0;
var thumbId = [];
var oldimagesCount = 0;


function reorderItems(){
    $('.imgnew').each(function(index ,item ){
        var $img = $(item).find('img');
        $(item).attr('id','preview-'+index)
        $img.attr('id','imagePreview-'+index);
    })
    $('#inputsfiles input').each(function(i,itm){
        $(itm).attr('id',"input-"+ i).attr('name', 'Files['+ i +']');
    })
}

function removePreview(id){
    $('#'+id).parent().remove();
    var it = parseInt( id.split('-')[1]); 
    $('#inputsfiles').find('#input-'+it).remove();
    if(it < $index){
        reorderItems()
    }
    $index--;
}


function removeServerImg(id , urls ,ids){
    
    ids.push(id)
    urls.push( $('#img-'+id).attr('src') )
    
 
    if(urls.length  == oldimagesCount ){
        removeImages(ids,urls ,function(itemsId,data){
            $.each(ids ,function(x,i){
                     $('.imgbox[id="'+i+'"]').parent().remove();
            })
      });
    }
}

function removeSelected(){
    var deferred = new $.Deferred();
    var urls = [] , ids = [] , indxs=0;
    if(thumbId.length > 0){
        
        $.each(thumbId,function(i,id){
            if(isNaN(id)){
                removePreview(id);
            }else{
                indxs++;
                removeServerImg(id , urls ,ids)
            }
            if(thumbId.length - 1  ==  i)
                deferred.resolve(true);
        });
    }
    return deferred.promise();
}


$('#removeImages').click(function(){
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


            removeSelected().then(function(status){
                thumbId = [];
                oldimagesCount =0;
                 $('#removeImages').addClass('hidden');
            })
        }
    })
})
 
//-------------------------------------------------------------------------
//---- select images to be removed----------------------------------------- 
//-------------------------------------------------------------------------
$(document).on('change','input[id^="thumb-checkbox-"]', function () {
    var $el = $(this);
    var id = $el.parent().attr('id');
    if($el.is(":checked")){
            thumbId.push(id)
        if(thumbId.length == 1 )
            $('#removeImages').removeClass('hidden');
        if(!isNaN(id))
            oldimagesCount++;
    }else{
            thumbId.splice( thumbId.indexOf(id) , 1);
        if(thumbId.length <= 0)
            $('#removeImages').addClass('hidden');
        if(!isNaN(id))
            oldimagesCount--;
    }
})

$(document).on('change','#addImages', function () {
    var $el = $(this);
    $clone = $el.clone();
     if(this.files && this.files[0]){
        $clone.attr('id' , 'input-'+$index ).attr('name', 'Files['+ $index +']').removeClass();
        $clone.appendTo('#inputsfiles');
        var reader = new FileReader();
        reader.onload = function (e) {
            var temp =  imgTemplate.replace(/@@/g,$index)
            $(temp).appendTo('.images-zone');
            $('#imagePreview-'+$index).attr('src', e.target.result);
            $index++;
        };
        reader.readAsDataURL(this.files[0]);
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
    }
})


 
//-- end --
});