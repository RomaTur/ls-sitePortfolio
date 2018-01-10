module.exports = () => {
    //////////////////
    const parallaxContainer = document.querySelector('#parallax');
    if(parallaxContainer) {var layers = parallaxContainer.children;}
    let moveLayers = (event) => {
        let initialX = (window.innerWidth / 2) - event.pageX;
        let initialY = (window.innerHeight / 2) - event.pageY;
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
            i++;
        }  
    };
    
    if(parallaxContainer){
        var cloudOne = document.querySelector('#cloud__one');
        var cloudTwo = document.querySelector('#cloud__two');
        var cloudThree = document.querySelector('#cloud__three');
    }
    if(parallaxContainer){
        console.log('in parallax')
        window.addEventListener('mousemove', moveLayers);
        let windowCritVal = window.innerWidth / 1.3
        let offsetLeftOne = windowCritVal*0.5;
        let offsetLeftTwo = windowCritVal*1.3;
        let offsetLeftThree = windowCritVal*0.6;
        let cloudOneOffset,
            cloudTwoOffset,
            cloudThreeOffset;
        let moveCloudOne = function(){
            offsetLeftOne += 1;
            if(cloudOneOffset < -windowCritVal) offsetLeftOne = 1;
            cloudOneOffset = windowCritVal - offsetLeftOne;
            cloudOne.style.left = cloudOneOffset + 'px'
        }
        let moveCloudTwo = function(){
            offsetLeftTwo += 1;
            if(cloudTwoOffset < -windowCritVal) offsetLeftTwo = 1;
            cloudTwoOffset = windowCritVal - offsetLeftTwo;
            cloudTwo.style.left = windowCritVal - offsetLeftTwo + 'px'
        }
        let moveCloudThree = function(){
            offsetLeftThree += 1;
            if(cloudThreeOffset < -windowCritVal) offsetLeftThree = 1;
            cloudThreeOffset = windowCritVal - offsetLeftThree
            cloudThree.style.left = windowCritVal - offsetLeftThree + 'px'
        }
        setInterval(moveCloudOne, 35);
        setInterval(moveCloudTwo, 65);
        setInterval(moveCloudThree, 80);
    } 
    /////////////////

};