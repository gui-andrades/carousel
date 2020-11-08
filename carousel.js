let container = document.getElementsByClassName('carousel')[0]
let images = container.querySelector('.carousel-images')
let sideButtons = container.getElementsByTagName('a')
let indicators = container.querySelector('.carousel-indicators').children
let items = images.children
let length = items.length
let current = -1

for(let i in items) {
    if(items[i].classList.contains('active')) {
        current = i
        indicators[current].classList.add('active')
        break
    }
}

if (container.classList.contains('slide')){
    setInterval (nextCarousel, 4000)
}

if(sideButtons.length == 2){
    for(let i in sideButtons){
        if (sideButtons[i].classList.contains('carousel-btn-left')){
            var btnLeft = sideButtons[i]
            if(btnRight != undefined) {
                addCarouselEvents()
                break
            }
        }
        if (sideButtons[i].classList.contains('carousel-btn-right')){
            var btnRight = sideButtons[i]
            if(btnLeft != undefined) {
                addCarouselEvents()
                break
            }
        }
    }
}else{
    container.removeChild(sideButtons[0])
}

if(indicators.length == length){
    for(let i = 0; i < indicators.length; i++){
        indicators[i].addEventListener('click', () => {
            indicators[i].classList.add('active')
            indicators[current].classList.remove('active')
            items[i].classList.add('active')
            items[current].classList.remove('active')
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
