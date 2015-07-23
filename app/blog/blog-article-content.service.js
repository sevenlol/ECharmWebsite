(function() {
    'use strict';

    angular
        .module('app.blog')
        .factory('blogArticleContentService', blogArticleContentService);

    blogArticleContentService.$inject = [
    ];

    function blogArticleContentService() {
        /* constants */
        var BLOCK_TYPE = {
            HEADING : 'heading',
            PARAGRAPH : 'paragraph',
            IMAGE : 'image',
            ALERT : 'alert',
            LIST : 'list',
            TABLE : 'table'
        };

        var ALERT_STYLE = {
            INFO : 'info',
            ERROR : 'error',
            WARN : 'warn',
            SUCCESS : 'success',
            DEFAULT : 'default'
        };

        var LIST_STYLE = {
            ORDERED : 'ordered',
            UNORDERED : 'unordered'
        };

        /* service object */
        var service = {
            Builder : ArticleContentBuilder,
            Constant : {
                BLOCK_TYPE : BLOCK_TYPE,
                ALERT_STYLE : ALERT_STYLE,
                LIST_STYLE : LIST_STYLE
            },
            validate : validate,
            parse : parse
        };

        /* public functions */

        function ArticleContentBuilder() {
            this.intros = [];
            this.blocks = [];
            this.refs = [];
        }
        ArticleContentBuilder.prototype.setIntros = function(intros) {
            if (!intros || !angular.isArray(intros)) {
                return this;
            }

            for (var i = 0; i < intros.length; i++) {
                var intro = intros[i];
                if (!intro || !angular.isString(intro)) {
                    intros.splice(i--, 1);
                }
            }

            this.intros = intros;
            return this;
        }
        ArticleContentBuilder.prototype.addIntro = function(intro) {
            if (!intro || !angular.isString(intro)) {
                return this;
            }

            this.intros.push(intro);
            return this;
        }
        ArticleContentBuilder.prototype.setRefs = function(refs) {
            if (!refs || !angular.isArray(refs)) {
                return this;
            }

            for (var i = 0; i < refs.length; i++) {
                var ref = refs[i];
                if (!ref || !angular.isString(ref)) {
                    refs.splice(i--, 1);
                }
            }

            this.refs = refs;
            return this;
        }
        ArticleContentBuilder.prototype.addRef = function(ref) {
            if (!ref || !angular.isString(ref)) {
                return this;
            }

            this.refs.push(ref);
            return this;
        }
        ArticleContentBuilder.prototype.addHeadingBlock = function(size, content) {
            if (!angular.isNumber(size)) {
                return this;
            }

            if (!content || !angular.isString(content)) {
                return this;
            }

            var heading = {
                block_type : BLOCK_TYPE.HEADING,
                heading_size : size,
                block_content : content
            };

            this.blocks.push(heading);
            return this;
        }
        ArticleContentBuilder.prototype.addParagraphBlock = function(content) {
            if (!content || !angular.isString(content)) {
                return this;
            }

            var paragraph = {
                block_type : BLOCK_TYPE.PARAGRAPH,
                block_content : content
            };

            this.blocks.push(paragraph);
            return this;
        }
        ArticleContentBuilder.prototype.addImageBlock = function(url, caption) {
            if (!url || !angular.isString(url)) {
                return this;
            }

            // allow empty string
            if (!angular.isString(caption)) {
                return this;
            }

            var image = {
                block_type : BLOCK_TYPE.IMAGE,
                url : url,
                img_caption : caption
            };

            this.blocks.push(image);
            return this;
        }
        ArticleContentBuilder.prototype.addAlertBlock = function(style, message) {
            if (!style || !angular.isString(style)) {
                return this;
            }

            if (!message || !angular.isString(message)) {
                return this;
            }

            if (style !== ALERT_STYLE.INFO && style !== ALERT_STYLE.ERROR && style !== ALERT_STYLE.WARN &&
                style !== ALERT_STYLE.SUCCESS && style !== ALERT_STYLE.DEFAULT) {
                return this;
            }

            var alert = {
                block_type : BLOCK_TYPE.ALERT,
                alert_style : style,
                message : message
            };

            this.blocks.push(alert);
            return this;
        }
        ArticleContentBuilder.prototype.addListBlock = function(style, content) {
            if (!style || !angular.isString(style)) {
                return this;
            }

            if (!content || !angular.isArray(content) || content.length === 0) {
                return this;
            }

            if (style !== LIST_STYLE.ORDERED && style !== LIST_STYLE.UNORDERED) {
                return this;
            }

            var list = {
                block_type : BLOCK_TYPE.LIST,
                list_style : style,
                block_content : content
            };

            this.blocks.push(list);
            return this;
        }
        ArticleContentBuilder.prototype.addTableBlock = function(content) {

            if (!content || !angular.isArray(content) || content.length === 0) {
                return this;
            }

            for (var i = 0; i < content.length; i++) {
                var row = content[i];

                if (!row || !angular.isArray(row) || row.length === 0) {
                    content.splice(i--, 1);
                }
            }

            var table = {
                block_type : BLOCK_TYPE.TABLE,
                block_content : content
            };

            this.blocks.push(table);
            return this;
        }
        ArticleContentBuilder.prototype.build = function() {
            var intros = angular.copy(this.intros);
            var blocks = angular.copy(this.blocks);
            var refs = angular.copy(this.refs);

            var articleContent = {
                /* fields */
                intros : intros,
                blocks : blocks,
                refs : refs,

                /* functions */
                toJSONString : toJSONString,
                toPrettyJSONString : toPrettyJSONString
            };
            return articleContent;

            /* functions */

            function toJSONString() {
                return JSON.stringify(this);
            }

            function toPrettyJSONString() {
                return JSON.stringify(this, null, 2);
            }
        }

        /* return service object here */
        return service;

        function validate(articleContent) {
            if (!articleContent || !angular.isObject(articleContent)) {
                return false;
            }

            var intros = articleContent.intros;
            if (!intros || !angular.isArray(intros)) {
                return false;
            }
            for (var i in intros) {
                if (!intros[i] || !angular.isString(intros[i])) {
                    return false;
                }
            }

            var blocks = articleContent.blocks;
            if (!blocks || !angular.isArray(blocks)) {
                return false;
            }
            for (var i in blocks) {
                if (!blocks[i] || !angular.isObject(blocks[i])) {
                    return false;
                }

                switch(blocks[i].block_type) {
                    case BLOCK_TYPE.HEADING:
                        if (!validateHeadingBlock(blocks[i])) {
                            return false;
                        }
                        break;
                    case BLOCK_TYPE.PARAGRAPH:
                        if (!validateParagraphBlock(blocks[i])) {
                            return false;
                        }
                        break;
                    case BLOCK_TYPE.IMAGE:
                        if (!validateImageBlock(blocks[i])) {
                            return false;
                        }
                        break;
                    case BLOCK_TYPE.ALERT:
                        if (!validateAlertBlock(blocks[i])) {
                            return false;
                        }
                        break;
                    case BLOCK_TYPE.LIST:
                        if (!validateListBlock(blocks[i])) {
                            return false;
                        }
                        break;
                    case BLOCK_TYPE.TABLE:
                        if (!validateTableBlock(blocks[i])) {
                            return false;
                        }
                        break;
                    default :
                        return false;
                }
            }

            var refs = articleContent.refs;
            if (!refs || !angular.isArray(refs)) {
                return false;
            }
            for (var i in refs) {
                if (!refs[i] || !angular.isString(refs[i])) {
                    return false;
                }
            }

            return true;
        }

        function parse(articleContentStr) {
            var emptyArticleContent = {
                intros : [],
                blocks : [],
                refs : []
            };

            var articleContent = JSON.parse(articleContentStr);
            if (!articleContent || !angular.isObject(articleContent)) {
                return emptyArticleContent;
            }

            var intros = articleContent.intros;
            if (!intros || !angular.isArray(intros)) {
                articleContent.intros = [];
            }
            for (var i =0; i < articleContent.intros.length; i++) {
                var intro = articleContent.intros[i];
                if (!intro || !angular.isString(intro)) {
                    articleContent.intros.splice(i--, 1);
                }
            }

            var blocks = articleContent.blocks;
            if (!blocks || !angular.isArray(blocks)) {
                articleContent.blocks = [];
            }
            for (var i =0; i < articleContent.blocks.length; i++) {
                var block = articleContent.blocks[i];
                if (!block || !angular.isObject(block)) {
                    articleContent.blocks.splice(i--, 1);
                }

                switch(block.block_type) {
                    case BLOCK_TYPE.HEADING:
                        if (!validateHeadingBlock(block)) {
                            articleContent.blocks.splice(i--, 1);
                        }
                        break;
                    case BLOCK_TYPE.PARAGRAPH:
                        if (!validateParagraphBlock(block)) {
                            articleContent.blocks.splice(i--, 1);
                        }
                        break;
                    case BLOCK_TYPE.IMAGE:
                        if (!validateImageBlock(block)) {
                            articleContent.blocks.splice(i--, 1);
                        }
                        break;
                    case BLOCK_TYPE.ALERT:
                        if (!validateAlertBlock(block)) {
                            articleContent.blocks.splice(i--, 1);
                        }
                        break;
                    case BLOCK_TYPE.LIST:
                        if (!validateListBlock(block)) {
                            articleContent.blocks.splice(i--, 1);
                        }
                        break;
                    case BLOCK_TYPE.TABLE:
                        if (!validateTableBlock(block)) {
                            articleContent.blocks.splice(i--, 1);
                        }
                        break;
                    default :
                        articleContent.blocks.splice(i--, 1);
                }
            }

            var refs = articleContent.refs;
            if (!refs || !angular.isArray(refs)) {
                articleContent.refs = [];
            }
            for (var i =0; i < articleContent.refs.length; i++) {
                var ref = articleContent.refs[i];
                if (!ref || !angular.isString(ref)) {
                    articleContent.refs.splice(i--, 1);
                }
            }

            return articleContent;
        }

        /* private functions */

        function validateHeadingBlock(block) {
            if (block.block_type !== BLOCK_TYPE.HEADING) {
                return false;
            }

            if (!angular.isNumber(block.heading_size)) {
                return false;
            }

            if (!block.block_content || !angular.isString(block.block_content)) {
                return false;
            }

            return true;
        }

        function validateParagraphBlock(block) {
            if (block.block_type !== BLOCK_TYPE.PARAGRAPH) {
                return false;
            }

            if (!block.block_content || !angular.isString(block.block_content)) {
                return false;
            }

            return true;
        }

        function validateImageBlock(block) {
            if (block.block_type !== BLOCK_TYPE.IMAGE) {
                return false;
            }

            if (!block.url || !angular.isString(block.url)) {
                return false;
            }

            // allow empty string
            if (!angular.isString(block.img_caption)) {
                return false;
            }

            return true;
        }

        function validateAlertBlock(block) {
            if (block.block_type !== BLOCK_TYPE.ALERT) {
                return false;
            }

            if (!block.alert_style || !angular.isString(block.alert_style)) {
                return false;
            }
            if (block.alert_style !== ALERT_STYLE.INFO && block.alert_style !== ALERT_STYLE.ERROR && block.alert_style !== ALERT_STYLE.WARN &&
                block.alert_style !== ALERT_STYLE.SUCCESS && block.alert_style !== ALERT_STYLE.DEFAULT) {
                return false;
            }

            if (!block.message || !angular.isString(block.message)) {
                return false;
            }

            return true;
        }

        function validateListBlock(block) {
            if (block.block_type !== BLOCK_TYPE.LIST) {
                return false;
            }

            if (!block.list_style || !angular.isString(block.list_style)) {
                return false;
            }
            if (block.list_style !== LIST_STYLE.ORDERED && block.list_style !== LIST_STYLE.UNORDERED) {
                return false;
            }

            if (!block.block_content || !angular.isArray(block.block_content) || block.block_content.length === 0) {
                return false;
            }

            return true;
        }

        function validateTableBlock(block) {
            if (block.block_type !== BLOCK_TYPE.TABLE) {
                return false;
            }

            if (!block.block_content || !angular.isArray(block.block_content) || block.block_content.length === 0) {
                return false;
            }

            for (var i in block.block_content) {
                var row = block.block_content[i];
                if (!row || !angular.isArray(row) || row.length === 0) {
                    return false;
                }
            }

            return true;
        }
    }

})();
