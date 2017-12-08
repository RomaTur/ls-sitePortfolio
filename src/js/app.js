import $ from 'jquery';
import fullMenu from './modules/fullMenu';
import mapInit from './modules/maps.js'

$(function(){
    ///////
    console.log('entry start');

    fullMenu('.hamburger__list', '.menu-close__list', '.menu');
    
    mapInit();

    ///////
    console.log('entry done');
});