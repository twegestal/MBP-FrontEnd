$('document').ready(function() {
    let id = localStorage.getItem('specificID')
    localStorage.clear
    buildHTML(id)
    $('#add-button').click(getMorePictures(id))
})

function buildHTML(id) {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/' + id
    }).done(function(result){
        $('#imageResult').attr('src', result['image'])
        $('#unicornNameSearch').html(result['name'])
        $('#searchDesc').html(result['description'])
        $('#location').html(result['spottedWhere']['name'])
        $('#byWho').html(result['reportedBy'])
    })
}

function getMorePictures(id) {
    return function() {
        $.ajax({
            url: 'http://localhost:5008/v1/unicorns/pictures/' + id
        }).done(function(result) {
            $('#cont').html('<img src="' + result[0]['url'] + '" id="imageResult" alt="Bild hittades inte">')
            $('#cont').html('<img src="' + result[1]['url'] + '" id="imageResult" alt="Bild hittades inte">')
            console.log(result)
        })
    }
}