import isScroll from './isScroll';
import clickToggleClass from './clickToggleClass'
module.exports = (openClass, closeClass, viewClass) => {
    /////
    let open = document.querySelector('.' + openClass);
    let close = document.querySelector('.' + closeClass);
    let view = document.querySelector('.' + viewClass);
    if (open && close && view) {
        console.log('in fullMenu');
        // open.addEventListener('click', () => {
        //     // view.classList.add(viewClass + '--active');
        //     open.style.display = 'none';
        //     close.style.display = 'block'
        //     isScroll(false);
        // });
        // close.addEventListener('click', () => {
        //     // view.classList.remove(viewClass + '--active');
        //     open.style.display = 'block';
        //     close.style.display = 'none'
        //     isScroll(true);
        // });
        let fn = {
            before: function(){
                console.log('before')
                open.style.display = 'none';
                close.style.display = 'block'
                isScroll(false);
            },
            after: function(){
                console.log('after')
                open.style.display = 'block';
                close.style.display = 'none'
                isScroll(true);
            }
        };
        clickToggleClass(viewClass, openClass, fn.before)
        clickToggleClass(viewClass, closeClass, fn.after)
    }

};