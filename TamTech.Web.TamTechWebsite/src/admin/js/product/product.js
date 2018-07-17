


 




window.substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};


function autocomplete(itm) {
    $(itm).typeahead(t_settings, {
        name: 'Key-' + idx,
        limit: 10,
        source: substringMatcher(hints)
    });
}



var t_settings = {
    hint: false,
    highlight: true,
    classNames: {
        menu: "dropdown-menu suggestion-list",
        suggestion: "suggestion-item"
    }
}


$(document).ready(function () {
    //-----------------------------------------------------------------
    //--- LoadHints ------------------------------------------
    //-----------------------------------------------------------------

    $.getJSON("/admin/Products/LoadHints", function (response) {
        hints = response.data;
        autocomplete('.typeahead');
    })

    
    //-----------------------------------------------------------------
    //--- Shipping  ------------------------------------------
    //-----------------------------------------------------------------
    $('#Shipping').on('change', function () {

        if ($(this).is(":checked")) {
            $('#IsFreeShipping').prop('disabled', false);
            $('.shipping_inputs input').each((indx, itm) => $(itm).prop('disabled', false));
        } else {
            $('#IsFreeShipping').prop('disabled', true).prop('checked', false);
            $('.shipping_inputs input').each((indx, itm) => $(itm).prop('disabled', true).val(0));
        }

    })
    //-----------------------------------------------------------------
    //--- select picker  ------------------------------------------
    //-----------------------------------------------------------------

   
 

$('#publish_product').on('change',function(e){
    var $this = $(this);
    

    $.get('/Admin/Products/Publish/'+ pid)
    .done(function (res){
        if(res.success){
            if($this.is(":checked")){
                $notification.success("", "Published successfully", 2000, "fa fa-check");
            }else{
                $notification.warning("", "Unpublished successfully", 2000, "fa fa-check");
            }
        }
    })
    .fail(function (jqXHR, Status) {
        $notification.error("Error!", jqXHR.statusText, 2000, "fa fa-exclamation-circle");
    })
});



    $(document).on('click','.delete-product' ,function(e){
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
                 
                
                $.ajax({
                    url: '/Admin/Products/delete/'+ pid ,
                    type: 'Get',
                    dataType: "json",  
                    data: {
                        redirection : true
                    }
                })
                .done(function(data){
                    if(data.success){
                        $notification.success("", "Published successfully", 2000, "fa fa-check");
                        window.location.assign(window.location.origin + '/Admin/products');
                    }else{
                        $notification.error("Error!", "", 2000, "fa fa-exclamation-circle");
                    }
                   
                       
                 }
            ) .fail(function (jqXHR, Status) {
                $notification.error("Error!", jqXHR.statusText, 2000, "fa fa-exclamation-circle");
            })
               
            }
        })
    })

}) // end document ready fn