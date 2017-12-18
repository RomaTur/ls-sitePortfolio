
module.exports = (loginButton, mainButton, flipContainer) =>{

    console.log('flipLoginForm start');
    
let flip = document.querySelector('.'+flipContainer);
let login = document.querySelector('.'+loginButton);
let main = document.querySelector('.'+mainButton);
    
if(flip && login && main){
    login.addEventListener('click',function(){
        flip.classList.add(flipContainer+'--active');
        login.style.opacity = '0';
        login.style.cursor = 'default';
        
    });

    main.addEventListener('click',function(){
        flip.classList.remove(flipContainer+'--active');
        login.style.opacity = '1';
        login.style.cursor = 'pointer';
    });
}
    console.log('flipLoginForm done')
};