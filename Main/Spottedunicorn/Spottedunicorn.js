var unicorninläg = document.
querySelectorAll('.unicorn-container-box');
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