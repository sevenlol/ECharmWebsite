(function() {
    'use strict';

    angular.module('app.doctor')
           .value('doctorCategoryList', [
                { name : 'all', text : '所有醫師' },
                { name : 'cosmeticsurgeon', text : '醫學美容' },
                { name : 'plasticsurgeon', text : '整形外科' },
                { name : 'OBSGYN', text : '婦產科' },
                { name : 'dermatologist', text : '皮膚科' },
                { name : 'pediatrician', text : '小兒科' },
                { name : 'oncologist', text : '癌症醫師' },
                { name : 'PGY', text : '不分科' },
                { name : 'occupational_therapist', text : '職能治療師' },
                { name : 'physical_therapist', text : '物理治療師' },
                { name : 'pharmacist', text : '藥師' },
                { name : 'nutritionist', text : '營養師' },
                { name : 'others', text : '其他醫師' }
            ]);

})();
