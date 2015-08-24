(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogDetailController', blogDetailController);

    blogDetailController.$inject = [
        '$stateParams',
        '$rootScope',
        '$filter',
        'article',
        'author',
        'commentList',
        'ratingList',
        'avgRating',
        'myFavArticle',
        'myAccount',
        'blogCategoryList',
        'blogRatingService',
        'blogCommentService',
        'blogArticleContentService',
        'favoriteMeService'
    ];

    function blogDetailController(
        $stateParams,
        $rootScope,
        $filter,
        article,
        author,
        commentList,
        ratingList,
        avgRating,
        myFavArticle,
        myAccount,
        blogCategoryList,
        blogRatingService,
        blogCommentService,
        blogArticleContentService,
        favoriteMeService) {

        var DATE_FORMAT = 'yyyy-MM-ddTHH:mmZ';
        var MALE_STRING = 'MALE';
        var FEMALE_STRING = 'FEMALE';

        var vm = this;
        var COMMNET_MIN_LENGTH = 10;

        vm.GENDER_STRING = {
            MALE : MALE_STRING,
            FEMALE : FEMALE_STRING
        };

        vm.myAccount = myAccount;
        vm.article = article;
        vm.author = author;
        vm.commentList = commentList;
        vm.ratingList = ratingList;
        vm.avgRating = avgRating;

        vm.categoryList = blogCategoryList;
        vm.categoryName = getCategoryName(blogCategoryList, vm.article.category);

        vm.rateThisArticle = rateThisArticle;

        vm.hoverOverRating = hoverOverRating;
        vm.collapseMyRatingBar = collapseMyRatingBar;


        vm.min = 10;
        vm.commentSubmitted = false;
        vm.commentStatusMessage = {
            isShown : false,
            type    : 'error',
            message : ''
        };

        vm.commentThisArticle = commentThisArticle;
        vm.category = $stateParams ? $stateParams.category : 'all';
        vm.articleId = $stateParams.articleId;
        vm.commentMessage = "";
        vm.commentText = "";
        vm.commentSucc = false;

        // favorite
        vm.isThisArticleFavorited = myFavArticle ? true : false;
        vm.collapseFavMessage = collapseFavMessage;
        vm.favUnfavThisArticle = favUnfavThisArticle;
        vm.isFavMessageCollapsed = true;
        vm.favoriteStatusMessage = {
            isShown : false,
            type    : 'error',
            message : ''
        };

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
                                .addImageBlock('images/article-detail-bg.jpg', '圖片標題', '圖片描述')
                                .addParagraphBlock('不過，這項研究只是驗證睡眠習慣和心理健康之間關係的其中一環而已。基於睡眠和精神病理學之間關係的證據不斷增加，諾斯、科爾斯和他們大學同事希望能了解更多關於睡眠是否有助於焦慮症病患。')
                                .addAlertBlock('danger', '如果有悲觀想法請打1995 各縣市生命線!')
                                .addListBlock('ordered', ['項目一', '項目二'])
                                .addListBlock('unordered', ['項目一', '項目二'])
                                .addTableBlock([[ '#', 'First Name', 'Last Name'], [ '1', 'Stephen', 'Lin' ]])
                                .build();

        vm.testArticle = {
            category : vm.article.category,
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

        function favUnfavThisArticle() {
            if (!myAccount || !favoriteMeService) return;

            // callbacks
            var favUnfavSuccessCallback = function(idStatusList) {
                // TODO add handling code
                // create failed
                if (!idStatusList) {
                    var msg = vm.isThisArticleFavorited ?
                              '取消收藏文章時發生錯誤，請稍後重新嘗試' :
                              '收藏文章時發生錯誤，請稍後重新嘗試';
                    favUnfavFailed(msg);
                    return;
                }

                favUnfavSucceeded(!vm.isThisArticleFavorited);
            }
            var favUnfavFailCallback = function(error) {
                var msg = vm.isThisArticleFavorited ?
                              '取消收藏文章時發生錯誤，請稍後重新嘗試' :
                              '收藏文章時發生錯誤，請稍後重新嘗試';
                favUnfavFailed(msg);
            };

            if (vm.isThisArticleFavorited) {
                var favArticleIdList = [ vm.article.article_id ];
                try {
                    favoriteMeService
                        .deleteMyFavoriteArticles(favArticleIdList)
                        .then(favUnfavSuccessCallback)
                        .catch(favUnfavFailCallback);
                } catch (e) {
                    favUnfavFailed('取消收藏文章時發生錯誤，請稍後重新嘗試');
                }
            } else {
                // FIXME change placeholder implementation
                var favArticle = {
                    'article_category' : vm.article.category,
                    'article_id' : vm.article.article_id,
                    'article_title' : vm.article.title,
                    'article_created_at' : vm.article.created_at,
                    'author_category' : (vm.author && vm.author.user_info && vm.author.user_info.category) ?
                                           vm.author.user_info.category : 'placeholder',
                    'author_id' : (vm.author && vm.author.account_id) ? vm.author.account_id : 'placeholder',
                    'author_name' : (vm.author && vm.author.user_info && vm.author.user_info.name) ?
                                       vm.author.user_info.name : '醫師',
                    'favorite_at' : $filter('date')(new Date(), DATE_FORMAT)
                };
                var favArticleList = [ favArticle ];

                try {
                    favoriteMeService
                        .createMyFavoriteArticles(favArticleList)
                        .then(favUnfavSuccessCallback)
                        .catch(favUnfavFailCallback);
                } catch (e) {
                    favUnfavFailed('收藏文章時發生錯誤，請稍後重新嘗試');
                }
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

        function collapseFavMessage() {
            vm.isFavMessageCollapsed = !vm.isFavMessageCollapsed;
            vm.isMyRatingBarCollapsed = true;
        }

        function commentThisArticle() {
            vm.commentSubmitted = true;
            vm.commentStatusMessage.isShown = false;

            // invalid comment text
            if (vm.commentForm.commentText.$invalid) {
                return;
            }

            if (!blogCommentService || !myAccount || !myAccount.account_id) {
                submitCommentFailed('發表評論時發生錯誤，請稍後重新嘗試');
                return;
            }

            var commentBody = {
                commenter_id : myAccount.account_id,
                created_at : $filter('date')(new Date(), DATE_FORMAT),
                updated_at : $filter('date')(new Date(), DATE_FORMAT),
                comment_text : vm.commentText,
                author_response_text: "asd",
                responded_at: $filter('date')(new Date(), DATE_FORMAT)
            };

            // callbacks
            var submitCommentSuccessCallback = function(comment) {
                // TODO add handling code
                // create failed
                if (!comment) {
                    submitCommentFailed('發表評論時發生錯誤，請稍後重新嘗試');
                    return;
                }

                submitCommentSucceeded('評論發表成功', comment);
                // created succeeded
            }
            var submitCommentFailCallback = function(error) {
                if (error && error.message) {
                    submitCommentFailed(error.message);
                    return;
                }

                submitCommentFailed('發表評論時發生錯誤，請稍後重新嘗試');
            };

            try {
                blogCommentService
                    .createComment(vm.category, vm.articleId, commentBody)
                    .then(submitCommentSuccessCallback)
                    .catch(submitCommentFailCallback);
            } catch (e) {
                submitCommentFailed('發表評論時發生錯誤，請稍後重新嘗試');
            }
        }

        function submitCommentFailed(msg) {
            vm.commentSubmitted = false;
            vm.commentStatusMessage.isShown = true;
            vm.commentStatusMessage.type = 'error';
            vm.commentStatusMessage.message = msg;
        }

        function submitCommentSucceeded(msg, comment) {
            vm.commentSubmitted = false;
            vm.commentStatusMessage.isShown = true;
            vm.commentStatusMessage.type = 'success';
            vm.commentStatusMessage.message = msg;
            vm.commentText = '';

            // add myAccount to comment
            comment.user = vm.myAccount;

            if (!vm.commentList || !angular.isArray(vm.commentList) || vm.commentList.length === 0) {
                vm.commentList = [ comment ];
            } else {
                vm.commentList.push(comment);
            }
        }

        function favUnfavFailed(msg) {
            vm.isFavMessageCollapsed = false;
            vm.isMyRatingBarCollapsed = true;

            vm.favoriteStatusMessage.isShown = true;
            vm.favoriteStatusMessage.type = 'error';
            vm.favoriteStatusMessage.message = msg;
        }

        function favUnfavSucceeded(isFavorited) {
            vm.isThisArticleFavorited = isFavorited;
            vm.isFavMessageCollapsed = true;
        }

        function getCategoryName(categoryList, category) {
            if (!categoryList || !angular.isArray(categoryList) || categoryList === 0) {
                return '';
            }

            if (!category) {
                return '';
            }

            for (var i in categoryList) {
                if (!categoryList[i]) {
                    continue;
                }

                if (categoryList[i].name === category) {
                    return categoryList[i].text;
                }
            }

            return '';
        }
    }
/*

*/
})();
