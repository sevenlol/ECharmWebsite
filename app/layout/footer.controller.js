(function() {
	'use strict';

	angular.module('app.layout')
	       .controller('footerController', footerController);

	footerController.$inject = [
	    '$document'
	];

	function footerController($document) {
	    var vm = this;
	    vm.scrollToTop = function() {
	        $document.scrollTopAnimated(0, 2000).then(function() {
	            console && console.log('You just scrolled to the top!');
	        });
	    }
	}
})();
