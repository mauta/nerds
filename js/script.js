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

