import fullMenu from './modules/fullMenu';
import mapInit from './modules/maps.js'
import flipLoginForm from './modules/flipLoginForm'
import skillProgressInit from './modules/skillProgressInit'
import blogSideBar from './modules/containerToggleClass'

let domready = function () {
    ///////
    console.log('entry start');
    
    fullMenu('hamburger__list', 'menu-close__list', 'menu');
    mapInit();
    flipLoginForm('welcome__login-button', 'login__buttons-main', 'flip__container'); //flip container need to be a class
    skillProgressInit('skill','skill__bar','data-pct');//классы без .
    
    blogSideBar('article__list','article__list-circle');
    
    ///////
    console.log('entry done');

}
   

//////////domready/////////////
if ( document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll) ) {
    domready();
} else {
    document.addEventListener("DOMContentLoaded", domready);
}
/////////////////////////////