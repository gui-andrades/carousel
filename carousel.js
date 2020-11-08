let container = document.getElementsByClassName('carousel')[0]
let images = container.querySelector('.carousel-images')
let sideButtons = container.getElementsByTagName('a')
let indicators = container.querySelector('.carousel-indicators').children
let items = images.children
let length = items.length
let current = -1
let slideInterval = null

for(let i in items) {
    if(items[i].classList.contains('active')) {
        current = i
        break
    }
}

if (container.classList.contains('slide')){
    slideInterval = setInterval(nextCarousel, 4000)
    container.addEventListener('mouseenter', () => {
        clearInterval(slideInterval)
    })
    container.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextCarousel, 4000)
    })
}

if(sideButtons.length == 2){
    var btnLeft = container.querySelector('.carousel-btn-left')
    var btnRight = container.querySelector('.carousel-btn-right')
    addCarouselEvents()
}else{
    container.removeChild(sideButtons[0])
}

if(indicators.length == length){
    indicators[current].classList.add('active')
    for(let i = 0; i < length; i++){
        indicators[i].addEventListener('click', () => {
            setActive(i)
            current = i
        })
    }
}else{
    container.querySelector('.carousel-indicators').remove()
    indicators = null
}

function setActive(n){
    items[current].classList.remove('active')
    items[n].classList.add('active')
    if(indicators){
        indicators[current].classList.remove('active')
        indicators[n].classList.add('active')
    }
}

function addCarouselEvents(){
    btnLeft.addEventListener('click', prevCarousel)
    btnRight.addEventListener('click', nextCarousel)
}


function nextCarousel(){
    let next = (current + 1) % length
    setActive(next)
    current = next
}

function prevCarousel(){
    let prev = (current - 1 + length) % length
    setActive(prev)
    current = prev
}
