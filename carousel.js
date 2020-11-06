let container = document.getElementsByClassName('carousel')[0]
let images = container.querySelector('.carousel-images')
let items = images.children
let length = items.length
var current = -1

for(let i in items) {
    if(items[i].classList.contains('active')) {
        current = i
        break
    }
}

function nextCarousel(){
    let next = (current + 1) % length
    items[current].classList.remove('active')
    items[next].classList.add('active')
    current = next
}

function prevCarousel(){
    let prev = (current - 1 + length) % length
    items[current].classList.remove('active')
    items[prev].classList.add('active')
    current = prev
}

function carouselChange(dir){
    if (dir === 'right'){
        nextCarousel()
    }else if (dir === 'left'){
        prevCarousel()
    }
}

function carouselChangeTo(){

}
