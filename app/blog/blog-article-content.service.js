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

		/* service object */
		var service = {
			Builder : ArticleContentBuilder,
			Constant : {
				BLOCK_TYPE : BLOCK_TYPE
			}
		};
		return service;

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

			for (var i in intros) {
				var intro = intros[i];
				if (!intro || !angular.isString(intro)) {
					intros.splice(i--, 1);
				}
			}

			this.intros = intros;
			return this;
		}
		ArticleContentBuilder.prototype.setRefs = function(refs) {
			if (!refs || !angular.isArray(refs)) {
				return this;
			}

			for (var i in refs) {
				var ref = refs[i];
				if (!ref || !angular.isString(ref)) {
					refs.splice(i--, 1);
				}
			}

			this.refs = refs;
			return this;
		}
		ArticleContentBuilder.prototype.addHeadingBlock = function(size, content) {

		}
		ArticleContentBuilder.prototype.addParagraphBlock = function(content) {

		}
		ArticleContentBuilder.prototype.addImageBlock = function(url, caption) {

		}
		ArticleContentBuilder.prototype.addAlertBlock = function(style, message) {

		}
		ArticleContentBuilder.prototype.addListBlock = function(style, content) {

		}
		ArticleContentBuilder.prototype.addTableBlock = function(content) {

		}
	}

})();
