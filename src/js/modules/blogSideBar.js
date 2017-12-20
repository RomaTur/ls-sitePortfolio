import clickToggleClass from './clickToggleClass'

module.exports = (sideBarClass, buttonClass) => {
    ////////////
    let sideBar = document.querySelector('.' + sideBarClass)
    let button = document.querySelector('.' + buttonClass)
    if (sideBar && button) {
        ////////////
        console.log('in blogSideBar')
        clickToggleClass(sideBarClass, buttonClass);
        ////////////
    }

    ////////////
};