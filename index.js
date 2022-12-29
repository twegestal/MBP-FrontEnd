$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/'
    }).done(function(result) {
        getKids(result)
    })
})

function getKids(result) {
    let kids = $('#unicorn').children()
    console.log(kids)
    let num = Math.min(4, result.length)
    for (let i = 0; i < num; i++) {
        getID(result[i]['id'], i, kids)
    }
}


function getID(index,i, kids) {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/' + index,
        success: function(result) {
            console.log(result)
            kids[i].children[0].children.attr('src', result['image'])
            kids[i].children[1].children.html(result['name'])
            kids[i].children[2].children.html(result['description'])
            kids[i].children[3].children[0].html(result['spottedWhere']['name'])
            kids[i].children[3].children[1].html(result['reportedBy'])
        }
    })
}
    


    
