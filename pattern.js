$(document).ready(function() {
    $('#imageResult').attr('src', localStorage.getItem('image'))
    $('#unicornNameSearch').html(localStorage.getItem('name'))
    $('#searchDesc').html(localStorage.getItem('desc'))
})