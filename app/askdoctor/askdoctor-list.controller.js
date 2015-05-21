(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorListController', askdoctorListController);

    askdoctorListController.$inject = [
    ];

    function askdoctorListController() {
        console.log('content.askdoctor.list');
    }

})();
