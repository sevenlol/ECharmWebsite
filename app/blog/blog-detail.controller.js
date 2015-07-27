(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogDetailController', blogDetailController);

    blogDetailController.$inject = [
        '$stateParams',
        '$filter',
        'article',
        'author',
        'commentList',
        'ratingList',
        'avgRating',
        'myAccount',
        'blogRatingService',
        'blogArticleContentService'
    ];

    function blogDetailController($stateParams, $filter, article, author, commentList, ratingList, avgRating, myAccount, blogRatingService, blogArticleContentService) {
        var DATE_FORMAT = 'yyyy-MM-ddTHH:mmZ';
        var vm = this;

        vm.article = article;
        vm.author = author;
        vm.commentList = commentList;
        vm.ratingList = ratingList;
        vm.avgRating = avgRating;

        vm.rateThisArticle = rateThisArticle;

        vm.hoverOverRating = hoverOverRating;
        vm.collapseMyRatingBar = collapseMyRatingBar;

        // FIXME remove article content test later
        /* test start */

        var builder = new blogArticleContentService.Builder();
        var articleContent = builder
                                .addIntro('Intro 1')
                                .addIntro('Intro 2')
                                .addRef('Ref 1')
                                .addRef('Ref 2')
                                .addRef('Ref 3')
                                .addHeadingBlock(1, 'Heading 1')
                                .addHeadingBlock(2, 'Heading 2')
                                .addHeadingBlock(3, 'Heading 3')
                                .addHeadingBlock(4, 'Heading 4')
                                .addHeadingBlock(5, 'Heading 5')
                                .addHeadingBlock(6, 'Heading 6')
                                .addParagraphBlock('Paragraph 1')
                                .addImageBlock('images/article-detail-bg.jpg', 'Image Caption')
                                .addAlertBlock('danger', 'Message 1')
                                .addListBlock('ordered', ['item 1', 'item 2'])
                                .addListBlock('unordered', ['item 1', 'item 2'])
                                .addTableBlock([[ '1-1', '1-2'], [ '2-1', '2-2' ]])
                                .build();

        vm.testArticle = {
            content_text : articleContent.toJSONString()
        };
        console.log(JSON.stringify(articleContent, null, 2));
        console.log(articleContent.toJSONString());
        console.log(articleContent.toPrettyJSONString());
        console.log('Validate: ' + blogArticleContentService.validate(articleContent));

        /* test end */

        // rating
        vm.ratingMax = 5;
        vm.hoverOverRating = hoverOverRating;
        vm.ratingStatusMessage = {
            isShown : false,
            type    : 'error',
            message : ''
        };

        // my rating bar
        vm.isMyRatingBarCollapsed = true;
        vm.myRating = 0;
        vm.iAlreadyRated = findMyRating(vm.ratingList);
        vm.collapseMyRatingBar = collapseMyRatingBar;

        vm.rateThisArticle = rateThisArticle;

        console.log(JSON.stringify(author, null, 2));
        console.log("Author: " + author);
        /* public functions */

        function hoverOverRating(value) {
            if (vm.ratingList && vm.ratingList.length) {
                vm.overRatingValue = '平均 ' + ((vm.avgRating % 1 === 0) ? vm.avgRating : $filter('number')(vm.avgRating, AVG_RATING_PRECISION));
                vm.overRatingValue += ' 分 總共' + vm.ratingList.length + '次評分紀錄';
            } else {
                vm.overRatingValue = '目前尚無評分紀錄';
            }
        }

        function rateThisArticle() {
            if (vm.iAlreadyRated) {
                return;
            }

            if (vm.myRating < 0 || vm.myRating > 5) {
                return;
            }

            if (!blogRatingService || !myAccount || !myAccount.account_id) {
                submitRatingFailed('發表評分時發生錯誤，請稍後重新嘗試');
                return;
            }

            var ratingBody = {
                rater_id : myAccount.account_id,
                created_at : $filter('date')(new Date(), DATE_FORMAT),
                updated_at : $filter('date')(new Date(), DATE_FORMAT),
                rating_value : vm.myRating
            };

            // callbacks
            var submitRatingSuccessCallback = function(rating) {
                // TODO add handling code
                // create failed
                if (!rating) {
                    submitRatingFailed('發表評分時發生錯誤，請稍後重新嘗試');
                    return;
                }

                submitRatingSucceeded('評分發表成功', rating);
                // created succeeded
            };
            var submitRatingFailCallback = function(error) {
                if (error && error.message) {
                    submitRatingFailed(error.message);
                    return;
                }

                submitRatingFailed('發表評分時發生錯誤，請稍後重新嘗試');
            };

            try {
                console.log("Rating: " + vm.article.category + " " + vm.article.article_id);
                blogRatingService
                    .createRating(vm.article.category, vm.article.article_id, ratingBody)
                    .then(submitRatingSuccessCallback)
                    .catch(submitRatingFailCallback);
            } catch (e) {
                submitRatingFailed('發表評分時發生錯誤，請稍後重新嘗試');
            }
        }

        function submitRatingFailed(msg) {
            vm.iAlreadyRated = false;
            vm.ratingStatusMessage.isShown = true;
            vm.ratingStatusMessage.type = 'error';
            vm.ratingStatusMessage.message = msg;
        }

        function submitRatingSucceeded(msg, rating) {
            vm.ratingStatusMessage.isShown = true;
            vm.ratingStatusMessage.type = 'success';
            vm.ratingStatusMessage.message = msg;
            console.log("rating succeed");
            if (!vm.iAlreadyRated && rating && angular.isNumber(rating.rating_value)) {
                vm.iAlreadyRated  = true;
                vm.myRating = rating.rating_value;
                if (!vm.ratingList || !angular.isArray(vm.ratingList) || vm.ratingList.length === 0) {
                    vm.ratingList = [ vm.myRating ];
                    vm.avgRating = vm.myRating;
                } else {
                    vm.ratingList.push(vm.myRating);
                    vm.avgRating = (vm.myRating + vm.avgRating * (vm.ratingList.length - 1)) / vm.ratingList.length;
                }
            }
        }

        function findMyRating(ratingList) {
            if (!ratingList || !angular.isArray(ratingList) ||
                ratingList.length === 0 || !myAccount || !myAccount.account_id) {
                return false;
            }

            for (var i in ratingList) {
                if (!ratingList[i]) {
                    continue;
                }

                if (ratingList[i].rater_id === myAccount.account_id) {
                    vm.iAlreadyRated = true;
                    vm.myRating = ratingList[i].rating_value;
                    return true;
                }
            }

            return false;
        }

        function collapseMyRatingBar() {
            vm.isMyRatingBarCollapsed = !vm.isMyRatingBarCollapsed;
        }
    }

})();
