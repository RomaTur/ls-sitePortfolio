import clickToggleClass from './clickToggleClass'
import doFnElemVisible from './doFnElemVisible'
import jump from 'jump.js'

module.exports = (sideBarClass, buttonClass) => {
    ////////////
    let sideBar = document.querySelector('.' + sideBarClass)
    let button = document.querySelector('.' + buttonClass)
    let touchEvent = () => {
        var initialPoint;
        var finalPoint;
        document.addEventListener('touchstart', function(event) {
        // event.preventDefault();
        event.stopPropagation();
        initialPoint=event.changedTouches[0];
        }, false);
        document.addEventListener('touchend', function(event) {
        // event.preventDefault();
        event.stopPropagation();
        finalPoint=event.changedTouches[0];
        var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
        if (finalPoint.pageX < initialPoint.pageX){
        /*СВАЙП ВЛЕВО*/
            sideBar.classList.remove(sideBarClass+'--active')
        }
        else{
        /*СВАЙП ВПРАВО*/
            sideBar.classList.add(sideBarClass+'--active')
        }
        }
        else {
        if (finalPoint.pageY < initialPoint.pageY){
        /*СВАЙП ВВЕРХ*/}
        else{
        /*СВАЙП ВНИЗ*/}
        }
        }
        }, false);
    };

    let sideBarJumpFn = () => {
        console.log('in sideBarJumpFn')
        sideBar.addEventListener('click', (event) => {
            
            let anchorNum = event.target.getAttribute('href');
            if(anchorNum){
                anchorNum = anchorNum.slice(1);
                console.log(anchorNum)
                let targetArticle = document.querySelector('#article'+anchorNum);
                if(targetArticle){
                jump('#article'+anchorNum, {
                    duration: 1000,
                    offset: 0,
                    callback: undefined,
                    easing: easeInOutQuad,
                    a11y: false
                  })
                
                  sideBar.classList.remove(sideBarClass+'--active');
                
                }
            }
        });
    };



    if (sideBar && button) {
        ////////////
        console.log('in blogSideBar')
        let startLeftPos = button.style.left;
        button.style.left = -100 + 'px';

        let sideBarVisible = function(){
            button.style.left = startLeftPos;
            touchEvent();
        };

        clickToggleClass(sideBarClass, buttonClass);
        doFnElemVisible('articles', sideBarVisible)
        ////////////
        sideBarJumpFn();
    }

    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
      }
    ////////////
};