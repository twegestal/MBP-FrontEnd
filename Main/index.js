$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/'
    }).done(function(result) {
        let max = Math.max(result.length-4, 0)
        for (let i = result.length-1; i >= max; i--) {
            appendAll(result[i]['id'])
        }
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
    })
}

