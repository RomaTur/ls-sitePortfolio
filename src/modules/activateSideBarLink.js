// import doFnElemVisible from './doFnElemVisible'
module.exports = () => {
    ///////////
    let doFnElemVisible = require('./doFnElemVisible');
    let sideBarItems = document.querySelectorAll('.article__item');
    let articles = document.querySelectorAll('.article');
    let sideBarLinks = [];
    let offsetArticles = [];

    sideBarItems.forEach(sideBarLink => {
        sideBarLinks.push(sideBarLink);
    });
    // for(let i = 0; i < sideBarLinks.length; i++){
    //     console.log(sideBarLinks[i])
    // }
    articles.forEach(article => {
        offsetArticles.push(article.offsetTop);
    });
    sideBarLinks[0].classList.add('article__item--active')
    for (let i = 0; i < sideBarLinks.length; i++) {
        // console.log('в цикле')
        var func = () => {
            for (let j = 0; j < sideBarLinks.length; j++) {
                sideBarLinks[j].classList.remove('article__item--active')
            }
            sideBarLinks[i].classList.add('article__item--active')
            // console.log(i+1)
        }
        let elemId = articles[i].getAttribute('id')
        doFnElemVisible({
            elemClass: elemId,
            fn: func,
            divider: 3,
            loop: true
        });
    }


};