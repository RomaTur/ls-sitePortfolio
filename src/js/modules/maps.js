import ymaps from 'ymaps'

module.exports = () => {
    ////////////
    console.log('mapsInit start');
    ///////////

    // if(document.getElementById('map')) return 0;

    //////////
    ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(maps => {
        ////////основные настройки
        const map = new maps.Map('map', {
          center: [54.922788, 43.294844],
          controls: [''],
          zoom: 13
        });
        ////////////дополнительные настройки 
        map.behaviors.disable('scrollZoom');
        ///////////////////////////////////
      })
      .catch(error => console.log('Failed to load Yandex Maps', error));
    ////////////
    console.log('mapsInit done');
    ///////////
};

