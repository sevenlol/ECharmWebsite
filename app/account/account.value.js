(function() {
    'use strict';

    angular
        .module('app.account')
        .value('accountCategoryList', [
            { name : 'PGY', text : '不分科' },
            { name : 'plasticsurgeon', text : '整形外科' },
            { name : 'cosmeticsurgeon', text : '醫學美容' },
            { name : 'dermatologist', text : '皮膚科' },
            { name : 'pediatrician', text : '小兒科' },
            { name : 'OBSGYN', text : '婦產科' },
            { name : 'occupational_therapist', text : '職能治療師' },
            { name : 'physical_therapist', text : '物理治療師' },
            { name : 'pharmacist', text : '藥師' },
            { name : 'nutritionist', text : '營養師' },
            { name : 'oncologist', text : '癌症醫師' },
            { name : 'others', text : '其他醫師' }
        ])
        .value('locationList', [
            { name : '基隆市', text : '基隆市' },
            { name : '臺北市', text : '臺北市' },
            { name : '新北市', text : '新北市' },
            { name : '桃園市', text : '桃園市' },
            { name : '新竹市', text : '新竹市' },
            { name : '新竹縣', text : '新竹縣' },
            { name : '苗栗縣', text : '苗栗縣' },
            { name : '臺中市', text : '臺中市' },
            { name : '彰化縣', text : '彰化縣' },
            { name : '南投縣', text : '南投縣' },
            { name : '雲林縣', text : '雲林縣' },
            { name : '嘉義市', text : '嘉義市' },
            { name : '嘉義縣', text : '嘉義縣' },
            { name : '臺南市', text : '臺南市' },
            { name : '高雄市', text : '高雄市' },
            { name : '屏東縣', text : '屏東縣' },
            { name : '臺東縣', text : '臺東縣' },
            { name : '花蓮縣', text : '花蓮縣' },
            { name : '宜蘭縣', text : '宜蘭縣' },
            { name : '澎湖縣', text : '澎湖縣' },
            { name : '金門縣', text : '金門縣' },
            { name : '連江縣', text : '連江縣' }
        ]);
})();
