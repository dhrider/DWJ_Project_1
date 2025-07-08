const iconMobile = document.querySelector('.header-menu-icon')
const headerMenu = document.querySelector('.header-menu')
let isMenuOpen = false
let mobileMenuDOM

const toggleMobileMenu = () => {
    if (isMenuOpen) {
        closeMenu()
    } else {
        openMenu()
    }
    isMenuOpen = !isMenuOpen
}

iconMobile.addEventListener('click', e => {
    e.stopPropagation()
    toggleMobileMenu()
})

const createMobileMenu = () => {
    mobileMenuDOM = document.createElement('div')
    mobileMenuDOM.classList.add('mobile-menu')
    mobileMenuDOM.addEventListener('click', e => {
        e.stopPropagation()
    })
    mobileMenuDOM.append(headerMenu.querySelector('ul').cloneNode(true))
    headerMenu.append(mobileMenuDOM)
}


const closeMenu = () => {
    mobileMenuDOM.classList.remove('open')
}

const openMenu = () => {
    if (mobileMenuDOM) {

    } else {
        createMobileMenu()
    }
    mobileMenuDOM.classList.add('open')
}

window.addEventListener('click', {
    if (isMenuOpen) {
        toggleMobileMenu()
    }
})

window.addEventListener('resize', e => {
    if (window.innerWidth > 480 && isMenuOpen) {
        toggleMobileMenu()
    }
})
