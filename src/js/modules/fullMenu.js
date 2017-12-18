import isScroll from './isScroll';

module.exports = (openClass, closeClass, viewClass) => {
    /////
    console.log('fullMenu start');
    //////
    

    let open = document.querySelector('.'+openClass);
    let close = document.querySelector('.'+closeClass);
    let view = document.querySelector('.'+viewClass);


    if(open && close && view){
    open.addEventListener('click',()=>{
        view.classList.add(viewClass+'--active');
        open.style.display = 'none';
        close.style.display = 'block'
        isScroll(false);
    });
    close.addEventListener('click',()=>{
        view.classList.remove(viewClass+'--active');
        open.style.display = 'block';
        close.style.display = 'none'
        isScroll(true);
    });
    }

    ///////
    console.log('fullMenu done');
};

