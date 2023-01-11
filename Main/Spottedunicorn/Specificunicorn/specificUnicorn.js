var id // current id of unicorn
const loaderCode = '<div class="center"><div class="ring"></div><span>Letar...</span></div>' //loader template

/**
 * fetches the id from localstorage and adds listeners
 */
$('document').ready(function() {
    id = localStorage.getItem('specificID')
    localStorage.removeItem('specificID')
    buildHTML()
    $('#addUnicorn').click(getMorePictures())
    $('#logo').click(function() {
        document.location = '/Main/index.html'
    })
})
function replace() {
    $('#imageResult').attr('src', '/Main/unicorn.png')
}
/**
 * Calls the API and fetches a unicorn with the specified id and builds the html page
 */
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
/**
 * Calls the api and fetches more two more pictures of the specified unicorn and adds them to the html page
 */
function getMorePictures() {
    return function() {
        $('#wrapper').append(loaderCode)
        $.ajax({
            url: 'http://localhost:5008/v1/unicorns/pictures/' + id
        }).done(function(result) {
            $('.center').remove()
            let template = `
            <div class="js-add">
                <img src="${result[0]['url']}" class="imageResult" alt="Bild hittades inte">
                <img src="${result[1]['url']}" class="imageResult" alt="Bild hittades inte">
            </div>
            `
            $('#cont').append(template)
        }).fail(function(jqXHR, textStatus, error) {
            $('.center').remove()
            let template = `
            <div class="js-add">
                <h4>Det finns tyvärr inga fler bilder på denna enhörning</h4>
            </div>
            `
            $('#cont').append(template)
            $('#add-button').remove()
        })   
    }
}