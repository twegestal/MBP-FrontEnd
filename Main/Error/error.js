/**
 * Changes text to display recieved error message if one exists.
 */
$('document').ready(function() {
    let message = localStorage.getItem('errorMessage')
    if (message) {
        $('#error').html(message)
    }
    localStorage.clear()
})