module.exports = () => {
    ///////////////
    console.log('in blurForm')
    let fn = (function(){
        let formContainer = document.querySelector('.form');
        let formBlur = document.querySelector('.form__blur');
        return {
            set: function () {
                let bgWidth = document.querySelector('.footer__bg-img').offsetWidth,
                    posLeft = -formContainer.offsetLeft,
                    posTop = -formContainer.offsetTop,
                    blurCSS = formBlur.style
                    blurCSS.backgroundSize = (bgWidth-(bgWidth*0.0833)) + 'px' + ' ' + 'auto'
                    blurCSS.backgroundPosition = (posLeft-posLeft*0.109) + 'px' + ' ' + (posTop-posTop*0.1178) + 'px'
                console.log(posLeft, posTop)
                console.log(bgWidth)
            }
        }
    }());

    fn.set();

    window.onresize = function(){
        fn.set();
    }
    //////////////
};