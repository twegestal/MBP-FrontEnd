$(document).ready(function() {
    $('#imageResult').attr('src', localStorage.getItem('image'))
    $('#unicornNameSearch').html(localStorage.getItem('name'))
    $('#searchDesc').html(localStorage.getItem('desc'))
    $('.fas fa-location').html(localStorage.getItem('whereName'))
    $('.fas fa-user').html(localStorage.getItem('reportedBy'))
    $('#addUnicorn').click(addToDatabase())
})


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

        $.ajax({
            method: 'POST',
            url: 'http://localhost:5008/v1/unicorns',
            data: JSON.stringify(data)
        }).done(function(){
            localStorage.clear()
            document.location = 'index.html'
        })

    }
}