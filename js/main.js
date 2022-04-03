const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const mobileScreen = window.matchMedia("(max-width: 500px)")
const greaterMobileScreen = window.matchMedia("(min-width: 500px)")

const filter = $('.filter')
const productFilter = $('.product-filter')

const headerBtn = $('.header-btn')
const headeClose = $('.header-menu-close')
const headerMenu = $('.header-menu')
const headerCart = $('.header-cart')
const cartContainer = $('.cart')
const cartBody = $('.cart-body')

const productSlide = $('.slider')
const productPrevBtn = $('.product-prev-btn')
const productNextBtn = $('.product-next-btn')
const productThumbItems = $$('.product-thumb-item')
const productMain = $('.product-slide')
const productItem = $$('.product-slide-item img')

const productFilterItem = $$('.product-filter-slide-item img')
const productFilterSlide = $('.product-filter-slide-inner')
const productFilterThumbItems = $$('.product-filter-thumb-item')
const filterPrevBtn = $('.product-filter-prev-btn')
const filterNextBtn = $('.product-filter-next-btn')

const productFilterItemWidth = productFilterItem[0].offsetWidth
const productItemWidth = productItem[0].offsetWidth
const closeProduct = $('.product-filter-close i')

let posistionX = 0
let indexSlide = 0

headerBtn.addEventListener('click', () => {
    filter.classList.add('show')
    headerMenu.style.transform = 'translateX(0)'
})

headeClose.addEventListener('click', () => {
    filter.classList.remove('show')
    headerMenu.style.transform = 'translateX(-100%)'
})

headerCart.addEventListener('click', () => {
    cartContainer.classList.toggle('show')
})

function handleAllSlider(key, item, itemWidth, itemSlide){
    if(key === 'next'){
        if(indexSlide >= item.length - 1) {
            indexSlide = item.length - 1      
            return
        }
        posistionX = posistionX - itemWidth
        itemSlide.style.transform = `translateX(${posistionX}px)`
        indexSlide++
    }
    else if(key === 'prev'){
        if(indexSlide <= 0) {
            indexSlide = 0
            return
        }
        posistionX = posistionX + itemWidth
        itemSlide.style.transform = `translateX(${posistionX}px)`
        indexSlide--
    }
}

function handlerSlider(key){
    handleAllSlider(key, productItem, productItemWidth, productSlide)
}

function handlerFilerSlider(key){
    handleAllSlider(key, productFilterItem, productFilterItem[0].offsetWidth, productFilterSlide)

}

function thumbSlide(){
    productThumbItems.forEach(item => {
        item.addEventListener('click', (e) =>{
            $('.product-thumb-item.active').classList.remove('active')
            item.classList.add('active')
            let dataIndex = e.target.dataset.index
            productSlide.style.transform = `translateX(${-1 * dataIndex * productItemWidth}px)`
        })
    })
}

function thumbFilterSlide(){
    productFilterThumbItems.forEach(item => {
        item.addEventListener('click', (e) => {
            let dataIndex = e.target.dataset.index
            productFilterSlide.style.transform = `translateX(${-1 * dataIndex * productFilterItem[0].offsetWidth}px)`
        })  
    }) 
}


function closeFilter(btn){
    btn.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.classList.remove('show')
    })
    productFilter.addEventListener('click', (e) => {
        if(e.target == e.currentTarget){
            e.target.classList.remove('show')
        }
    })

}

function mobileAction(mobileScreen){
    if(mobileScreen.matches){
        productNextBtn.addEventListener('click', () => {
            handlerSlider('next')
        })
        
        productPrevBtn.addEventListener('click', () => {
            handlerSlider('prev')
        })
    }
}

function desktopAction(desktopScreen){
    if(desktopScreen.matches){                
        productMain.addEventListener('click', () => {
            productFilter.classList.add('show')
        })
        filterPrevBtn.addEventListener('click', () => {
            handlerFilerSlider('prev')
        })
        
        filterNextBtn.addEventListener('click', () => {
            handlerFilerSlider('next')
        })
    }
    closeFilter(closeProduct)
}

let amountIndex = 0
let numberOfProduct = $('.number-of-product')
let amount = $('.amount')
let mul = $('.mul')
let total = $('.total')
const empty = $('.empty')
const cartProduct = $('.cart-product')
const cartButton = $('.cart-button')
const minusAmount = $('.minus i')
const plusAmount = $('.plus i')
const addCartBtn = $('.section-add-cart')
const cartRemove = $('.cart-delete img')

minusAmount.addEventListener('click', () => {
    amountIndex--
    if(amountIndex <= 0){
        amountIndex = 0
    }
    amount.innerText = `${amountIndex}`
})

plusAmount.addEventListener('click', () => {
    amountIndex++
    if(amountIndex > 20){
        amountIndex = 20
        alert('Maximum 20 ^^')
    }
    amount.innerText = `${amountIndex}`
})

function addEmpty(){
    empty.classList.add('show')
    cartProduct.classList.remove('show')
    cartButton.classList.remove('show')
}

function addFill() {
    cartContainer.classList.add('show')
    empty.classList.remove('show')
    cartProduct.classList.add('show')
    cartButton.classList.add('show')
}

addCartBtn.addEventListener('click', () => {
    if(amountIndex == 0){
        alert('At least 1 product')
    } else {
        mul.innerText = amountIndex
        total.innerText = `$${125 * amountIndex}.00`
        numberOfProduct.innerText = amountIndex
        addFill()
    }
})

cartRemove.addEventListener('click', (e) => {
    addEmpty()
})

cartButton.addEventListener('click', (e => {
    alert(`You bill is $${125 * amountIndex}! ^^`)
    numberOfProduct.innerText = ``
    addEmpty()
}))
function start(){
    mobileAction(mobileScreen)
    thumbSlide()
    thumbFilterSlide()
    desktopAction(greaterMobileScreen)
}

start()