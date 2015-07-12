(function() {
    'use strict';

    angular.module('app.askdoctor')
           .value('askdoctorCategoryList', [
           		{ name : 'all', text : '所有問答' },
           		{ name : 'Category_1', text : '類別1' },
           		{ name : 'Category_2', text : '類別2' }
           	]);

})();