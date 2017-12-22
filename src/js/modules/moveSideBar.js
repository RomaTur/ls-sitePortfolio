
module.exports = (sideBarElem) => {
    ///////////////////
    console.log('in moveSideBar')


            let sideBarOffset = sideBarElem.offsetTop;
            let sideBarPos = window.getComputedStyle(sideBarElem).position;
            
            window.onscroll = function () {
                let scrollTopDoc = window.scrollY + 100;
                let moveSideBarVal = scrollTopDoc - sideBarOffset;
                if (moveSideBarVal >= 0 && sideBarPos === 'relative') {
                    sideBarElem.style.top = moveSideBarVal + 'px';
                }
            };
};