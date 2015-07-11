(function() {
    'use strict';

    angular.module('app.doctor')
           .value('doctorCategoryList', [
           	    { name : 'all', text : '所有醫師' },
           		{ name : 'Category_1', text : '類別1' },
           		{ name : 'Category_2', text : '類別2' }
           	]);

})();
