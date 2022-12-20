/*
let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 2;

loadMoreBtn.onclick = () =>{
    let boxes = [...document.querySelectorAll('#wrapper .unicorn .unicorn-inläg')];
    for(var i = currentItem; i < currentItem + 2; i++){
        boxes[i].style.display = 'inline-block';
    }
    currentItem +=2;

    if(currentItemn >= boxes.length){
        loadMoreBtn.style.display == 'none';
    }
}
*/


/*var unicorninläg = document.
querySelectorAll('.unicorn-inläg');
var btn = document.querySelector('#load-more');

var currentunicorn = 4
btn.addEventListener('click',
function() {
    for (var i = currentunicorn; i <
    currentunicorn + 4; i++) {
        if(unicorninläg[i]) {
            unicorninläg[i].style.display = 'block';

        }
    }

    currentunicorn += 4;
    if(currentunicorn >= unicorninläg.length){
        event.target.style.display='none'
    }
}
)*/

function postUnicorn() {
    return function() {
        let data = {};
        data.color = $('#searchUnicorn-form input[name=color]').val()
        data.horn = $('#searchUnicorn-form input[name=horn]').val()
        data.size = $('#searchUnicorn-form input[name=behaviour]').val()
        data.lat = $('#searchUnicorn-form input[name=fa-longitude]').val()
        data.long = $('#searchUnicorn-form input[name=fa-latitude]').val()
        console.log(data)
        $.ajax({
            method: "POST",
            url: 'http://localhost:5008',
            data: JSON.stringify(data)
        })
        .done(function(result){
            let url = result ['image']
            let description = result['description']
            let name = result['name']
            console.log(name)
        })
    }
}

function getAll() {
    return function() {
        $.ajax({
            url: 'http://localhost:5008/v1/unicorns/'
        })
        .done(function(data) {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]['id'])
            }
        });
    }
}

$("document").ready(function(){
    $('#searchUnicorn-form').submit(postUnicorn());
    $('#load-more').submit(getAll());
 });
