module.exports = (elemClass, fn) => {

    ////////////

    let elem = document.querySelector('.' + elemClass);
    let checkDistance = (scrollTop, elem) => {
        let offset = elem.offsetTop;
        let windowMargin = Math.ceil(window.innerHeight / 2);
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
        
        window.onscroll = function(){
            let scrollTop = window.scrollY;
            if (checkDistance(scrollTop, elem).top <= 0 && !fnDone && checkDistance(scrollTop, elem).bottom <= 0) {
                console.log('in doFnElemVisible');
                fn();
                fnDone = true;
            }

        };
    }
    /////////////

};