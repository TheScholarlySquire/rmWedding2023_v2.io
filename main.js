/********************** RSVP **********************/
function showTextInput() {
  document.getElementById("plus_one").style.display = "block";
}

function hideTextInput() {
  document.getElementById("plus_one").style.display = "none";
}
function showGuestInput() {
  document.getElementById("guest_input").style.display = "block";
}

function hideGuestInput() {
  document.getElementById("guest_input").style.display = "none";
}


$('#rsvp-form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();

    $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));

    if (MD5($('#invite_code').val()) !== 'b0e53b10c1f55ede516b240036b88f40'
        && MD5($('#invite_code').val()) !== '2ac7f43695eb0479d5846bb38eec59cc') {
        $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> Your invite code is incorrect.'));
    } else {
        $.post('https://script.google.com/macros/s/AKfycbzUqz44wOat0DiGjRV1gUnRf4HRqlRARWggjvHKWvqniP7eVDG-/exec', data)
            .done(function (data) {
                console.log(data);
                if (data.result === "error") {
                    $('#alert-wrapper').html(alert_markup('danger', data.message));
                } else {
                    $('#alert-wrapper').html('');
                    $('#rsvp-modal').modal('show');
                }
            })
            .fail(function (data) {
                console.log(data);
                $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server. '));
            });
    }
});

// alert_markup
function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}