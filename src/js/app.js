import $ from 'jquery';
import fullMenu from './modules/fullMenu';
import mapInit from './modules/maps.js'
import flipLoginForm from './modules/flipLoginForm'
import skillProgressInit from './modules/skillProgressInit'
$(function(){
    ///////
    console.log('entry start');

    fullMenu('.hamburger__list', '.menu-close__list', '.menu');
    mapInit();
    flipLoginForm('welcome__login-button', 'login__buttons-main', 'flip__container'); //flip container need to be a class
    skillProgressInit('skill','skill__bar','data-pct')//классы без .
    ///////
    console.log('entry done');
});