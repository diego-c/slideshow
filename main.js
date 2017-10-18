let imgs = document.querySelectorAll('div#slideshow-wrapper > img');
let current = 0;
let btnLeft = document.querySelector('#controls > i.fa-angle-left');
let btnRight = document.querySelector('#controls > i.fa-angle-right');

function displayInline(c) {
    imgs[c].style.display = 'inline';
}
function displayNone(c) {
    imgs[c].style.display = 'none';
}

// TODO: test with js animations instead of css classes
btnLeft.addEventListener('click', () => {

    return new Promise((resolve, reject) => {
        imgs[current].addEventListener('animationend', displayNone.call(null, current));
        imgs[current].classList.add('slideLeft'); 
        resolve(current)
    })
    .then(c => {
        let first = c;
        c--;
        if (c < 0) {
        c = imgs.length - 1;        
        }
        imgs[c].addEventListener('animationstart', displayInline.call(null, c));
        imgs[c].classList.add('appearRight');
        return [first, c];
    })
    .then(args => {
        imgs[args[0]].removeEventListener('animationend', displayNone.call(null, args[0]));
        imgs[args[1]].removeEventListener('animationstart', displayInline.call(null, args[1]));
    })   
})

btnRight.addEventListener('click', () => {
    imgs[current].classList.add('slideRight');
    current++;
    if (current > imgs.length - 1) {
        current = 0;
    }
    imgs[current].classList.add('appearLeft');
})
