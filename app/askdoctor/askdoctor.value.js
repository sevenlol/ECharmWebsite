(function() {
    'use strict';

    angular
        .module('app.askdoctor')
        .value('askdoctorCategoryList', [
            { name : 'all', text : '所有問答', display : 'none',
              background_url : '', description : [] },
            { name : 'cosmeticsurgery', text : '醫學美容', display : 'full',
              background_url : 'images/cate-1.jpg', description : [ '雷射？玻尿酸？微晶瓷？減重？', '在做醫學美容前先了解一下吧' ] },
            { name : 'plasticsurgery', text : '整形外科', display : 'full',
              background_url : 'images/cate-2.jpg', description : [ '隆乳、隆鼻、割雙眼皮該用何種方式？', '由整型外科權威告訴您' ] },
            { name : 'gynecology', text : '婦科', display : 'left',
              background_url : 'images/cate-3.jpg', description : [ '月經異常、經痛、避孕安全期', '等問題來此發問' ] },
            { name : 'obstetrics', text : '產科', display : 'right',
              background_url : 'images/cate-4.jpg', description : [ '媽媽懷孕前後的各個問題', '來此發問' ] },
            { name : 'dermatology', text : '皮膚科', display : 'left',
              background_url : 'images/cate-5.jpg', description : [ '專業醫師跟您講如何做', '皮膚保養與常見皮膚病' ] },
            { name : 'pediatrics', text : '小兒科', display : 'right',
              background_url : 'images/cate-6.jpg', description : [ '由專業醫師為您解答', '寶寶照顧中的所有問題' ] },
            { name : 'oncology_consultation', text : '癌症諮詢', display : 'full-nopadding', background_url : 'images/oncology.png',
              description : [ '向專業醫師諮詢', '癌症相關知識' ], intro_icon_url : 'images/pediatrics.png' },
            { name : 'others', text : '其他醫學問題', display : 'full-nopadding',
              background_url : 'images/cate-7.jpg', description : [] }
        ])
        .value('askdoctorSortOptionList', [
            { name : '-created_date', text: '發問日期〈新到舊〉' },
            /*{ name : 'created_date', text: '發問日期〈舊到新〉' },*/
            { name : '-answer_date', text: '回答日期〈新到舊〉' },
            /*{ name : 'answer_date', text: '回答日期〈舊到新〉' }*/
            { name : '-avgRating', text: '平均評分〈高到低〉' },
            /*{ name : 'avgRating', text: '平均評分〈低到高〉' },*/
            { name : '-commentCount', text: '評論數量〈高到低〉' }/*,
            { name : 'commentCount', text: '評論數量〈低到高〉' }*/
        ]);

})();
