import ymaps from 'ymaps'

export default function(){
    ////////////
    console.log('mapsInit start');
    ///////////
    ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(maps => {



        const map = new maps.Map('map', {
          center: [54.922788, 43.294844],
          controls: [''],
          zoom: 13
        });
        map.behaviors.disable('scrollZoom');








      })
      .catch(error => console.log('Failed to load Yandex Maps', error));

    ////////////
    console.log('mapsInit done');
    ///////////
};

