(function() {
    'use strict';

    angular.module('app.blog')
           .value('blogCategoryList', [
           		{ name : 'Category_1', text : '醫療美容', description : '雷射？玻尿酸？微晶瓷？減重？在做醫學美容前先了解一下吧' },
           		{ name : 'Category_2', text : '整形外科', description : '隆乳、隆鼻、割雙眼皮該用何種方式？由整型外科權威告訴您 ' },
           		{ name : 'Category_3', text : '婦科', description : '月經異常、經痛、避孕安全期等問題來此發問 ' },
           		{ name : 'Category_4', text : '產科', description : '媽媽懷孕前後的各個問題來此發問 ' },
           		{ name : 'Category_5', text : '皮膚科', description : '專業醫師跟您講如何做皮膚保養與常見皮膚病 ' },
           		{ name : 'Category_6', text : '小兒科', description : '由專業醫師為您解答寶寶照顧中的所有問題' },
           		{ name : 'Category_7', text : '其他醫學問題', description : '' }
           	]);

})();
