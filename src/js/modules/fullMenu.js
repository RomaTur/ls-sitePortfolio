import isScroll from './isScroll';
import clickToggleClass from './clickToggleClass'
module.exports = (buttonClass, viewClass) => {
    /////
    let view = document.querySelector('.' + viewClass);
    if (view) {
        console.log('in fullMenu');
        clickToggleClass(viewClass, buttonClass);
        clickToggleClass(buttonClass, buttonClass);
        // open.addEventListener('click', () => {
        //     view.classList.add(viewClass + '--active');
        //     open.style.display = 'none';
        //     close.style.display = 'block'
        //     isScroll(false);
        // });
        // let fn = {
        //     before: function(){
        //         open.style.display = 'none';
        //         close.style.display = 'block'
        //         isScroll(false);
        //     },
        //     after: function(){
        //         open.style.display = 'block';
        //         close.style.display = 'none'
        //         isScroll(true);
        //     }
        // };
        // clickToggleClass(viewClass, openClass, fn.before)
        // clickToggleClass(viewClass, closeClass, fn.after)
    }
    // clickToggleClass('hamburger', 'hamburger');
};