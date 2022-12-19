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


var unicorninläg = document.
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
)
