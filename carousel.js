class Carousel{
    constructor(index){
        this.container = containers[index]
        this.items = this.container.querySelector('.carousel-images').children
        this.sideButtons = this.container.getElementsByTagName('a')
        this.indicators = this.container.querySelector('.carousel-indicators').children
        this.length = this.items.length
        this.current = -3
    }

    initItems(){
        for(let i = 0; i < this.length; i++) {
            this.items[i].classList.add('carousel-item')
            if(this.items[i].classList.contains('active')) {
                this.current = i
            }
        }
    }

    initSlide(){
        if(this.container.classList.contains('slide')){
            this.slideInterval = setInterval(this.nextCarousel, 4000)
            this.container.addEventListener('mouseenter', () => {
                clearInterval(this.slideInterval)
            })
            this.container.addEventListener('mouseleave', () => {
                this.slideInterval = setInterval(this.nextCarousel, 4000)
            })
        }
    }

    initSideButtons(){
        if(this.sideButtons.length == 2){
            this.sideButtons[0].addEventListener('click', () => {
                this.prevCarousel(this)
            })
            this.sideButtons[0].classList.add('carousel-btn-left')
            this.sideButtons[1].addEventListener('click', () => {
                this.nextCarousel(this)
            })
            this.sideButtons[1].classList.add('carousel-btn-right')
        }else{
            while(this.sideButtons.length > 0){
                this.container.removeChild(this.sideButtons[0])
            }
            this.sideButtons = null
        }
    }

    initIndicators(){
        let self = this
        if(this.indicators.length == this.length){
            this.indicators[this.current].classList.add('active')
            for(let i = 0; i < this.length; i++){
                this.indicators[i].addEventListener('click', () => {
                    this.setActive(i, '')
                    this.current = i
                })
            }
        }else{
            while(this.indicators.length > 0){
                this.container.removeChild(this.indicators[0])
            }
            this.sideButtons = null
        }
    }

    setActive(n, dir){
        if(n == this.current) return
        if(this.indicators){
            this.indicators[n].classList.add('active')
            this.indicators[this.current].classList.remove('active')
        }
        let prev = this.current
        if(dir == 'right'){
            this.toRight(prev, n)
        }else if(dir == 'left'){
            this.toLeft(prev, n)
        }else if(dir == ''){
            if(n < this.current){
                this.toRight(prev, n)
            }
            if(n > this.current){
                this.toLeft(prev, n)
            }
        }
        this.current = n
    }

    toRight(prev, n){
        let timeR = 1
        let transInterval = setInterval(() => {
            this.items[this.current].style.left = `${timeR-100}%`
            this.items[this.current].classList.add('active')
            this.items[prev].style.left = `${timeR}%`
            if(timeR >= 100){
                this.clearStyle(prev)
                clearInterval(transInterval)
            }
            timeR++
        }, 5)
    }

    toLeft(prev, n){
        let timeL = 99
        let transInterval = setInterval(() => {
            this.items[this.current].style.left = `${timeL}%`
            this.items[this.current].classList.add('active')
            this.items[prev].style.left = `${timeL-100}%`
            if(timeL <= 0){
                this.clearStyle(prev)
                clearInterval(transInterval)
            }
            timeL--
        }, 5)
    }

    clearStyle(prev){
        this.items[this.current].removeAttribute('style')
        this.items[prev].removeAttribute('style')
        this.items[prev].classList.remove('active')
    }

    nextCarousel(self){
        let next = (this.current + 1) % this.length
        self.setActive(next, 'left')
    }

    prevCarousel(self){
        let prev = (this.current - 1 + this.length) % this.length
        self.setActive(prev, 'right')
    }
}

let containers = document.getElementsByClassName('carousel')
let carousels = []

for(let init = 0; init < containers.length; init++){
    let carousel = new Carousel(init)
    carousel.initItems()
    carousel.initSlide()
    carousel.initSideButtons()
    carousel.initIndicators()
    carousels.push(carousel)
}
