var list //the list of unicorns
var index //keeps track of shown unicorns

/**
 * Makes an API call and fetches the full list of unicorns.
 * Fills the page with the last four unicorns in the list.
 * Adds eventlisteners for loadmore button.
 */
$('document').ready(function() {
    $('#load-more').click(loadMoreUnicorns())
    $('#logo').click(function() {
        document.location = '/Main/index.html'
    })
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/'
    }).done(function(result) {
        list = result;
        let max = Math.max(result.length-5, 0)
        for (index = result.length-1; index > max; index--) {
            addTemplate(result[index]['id'])
        }
        if (index === 0) {
            $('#load-more').remove()
        }
    }).fail(function(jqXHR, textStatus, error) {
        let template = `
            <h4>Inga enhörningar att visa</h4>
        `
        $('#unicorn-container').append(template)
        $('#load-more').remove()
    })
})
/**
 * Adds four more unicorns to the html page. 
 */
function loadMoreUnicorns() {
    return function() {
        let max = Math.max(index-4, 0)
        for(; index > max; index--) {
            addTemplate(list[index]['id'])
        }
        if (index === 0) {
            $('#load-more').remove()
        }
    }
}
function replace(i) {
    let s = '#u' + i
    $(s).attr('src', '/Main/unicorn.png')
}
/**
 * Fetches one unicorn from the database and adds it to the html page.
 * @param {*} i The id for the unicorn to be fetched from the API and added to the html page
 */
function addTemplate(i) {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/' + i
    }).done(function(result) {
        let template = `
        <div id="${result['id']}"class="unicorn-container-box">
            <div class="unicorn-picture">
            <img id=u${result['id']} src="${result['image']}" onerror=replace(${result['id']})>
                <div class="icons">
                    <span> <i class="fas fa-location"></i>${result['spottedWhere']['name']}</span>
                    <span> <i class="fas fa-user"></i>${result['reportedBy']}</span>
                </div>
            </div>
            <div class="unicorn-heading">
                <h3>${result['name']}</h3>
            </div>
            <div class="unicorn-description">
                <p>${result['description']}</p>

            </div>
        </div>`
        $('#unicorn-container').append(template)
        let ID = '#' + result['id']
        $(ID).click(openSpecific(result['id']))
    }).fail(function(jqXHR, textStatus, error) {
        let template = `
        <div class="unicorn-container-box">
            <div class="unicorn-picture">
                <img src="" alt="Image not found">
                <div class="icons">
                    <span> <i class="fas fa-location"></i>Unknown</span>
                    <span> <i class="fas fa-user"></i>Unknown</span>
                </div>
            </div>
            <div class="unicorn-heading">
                <h3>Unicorn not found</h3>
            </div>
            <div class="unicorn-description">
                <p>Looks like there's nothing here</p>

            </div>
        </div>`
        $('#unicorn-container').append(template)
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
