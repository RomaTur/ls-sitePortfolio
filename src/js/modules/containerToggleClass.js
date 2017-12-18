
module.exports = (sideBarClass, buttonClass) => {

    ////////////
    console.log('blogSideBar start');

    let sideBar = document.querySelector('.'+sideBarClass)
    let button = document.querySelector('.'+buttonClass)

    let containerToggle = () => {
        sideBar.classList.toggle(sideBarClass+'--active');
    };

    if(sideBar && button){
        button.addEventListener('click', containerToggle);
    }

    console.log('blogSideBar done');
    ///////////////

};