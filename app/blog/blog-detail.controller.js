(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogDetailController', blogDetailController);

    blogDetailController.$inject = [
        'article',
        'author',
        'commentList',
        'ratingList',
        'avgRating'
    ];

    function blogDetailController(article, author, commentList, ratingList, avgRating) {
        var vm = this;

        vm.article = article;
        vm.author = author;
        vm.commentList = commentList;
        vm.avgRating = avgRating;

        vm.rateThisArticle = rateThisArticle;

        console.log(JSON.stringify(author, null, 2));

        /* public functions */

        function rateThisArticle() {
            // body...
        }
    }

})();
