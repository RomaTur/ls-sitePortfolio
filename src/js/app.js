import fullMenu from './modules/fullMenu';
import mapInit from './modules/maps.js'
import flipLoginForm from './modules/flipLoginForm'
import skillProgressInit from './modules/skillProgressInit'
import blogSideBar from './modules/blogSideBar'
import svg4everybody from 'svg4everybody'
import blurForm from './modules/blurForm'
import parallaxBg from './modules/parallaxMountains'
import smoothScrollClick from './modules/smothScrollClick.js'

let domready = function () {//DOM дерево загрузилось
    ///////
    console.log('entry start');

    svg4everybody();//запуск скрипта чтобы все внешние подключения svg были кроссбраузерными

    parallaxBg();//запуск скрипта инициализации паралакса
    flipLoginForm('welcome__login-button', 'login__buttons-main', 'flip__container'); //flip container need to be a class

    smoothScrollClick('header__arrow-img', 'content');
    smoothScrollClick('footer__arrow', 'wrapper');
    
    fullMenu('hamburger', 'menu');

    blurForm();
    
    mapInit('map');
    skillProgressInit('skill', 'skill__bar', 'data-pct'); //классы без .

    blogSideBar('article__list', 'article__list-circle');

    ///////
    console.log('entry done');

}


//////////domready/////////////
if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    domready();
} else {
    document.addEventListener("DOMContentLoaded", domready);
}
/////////////////////////////