(function() {
    'use strict';

    angular.module('app.layout')
           .controller('homeController', homeController);

    homeController.$inject = [
        'authService',
        '$rootScope',
        'frontPageDoctorSlideList'
    ];

    function homeController(authService, $rootScope, frontPageDoctorSlideList) {
        var vm = this;

        vm.frontPageDoctorSlideList = frontPageDoctorSlideList;

        vm.showInstruction = false;
        // FIXME remove this if the instruction text is not needed
        /*vm.enterDoctorListLink = enterDoctorListLink;
        vm.leaveDoctorListLink = leaveDoctorListLink;*/


        /* public functions */
        /*function enterDoctorListLink() {
            vm.showInstruction = true;
        }

        function leaveDoctorListLink() {
            vm.showInstruction = false;
        }*/
    }

})();