let container = document.getElementsByClassName('carousel')[0]
let items = container.querySelector('.carousel-images').children
let sideButtons = container.getElementsByTagName('a')
let indicators = container.querySelector('.carousel-indicators').children
let length = items.length
let current

for(let i = 0; i < length; i++) {
    items[i].classList.add('carousel-item')
    if(items[i].classList.contains('active')) {
        current = i
    }
}

if(container.classList.contains('slide')){
    slideInterval = setInterval(nextCarousel, 4000)
    container.addEventListener('mouseenter', () => {
        clearInterval(slideInterval)
    })
    container.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextCarousel, 4000)
    })
}

if(sideButtons.length == 2){
    sideButtons[0].addEventListener('click', prevCarousel)
    sideButtons[0].classList.add('carousel-btn-left')
    sideButtons[1].addEventListener('click', nextCarousel)
    sideButtons[1].classList.add('carousel-btn-right')
}else{
    while(sideButtons.length > 0){
        container.removeChild(sideButtons[0])
    }
    sideButtons = null
}

if(indicators.length == length){
    indicators[current].classList.add('active')
    for(let i = 0; i < length; i++){
        indicators[i].addEventListener('click', () => {
            setActive(i, '')
            current = i
        })
    }
}else{
    while(indicators.length > 0){
        container.removeChild(indicators[0])
    }
    sideButtons = null
}

function setActive(n, dir){
    if(n == current) return
    if(indicators){
        indicators[n].classList.add('active')
        indicators[current].classList.remove('active')
    }
    let prev = current
    if(dir == 'right'){
        toRight(prev, n)
    }else if(dir == 'left'){
        toLeft(prev, n)
    }else if(dir == ''){
        if(n < current){
            toRight(prev, n)
        }
        if(n > current){
            toLeft(prev, n)
        }
    }
    current = n
}

function toRight(prev, n){
    let timeR = 1
    let transInterval = setInterval(() => {
        items[current].style.left = `${timeR-100}%`
        items[current].classList.add('active')
        items[prev].style.left = `${timeR}%`
        if(timeR >= 100){
            clearStyle(prev)
            clearInterval(transInterval)
        }
        timeR++
    }, 5)
}

function toLeft(prev, n){
    let timeL = 99
    let transInterval = setInterval(() => {
        items[current].style.left = `${timeL}%`
        items[current].classList.add('active')
        items[prev].style.left = `${timeL-100}%`
        if(timeL <= 0){
            clearStyle(prev)
            clearInterval(transInterval)
        }
        timeL--
    }, 5)
}

function clearStyle(prev){
    items[current].removeAttribute('style')
    items[prev].removeAttribute('style')
    items[prev].classList.remove('active')
}

function nextCarousel(){
    let next = (current + 1) % length
    setActive(next, 'left')
}

function prevCarousel(){
    let prev = (current - 1 + length) % length
    setActive(prev, 'right')
}
