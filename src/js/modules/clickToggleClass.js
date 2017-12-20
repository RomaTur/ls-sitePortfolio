module.exports = (elemClass, buttonClass) => {
    ////////////
    let elem = document.querySelector('.' + elemClass)
    let button = document.querySelector('.' + buttonClass)
    let containerToggle = () => {
        elem.classList.toggle(elemClass + '--active');
    };
    if (elem && button) {
        console.log('in clickToggleClass');
        button.addEventListener('click', containerToggle);
    }
    ///////////////

};