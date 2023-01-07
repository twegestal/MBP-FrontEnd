/**
 * Fetches and updates html elements with results from API call after search
 */
$(document).ready(function() {
    $('#imageResult').attr('src', localStorage.getItem('image'))
    $('#unicornNameSearch').html(localStorage.getItem('name'))
    $('#searchDesc').html(localStorage.getItem('desc'))
    $('#location').html(localStorage.getItem('whereName'))
    $('#byWho').html(localStorage.getItem('reportedBy'))
    $('#addUnicorn').click(addToDatabase())
    $('#logo').click(function() {
        document.location = '/Main/index.html'
    })
})

/**
 * Makes an API call that adds the current unicorn to the database and clears the localstorage
 */
function addToDatabase() {
    return function() {
        let data = {}
        let spottedWhere = {}
        data['name'] = localStorage.getItem('name')
        data['image'] = localStorage.getItem('image')
        data['description'] = localStorage.getItem('desc')
        spottedWhere['name'] = localStorage.getItem('whereName')
        spottedWhere['lon'] = localStorage.getItem('lon')
        spottedWhere['lat'] = localStorage.getItem('lat')
        data['spottedWhere'] = spottedWhere
        data['reportedBy'] = localStorage.getItem('reportedBy')
        data['spottedWhen'] = localStorage.getItem('spottedWhen')
        localStorage.clear()
        $.ajax({
            method: 'POST',
            url: 'http://localhost:5008/v1/unicorns',
            data: JSON.stringify(data)
        }).done(function() {
            document.location = '/Main/index.html'
        }).fail(function(jqXHR, textStatus, error) {
            if (error) {
                alert(error)
            } else {
                alert('Internal Server Error')
            }
        })
    }
}