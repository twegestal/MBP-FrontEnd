/**
 * Fetches a list of the four last unicorns and adds eventlisteners.
 */
$(document).ready(function() {
    $('#logo').click(function() {
        document.location = '/Main/index.html'
    })
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/'
    }).done(function(result) {
        let max = Math.max(result.length-4, 0)
        for (let i = result.length-1; i >= max; i--) {
            appendAll(result[i]['id'])
        }
    }).fail(function(jqXHR, textStatus, error){
        let template = `
            <h2>Inga enhörningar att visa</h2>
        `
        $('#unicorn-container').append(template)
    })
})
/**
 * Fetches a specific unicorn and builds a html element with its information
 * @param {*} i Integer representing the specific id
 */
function appendAll(i) {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/' + i
    }).done(function(result) {
        let template = `
        <div id="${result['id']}"class="unicornPost">
            <div class="unicorn-picture">
                <img src="${result['image']}" alt="unicorn">
            </div>
            <div class="unicorn-heading">
                <h3>${result['name']}</h3>
            </div>
            <div class="unicorn-description">
                <p>${result['description']}</p>
            </div>
            <div class="icons">
                <span> <i class="fas fa-location"></i>${result['spottedWhere']['name']}</span>
                <span> <i class="fas fa-user"></i>${result['reportedBy']}</span>
            </div>
        </div>`
        $('#unicorn').append(template)
        let ID = '#' + result['id']
        $(ID).click(openSpecific(result['id']))
    }).fail(function(jqXHR, textStatus, error){
        let template = `
        <div class="unicorn-container-box">
            <div class="unicorn-picture">
                <img src="" alt="Image not found">
            </div>
            <div class="unicorn-heading">
                <h3>Unicorn not found</h3>
            </div>
            <div class="unicorn-description">
                <p>Looks like there's nothing here</p>

            </div>
            <div class="icons">
                <span> <i class="fas fa-location"></i>Unknown</span>
                <span> <i class="fas fa-user"></i>Unknown</span>
            </div>
        </div>`
        $('#unicorn').append(template)
    })
}
/**
 * Called when a unicorn div is pressed, adds the current id to localstorage and redirects to specificUnicorn.html
 * @param {*} id Integer representing the id of the pressed div on the page
 */
function openSpecific(id) {
    return function() {
        localStorage.setItem('specificID', id)
        document.location = '/Main/Spottedunicorn/Specificunicorn/specificUnicorn.html'
    }
}
