$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/'
    }).done(function(result) {
        appendPost(result[0]['id'])
        for (let i = 1; i < result.length; i++) {
            appendAll(result[i]['id'])
        }
    })
})


function appendPost(i) {
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/' + i
    }).done(function(result) {
       $('#postImg').attr('src', result['image'])
       $('#postName').html(result['name'])
       $('#postDesc').html(result['description'])

    })
}

function appendAll(i) {
    let source = document.getElementById("test"),
    destination = document.getElementById("unicorn");
    let evilclone = source.cloneNode(true);
    evilclone.removeAttribute("id");
    $.ajax({
        url: 'http://localhost:5008/v1/unicorns/' + i
    }).done(function(result) {
        let kids = evilclone.childNodes
        let img = kids[1].childNodes[1]
        img.setAttribute('src', result['image'])
        kids[3].childNodes[1].innerHTML = result['name']
        kids[5].childNodes[1].innerHTML = result['description']
    

    })
    destination.appendChild(evilclone);
}
