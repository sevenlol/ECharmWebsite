(function() {
    'use strict';

    angular.module('app.blog')
           .value('blogCategoryList', [
           		{ name : 'Category_1', text : '類別1' },
           		{ name : 'Category_2', text : '類別2' }
           	]);

})();