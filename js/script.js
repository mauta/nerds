 
    ymaps.ready(init);
    
    function init(){

        var myMap = new ymaps.Map("map", {     
            center: [59.938735, 30.32118],   
            zoom: 17
        });

        var myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {}, {
          iconLayout: 'default#image',
          iconImageHref: 'img/map-marker.png',
          iconImageSize: [231,190],
          iconImageOffset: [-50, -200]
      });

      myMap.geoObjects.add(myPlacemark);
    }

    

   