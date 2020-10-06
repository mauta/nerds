 ymaps.ready(init);

 function init() {

     var myMap = new ymaps.Map("map", {
         center: [59.938735, 30.32118],
         zoom: 17
     });

     var myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {}, {
         iconLayout: 'default#image',
         iconImageHref: 'img/map-marker.png',
         iconImageSize: [231, 190],
         iconImageOffset: [-50, -200]
     });

     myMap.geoObjects.add(myPlacemark);
 }

 const writeUs = document.querySelector('.write-us__btn');
 const modal = document.querySelector('.email-us');
 const closeBtn = document.querySelector('.email-us__btn-close');
 const name = document.querySelector('.email-us__input--name');
 const email = document.querySelector('.email-us__input--email');
 const text = document.querySelector('.email-us__textarea');
 const form = document.querySelector('.email-us__form');
 const sliders = document.querySelectorAll('.learn-more__item');
 const sliderBtns = document.querySelectorAll('.slayder__btn');



 writeUs.addEventListener('click', function (evt) {
     evt.preventDefault();
     modal.classList.remove('hidden');
     name.focus();
     if (localStorage.getItem('name')) {
         name.value = localStorage.getItem('name');
         email.focus();
     }
     if (localStorage.getItem('email')) {
         email.value = localStorage.getItem('email');
         text.focus();
     }

 })

 closeBtn.addEventListener('click', function (evt) {
     evt.preventDefault();
     modal.classList.add('hidden');
 })

 window.addEventListener("keydown", function (evt) {
     if (evt.keyCode === 27) {
         evt.preventDefault();
         modal.classList.add("hidden");
     }
 });

 form.addEventListener('submit', function (evt) {
     if (!name.value || !email.value || !text.value) {
         evt.preventDefault();
     } else {
         localStorage.setItem('name', name.value);
         localStorage.setItem('email', email.value);
     }
 })

 sliderBtns.forEach((dot, dotIndex) => {

     dot.addEventListener('click', () => {

         let indexOfActiveSlide = 0;
         let currentSlide = sliders[0];
         let currentDot = sliderBtns[0];

         for (let i = 0; i < sliders.length; i++) {
             if (sliders[i].classList.contains('learn-more__item--current')) {
                 currentSlide = sliders[i];
                 currentDot = sliderBtns[i];
                 indexOfActiveSlide = i;
             }
         }

         if (indexOfActiveSlide !== dotIndex) {
             currentDot.classList.remove('slayder__btn--current');
             currentSlide.classList.remove('learn-more__item--current');

             sliders[dotIndex].classList.add('learn-more__item--current');
             sliderBtns[dotIndex].classList.add('slayder__btn--current');
         }
     });
 });

 const DEFAULT_VALUE_MAX = 15000;
 const DEFAULT_PIN_MAX_POSITION = '218px';
 const DEFAULT_PIN_LINE_MAX = 218;
 const DEFAULT_PIN_LINE_MIN_FOR_MAX = 37;
 const DEFAULT_PIN_LINE_MIN = 0;
 const DEFAULT_PIN_LINE_MAX_FOR_MIN = 181;

 const pinLevelMin = document.querySelector('.range__toggle-min');
 const pinLevelMax = document.querySelector('.range__toggle-max');
 const pinLine = document.querySelector('.range__scale');
 const pinValueMin = document.querySelector('.cost__input--min');
 const pinValueMax = document.querySelector('.cost__input--max');
 const pinDepth = document.querySelector('.range__bar');
 let pinDepthLength = 216;

 const resetPinValue = function () {
     pinLevelMax.style.left = DEFAULT_PIN_MAX_POSITION;
     pinValueMax.value = DEFAULT_VALUE_MAX;
     pinDepth.style.width = '100%';
 };

 resetPinValue()




 pinLevelMax.addEventListener('mousedown', function (evt) {
     evt.preventDefault();

     let startLevel = {
         x: evt.clientX
     };

     console.log('startLevel ' + startLevel.x)
     var onMouseMove = function (moveEvt) {
         moveEvt.preventDefault();
         if (pinDepthLength < 35) {
         
             return
         }

         console.log(pinDepthLength)
         let shift = {
             x: startLevel.x - moveEvt.clientX
         };

         startLevel = {
             x: moveEvt.clientX
         };

         let pinX = pinLevelMax.offsetLeft - shift.x;

         if (pinX > DEFAULT_PIN_LINE_MIN_FOR_MAX && pinX < DEFAULT_PIN_LINE_MAX) {
             pinLevelMax.style.left = pinX + 'px';

         } else if (pinX >= DEFAULT_PIN_LINE_MAX) {
             pinLevelMax.style.left = DEFAULT_PIN_LINE_MAX + 'px'
         } else {
             pinLevelMax.style.left = DEFAULT_PIN_LINE_MIN_FOR_MAX + 'px'
         }

         pinValue = pinX / pinLine.offsetWidth;

         if (pinValue > 1) {
             pinValue = 1;
         }
         console.log('pinX ' + pinX)
         pinDepthLength = pinDepthLength - shift.x
         console.log(pinDepthLength)

         pinValueMax.value = Math.round(pinValue * DEFAULT_VALUE_MAX);

         pinDepth.style.width = (pinDepthLength - 18) + 'px';

     };
     var onMouseUp = function (upEvt) {
         upEvt.preventDefault();
         document.removeEventListener('mousemove', onMouseMove);
         document.removeEventListener('mouseup', onMouseUp);
     };

     document.addEventListener('mousemove', onMouseMove);
     document.addEventListener('mouseup', onMouseUp);


 })

 pinLevelMin.addEventListener('mousedown', function (evt) {
     evt.preventDefault();
     let startLevel = {
         x: evt.clientX
     };

     console.log('startLevel ' + startLevel.x)
     var onMouseMove = function (moveEvt) {

         moveEvt.preventDefault();
         if (pinDepthLength < 35) {
             return
         }
         let shift = {
             x: startLevel.x - moveEvt.clientX
         };
         startLevel = {
             x: moveEvt.clientX
         };

         let pinX = pinLevelMin.offsetLeft - shift.x;

         if (pinX > DEFAULT_PIN_LINE_MIN && pinX < DEFAULT_PIN_LINE_MAX_FOR_MIN) {
             pinLevelMin.style.left = pinX + 'px';
             console.log(pinLevelMin.style.left)
         } else if (pinX >= DEFAULT_PIN_LINE_MAX_FOR_MIN) {
             pinLevelMin.style.left = DEFAULT_PIN_LINE_MAX_FOR_MIN + 'px'
         } else {
             pinLevelMin.style.left = DEFAULT_PIN_LINE_MIN + 'px'
         }
         pinValue = pinX / pinLine.offsetWidth;

         if (pinValue > 1) {
             pinValue = 1;
         }
         pinDepthLength = (pinDepthLength) + shift.x

         pinValueMin.value = Math.round(pinValue * DEFAULT_VALUE_MAX);
         pinDepth.style.width = (pinDepthLength - 18) + 'px';
         pinDepth.style.left = pinX + 'px';

     };
     var onMouseUp = function (upEvt) {
         upEvt.preventDefault();
         document.removeEventListener('mousemove', onMouseMove);
         document.removeEventListener('mouseup', onMouseUp);
     };

     document.addEventListener('mousemove', onMouseMove);
     document.addEventListener('mouseup', onMouseUp);


 })