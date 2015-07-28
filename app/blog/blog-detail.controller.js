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
                                .addIntro('不過，這項研究只是驗證睡眠習慣和心理健康之間關係的其中一環而已。')
                                // .addIntro('Intro 2')
                                .addRef('Don’t worry, be happy: Just go to bed earlier. [DECEMBER 4, 2014]')
                                .addRef('Nota, J. A., & Coles, M. E. (2014). Duration and Timing of Sleep are Associated with Repetitive Negative Thinking. Cognitive Therapy and Research, 1-9.')
                                // .addHeadingBlock(1, 'Heading 1')
                                // .addHeadingBlock(2, 'Heading 2')
                                // .addHeadingBlock(3, '小標題 SIZE3')
                                // .addHeadingBlock(4, '小標題 SIZE4')
                                // .addHeadingBlock(5, 'Heading 5')
                                // .addHeadingBlock(6, 'Heading 6')
                                .addParagraphBlock('美國賓漢姆頓大學（ <strong>Binghamton University</strong> ）的雅各．諾塔（<a href="#">Jacob Nota</a>）和梅瑞狄斯．科爾斯（Meredith Coles ），他們發現睡眠時間較短或晚睡的人，較容易產生消極想法，而這項發現被刊登於《認知治療與研究》（Cognitive Therapy and Research）期刊。')
                                .addHeadingBlock(4, '小標題 SIZE4')
                                .addParagraphBlock('常有煩人的悲觀思想不斷重複浮現在腦海中，甚至認為自己幾乎無法控制自己的思考，且會過度擔心未來，同時又鑽牛角尖於過去，腦中不斷冒出惱人卻又揮之不去的想法。這些症狀常見於廣泛性焦慮症（generalized anxiety disorder）、抑鬱症（ major depressive disorder）、創傷後壓力心理障礙症（post-traumatic stress disorder）、強迫症（obsessive-compulsive disorder，簡稱 OCD）和社交焦慮失協症（social anxiety disorder，簡稱 SAD），而這些病患也同樣具有睡眠狀況。')
                                .addImageBlock('images/article-detail-bg.jpg', '圖片標題')
                                .addParagraphBlock('不過，這項研究只是驗證睡眠習慣和心理健康之間關係的其中一環而已。基於睡眠和精神病理學之間關係的證據不斷增加，諾斯、科爾斯和他們大學同事希望能了解更多關於睡眠是否有助於焦慮症病患。')
                                .addAlertBlock('danger', '如果有悲觀想法請打1995 各縣市生命線!')
                                .addListBlock('ordered', ['項目一', '項目二'])
                                .addListBlock('unordered', ['項目一', '項目二'])
                                .addTableBlock([[ '#', 'First Name', 'Last Name'], [ '1', 'Stephen', 'Lin' ]])
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
