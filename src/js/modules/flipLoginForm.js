import $ from 'jquery'

module.exports = (loginButton, mainButton, flipContainer) =>{
    

    $('.'+loginButton).on('click', function(){
        $('.'+flipContainer).addClass(flipContainer+'--active');
        $('.'+loginButton).css('transition', 'initial');
        $('.'+loginButton).fadeOut(400);
    });
    $('.'+mainButton).on('click', ()=>{
        $('.'+flipContainer).removeClass(flipContainer+'--active');
        $('.'+loginButton).fadeIn(400, ()=>{
            $('.'+loginButton).css('transition', '0.2s');
        });
    });
};