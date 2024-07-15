jQuery(document).ready(function ($) {
    //open popup
    $('.cd-popup-trigger').on('click', function (event) {
        event.preventDefault();
        // $('body').append($('<div> asdfasd <div/>', {
        //     id: 'holdy'
        // }));
        var id = $(this).attr('id');
        console.log(id)
        // $(this).parent().append($('<div>' + id +
        //     '<div/>', {
        //     id: 'holdy'
        // }));
        $(this).parent().append($(
            '<div class= "cd-popup" role = "alert" >' +
            '<div class="cd-popup-container">' +
            '<p>Are you sure you want to delete UserID: ' +
            id +
            '?</p > ' +
            '<ul class="cd-buttons">' +
            '<li><a href="/users/delete/' + id + '">Yes</a></li>' +
            '<li><a href="#0">No</a></li>' +
            '</ul>' +
            '<a href="#0" class="cd-popup-close img-replace">Close</a>' +
            '</div>' +
            '</div>'

            , {
                id: 'holdy'
            }));



        $('.cd-popup').addClass('is-visible');
    });

    //close popup
    $('.cd-popup').on('click', function (event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
            console.log("Clicked close")
            event.preventDefault();
            $(this).removeClass('is-visible');
            $(this).remove();
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup').removeClass('is-visible');
        }
    });
});