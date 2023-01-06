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
    })
})

function loadMoreUnicorns() {
    return function() {
        let max = Math.max(index-4, 0)
        for(; index >= max; index--) {
            addTemplate(list[index]['id'])
        }
    }
}

function addTemplate(i) {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/' + i
    }).done(function(result) {
        let template = `
        <div class="unicorn-container-box" style="display: block;>
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
        
    })
} 
