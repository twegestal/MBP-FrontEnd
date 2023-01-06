$('document').ready(function() {
    let message = localStorage.getItem('errorMessage')
    if (message) {
        $('#error').html(message)
    }
    localStorage.clear()
})