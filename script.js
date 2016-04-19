$(document).ready(function() {

    $("#beerList, #whiskeyList").sortable({
        connectWith: "#dropbox",       //setting connections
        change: highlight,             //highlighting items on dragging
        receive: removeFromDropbox     //sending ajax query
    });

    $("#dropbox").sortable({
        connectWith: "#beerList, #whiskeyList",
        change: highlight,
        receive: addToDropbox
    });

    function addToDropbox(event, ui) {
        var id = $(ui.item).attr('id'); //getting item's id
        $.ajax({                        //sending request to add id
            url: '/dropbox',
            type: 'POST',               
            data: {
                'id': id
            }                  //there is no .done() method because
        });                    //there is no server
    }

    function removeFromDropbox(event, ui) {
        var id = $(ui.item).attr('id');
        $.ajax({
            url: '/dropbox/' + id,
            type: 'DELETE',
            data: {
                'id': id
            }
        });
    }

    function highlight(event, ui) {  //highlight place for dragged item
        ui.placeholder.css({ visibility: 'visible', backgroundColor: '#e6f9ff' });
    }

    $('#drinks>li>ul>li').on('mousedown', function() {
        $(this).css({
            'background-color': '#DDD'  //changing color of dragged item
        });
    }).on('mouseup', function() {
        $(this).css({
            'background-color': ''
        });
    });
});
