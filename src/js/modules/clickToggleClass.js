module.exports = (elemClass, buttonClass, fn) => {
    ////////////
    let elem = document.querySelector('.' + elemClass)
    let button = document.querySelector('.' + buttonClass)
    let containerToggle = () => {
        fn()
        elem.classList.toggle(elemClass + '--active');
    };
    if (elem && button) {
        console.log('in clickToggleClass');
        button.addEventListener('click', containerToggle);
    }
    ///////////////

};