(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignUpSuccessController', accountSignUpSuccessController);

    accountSignUpSuccessController.$inject = [
        '$stateParams'
    ];

    function accountSignUpSuccessController($stateParams) {

        var userType = {
            doctor : 'doctor',
            user : 'user'
        };

        var doctorVarObj = {
            smallTitle : '感謝您的註冊',
            largeTitle : '資料審核中，通過後會寄信通知您',
            leftBtnText : '我要登入',
            rightBtnText : '回到首頁'
        };

        var userVarObj = {
            smallTitle : '您已經註冊成功',
            largeTitle : '馬上登入來使用本站服務',
            leftBtnText : '我要登入',
            rightBtnText : '回到首頁'
        };

        var vm = this;

        vm.userTypeConst = userType;
        vm.userType = $stateParams.userType;
        vm.varObj = $stateParams.userType === userType.doctor ? doctorVarObj : userVarObj;
    }
})();
