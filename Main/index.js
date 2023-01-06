$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/'
    }).done(function(result) {
        let max = Math.max(result.length-4, 0)
        for (let i = result.length-1; i >= max; i--) {
            appendAll(result[i]['id'])
        }
    }).fail(function(jqXHR, textStatus, error){
        let template = `
            <h2>Looks like there are no unicorns here </h2>
        `
        $('#unicorn-container').append(template)
    })
})

function appendAll(i) {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/' + i
    }).done(function(result) {
        let template = `
        <div class="unicornPost">
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

