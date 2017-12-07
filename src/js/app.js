import $ from 'jquery';
import fullMenu from './modules/fullmenu';
// import mapsInit from './modules/maps';
// import './modules/maps';

$(function(){
    ///////
    console.log('entry start');

    fullMenu('.hamburger__list', '.menu-close__list', '.menu');
    // mapsInit();

    ///////
    console.log('entry done');
});