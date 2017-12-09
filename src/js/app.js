import $ from 'jquery';
import fullMenu from './modules/fullMenu';
import mapInit from './modules/maps.js'

$(function(){
    ///////
    console.log('entry start');

    fullMenu('.hamburger__list', '.menu-close__list', '.menu');
    
    mapInit();

    $('.welcome__login-button').on('click', function(){
        $('.flip__container').addClass('flip__container--active');
        $('.welcome__login-button').css('transition', 'initial');
        $('.welcome__login-button').fadeOut(400);
    });
    $('.login__buttons-main').on('click', ()=>{
        $('.flip__container').removeClass('flip__container--active');
        $('.welcome__login-button').fadeIn(400, ()=>{
            $('.welcome__login-button').css('transition', '0.2s');
        });
    });

    ///////
    console.log('entry done');
});