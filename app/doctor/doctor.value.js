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
                { name : 'PGY', text : '不分科' },
                { name : 'others', text : '其他醫師' }
            ]);

})();
