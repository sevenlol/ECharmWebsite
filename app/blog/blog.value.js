(function() {
    'use strict';

    angular
        .module('app.blog')
        .value('blogCategoryList', [
            { name : 'all', text : '所有文章', display : 'none', background_url : '',
              description : [], intro_icon_url : '' },
            { name : 'cosmeticsurgery', text : '醫學美容', display : 'full', background_url : 'images/cate-1.jpg',
              description : [ '雷射？玻尿酸？微晶瓷？減重？', '在做醫學美容前先了解一下吧' ], intro_icon_url : 'images/cosmetic_surgery.png' },
            { name : 'plasticsurgery', text : '整形外科', display : 'full', background_url : 'images/cate-2.jpg',
              description : [ '隆乳、隆鼻、割雙眼皮該用何種方式？', '由整型外科權威告訴您' ], intro_icon_url : 'images/plastic_surgery.png' },
            { name : 'gynecology', text : '婦科', display : 'left', background_url : 'images/cate-3.jpg',
              description : [ '月經異常、經痛、避孕安全期', '等問題來此發問' ], intro_icon_url : 'images/gynecology.png' },
            { name : 'obstetrics', text : '產科', display : 'right', background_url : 'images/cate-4.jpg',
              description : [ '媽媽懷孕前後的各個問題', '來此發問' ], intro_icon_url : 'images/obstetrics.png' },
            { name : 'dermatology', text : '皮膚科', display : 'left', background_url : 'images/cate-5.jpg',
              description : [ '專業醫師跟您講如何做', '皮膚保養與常見皮膚病' ], intro_icon_url : 'images/dermatology.png' },
            { name : 'pediatrics', text : '小兒科', display : 'right', background_url : 'images/cate-6.jpg',
              description : [ '由專業醫師為您解答', '寶寶照顧中的所有問題' ], intro_icon_url : 'images/pediatrics.png' },
            { name : 'others', text : '其他醫學文章', display : 'full-nopadding', background_url : 'images/cate-7.jpg',
              description : [], intro_icon_url : 'images/1.jpg' }
        ])
        .value('blogTagList', [
            { name : 'Tag_1', text : '腹痛' },
            { name : 'Tag_2', text : '頭痛' },
            { name : 'Tag_3', text : '鬱悶' },
            { name : 'Tag_4', text : '比利時巧克力買一送一' },
            { name : 'Tag_5', text : '我餓了' },
            { name : 'Tag_6', text : 'aa' },
            { name : 'Tag_7', text : 'bb' }
        ])
		    .value('blogSortOptionList', [
            { name : '-created_at', text: '發表日期〈新到舊〉' },
            /*{ name : 'created_at', text: '發表日期〈舊到新〉' },*/
            { name : '-rating', text: '平均評分〈高到低〉' },
            /*{ name : 'rating', text: '平均評分〈低到高〉' },*/
            { name : '-click_count-0', text: '點擊數量〈高到低〉' }/*,
            { name : 'click_count-0', text: '點擊數量〈低到高〉' }*/
        ]);

})();
