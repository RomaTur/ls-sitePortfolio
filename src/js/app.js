import fullMenu from './modules/fullMenu';
import mapInit from './modules/maps.js'
import flipLoginForm from './modules/flipLoginForm'
import skillProgressInit from './modules/skillProgressInit'
import blogSideBar from './modules/blogSideBar'
import svg4everybody from 'svg4everybody'
import doFnElemVisible from './modules/doFnElemVisible'
import blurForm from './modules/blurForm'
import parallaxBg from './modules/parallaxMountains'

let domready = function () {
    ///////
    console.log('entry start');

    svg4everybody();

    parallaxBg();
    flipLoginForm('welcome__login-button', 'login__buttons-main', 'flip__container'); //flip container need to be a class

    fullMenu('hamburger', 'menu');

    blurForm();
    
    mapInit('map');

    let doSkillProgress = skillProgressInit('skill', 'skill__bar', 'data-pct'); //классы без .

    if (doSkillProgress) {
        doFnElemVisible('skills', doSkillProgress);
    }

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