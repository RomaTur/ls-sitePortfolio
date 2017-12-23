module.exports = (elemClass, fn, divider = 2, loop = false) => {

    ////////////
    // console.log(elemClass)
    let elem = document.querySelector('.' + elemClass);
    if(!elem) elem = document.querySelector('#' + elemClass);
    let checkDistance = (scrollTop, elem) => {
        let offset = elem.offsetTop;
        let windowMargin = Math.ceil(window.innerHeight / divider);
        let topBorder = offset - scrollTop - windowMargin;
        let bottomEdge = elem.clientHeight + offset;
        let bottomBorder = scrollTop + windowMargin - bottomEdge;
        return {
            top: topBorder,
            bottom: bottomBorder
        }
    };
    let fnDone = false;
    if (elem) {
        
        window.addEventListener('scroll', function(){
            let scrollTop = window.scrollY;
            if (checkDistance(scrollTop, elem).top <= 0 && !fnDone && checkDistance(scrollTop, elem).bottom <= 0) {
                // console.log('in doFnElemVisible');
                fn();
                (loop) ? fnDone = false : fnDone = true
            }

        });
    }
    /////////////

};