import $ from 'jquery'
import isScroll from './isScroll';

module.exports = (openClass, closeClass, viewClass) => {
    /////
    console.log('fullMenu start');
    //////
    let open = $(openClass);
    let close = $(closeClass);
    let view = $(viewClass);

    open.on('click', (event) => {
        console.log('click');
        view.fadeIn(400);
        close.fadeIn(400);
        open.fadeOut(400);
        isScroll(false);
    });
    close.on('click', (event) => {
        console.log('click');
        view.fadeOut(400);
        close.fadeOut(400);
        open.fadeIn(400);
        isScroll(true);
    });
    
    ///////
    console.log('fullMenu done');
};

