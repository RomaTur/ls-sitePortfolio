
module.exports = (sideBarElem) => {
    ///////////////////
    console.log('in moveSideBar')


            let sideBarOffset = sideBarElem.offsetTop;
            let sideBarPos = window.getComputedStyle(sideBarElem).position;
            // let sideBarItems = document.querySelectorAll('.article__item');
            // let articles = document.querySelectorAll('.article');
            // let sideBarLinks = [];
            // let offsetArticles = [];
            
            // sideBarItems.forEach(sideBarLink => {
            //     sideBarLinks.push(sideBarLink);
            // });
            // // for(let i = 0; i < sideBarLinks.length; i++){
            // //     console.log(sideBarLinks[i])
            // // }
            // articles.forEach(article => {
            //     offsetArticles.push(article.offsetTop);
            // });
            // activateSideBarLink(sideBarLinks, offsetArticles);
            window.addEventListener('scroll', function () {
                let scrollTopDoc = window.scrollY + 100;
                let moveSideBarVal = scrollTopDoc - sideBarOffset;
                if (moveSideBarVal >= 0 && sideBarPos === 'relative') {
                    sideBarElem.style.top = moveSideBarVal + 'px';
                    
                }
            });
};