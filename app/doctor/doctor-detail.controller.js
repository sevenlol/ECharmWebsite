(function() {
    'use strict';

    angular.module('app.doctor')
           .controller('doctorDetailController', doctorDetailController);

    doctorDetailController.$inject = [
        'doctor',
        'articleList',
        'answerList'
    ];

    function doctorDetailController(doctor, articleList, answerList) {
        var vm = this;

        vm.doctor = doctor;
        vm.articleList = articleList;
        vm.answerList = answerList;
    }

})();
