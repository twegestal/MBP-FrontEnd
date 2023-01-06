var list
var index
$('document').ready(function() {
    $('#load-more').click(loadMoreUnicorns())
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/'
    }).done(function(result) {
        list = result;
        let max = Math.max(result.length-4, 0)
        for (index = result.length-1; index >= max; index--) {
            addTemplate(result[index]['id'])
        }
    }).fail(function(jqXHR, textStatus, error){
        let template = `
            <h2>Looks like there are no unicorns here </h2>
        `
        $('#unicorn-container').append(template)
    })
})

function loadMoreUnicorns() {
    return function() {
        let max = Math.max(index-4, 0)
        for(; index > max; index--) {
            addTemplate(list[index]['id'])
        }
    }
}

function addTemplate(i) {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/' + i
    }).done(function(result) {
        let template = `
        <div id="${result['id']}"class="unicorn-container-box">
            <div class="unicorn-picture">
                <img src="${result['image']}" alt="Image not found">
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
        $('#unicorn-container').append(template)
        let ID = '#' + result['id']
        $(ID).click(openSpecific(result['id']))
    }).fail(function(jqXHR, textStatus, error){
        let template = `
        <div class="unicorn-container-box">
            <div class="unicorn-picture">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/404UnicornNotFound.svg" alt="Image not found">
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
        $('#unicorn-container').append(template)
    })
} 

function openSpecific(id) {
    return function() {
        localStorage.setItem('specificID', id)
        document.location = '/Main/Spottedunicorn/Specificunicorn/specificUnicorn.html'
    }
}
