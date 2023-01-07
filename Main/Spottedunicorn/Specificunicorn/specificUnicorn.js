var id
const loaderCode = '<div class="center"><div class="ring"></div><span>Letar...</span></div>'
$('document').ready(function() {
    id = localStorage.getItem('specificID')
    localStorage.clear
    buildHTML()
    $('#add-button').click(getMorePictures())
})

function buildHTML() {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/' + id
    }).done(function(result){
        $('#imageResult').attr('src', result['image'])
        $('#unicornNameSearch').html(result['name'])
        $('#searchDesc').html(result['description'])
        $('#location').html(result['spottedWhere']['name'])
        $('#byWho').html(result['reportedBy'])
    }).fail(function(jqXHR, textStatus, error) {
        $('#imageResult').attr('src', "")
        $('#unicornNameSearch').html("Looks like this unicorn vanished")
        $('#searchDesc').html('Unfortunatly nothing to show here')
        $('#location').html('Unknown')
        $('#byWho').html('Unknown')
    })
}

function getMorePictures() {
    return function() {
        $('#wrapper').append(loaderCode)
        $.ajax({
            url: 'http://localhost:5008/v1/unicorns/pictures/' + id
        }).done(function(result) {
            $('.center').remove()
            let template = `
            <div class="container-box">
                <img src="${result[0]['url']}" class="imageResult" alt="Bild hittades inte">
                <img src="${result[1]['url']}" class="imageResult" alt="Bild hittades inte">
            </div>
            `
            $('#cont').append(template)
        }).fail(function(jqXHR, textStatus, error) {
            $('.center').remove()
            if (error) {
                alert(error)
            } else {
                alert('Internal Server Error')
            }
        })
        
    }
}