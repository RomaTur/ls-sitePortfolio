import jump from 'jump.js'

module.exports = (buttonClass, toClass) => {
    /////////////////
    let button = document.querySelector('.'+buttonClass);
    
    if(button){
        console.log('in smothScrollArrow')

        button.addEventListener('click', () => {
            jump('.'+toClass, {
                duration: 1000,
                offset: 0,
                callback: undefined,
                easing: easeInOutQuad,
                a11y: false
              })
        });
    }
    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
      }


};