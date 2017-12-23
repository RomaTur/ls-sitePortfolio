module.exports = () => {
    //////////////////


    // window.addEventListener('resize', () => {
    //     let windowWidth = document.body.clientWidth;
    //     console.log(windowWidth);
    // });


    // if(windowWidth>=1025){
    //     console.log('in parallaxMountains');
    // }

    const parallaxContainer = document.getElementById('parallax'),
        layers = parallaxContainer.children;

    const moveLayers = event => {
        let initialX = (window.innerWidth / 2) - event.pageX;
        let initialY = (window.innerHeight / 2) - event.pageY;

        //     [].slice.call(layers).forEach(function(layer, index) {
        //     var 
        //       divider = index / 100,
        //       positionX = initialX * divider,
        //       positionY = initialY * divider,
        //       bottomPosition = (window.innerHeight / 2) * divider,
        //       transformString = 'translate(' + positionX + 'px,' + positionY + 'px)',
        //       image = layer.firstElementChild;

        //     layer.style.transform = transformString;
        //     image.style.bottom = '-' + bottomPosition + 'px';
        //   });
        console.log(event)
        let i = 0;
        for (let layer of layers) {
            let divider = i / 80,
                positionX = initialX * divider,
                positionY = initialY * divider,
                bottomPosition = (window.innerHeight / 2) * divider,
                image = layer.firstElementChild;
                image.style.bottom = '-' + bottomPosition + 'px';
                if(event.pageY<=window.innerHeight){
                    layer.style.transform = 'translate(' + positionX + 'px, ' + positionY + 'px)';
                }
                else{
                    
                }
                
            i++;
        }
        
    };

    window.addEventListener('mousemove', moveLayers);

    /////////////////
};