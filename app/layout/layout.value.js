(function() {
    'use strict';

    angular
        .module('app.layout')
        .value('frontPageDoctorSlideList', [
            { doctor_title: '國泰醫院婦產科 權威', photo_url : 'images/index-doctor-01.jpg', sign_url : 'images/sign.png' },
            { doctor_title: '台大醫院骨科 主任', photo_url : 'images/index-doctor-01.jpg', sign_url : 'images/sign.png' },
            { doctor_title: '中山醫院婦科 主治醫生', photo_url : 'images/index-doctor-01.jpg', sign_url : 'images/sign.png' }
        ]);

})();
