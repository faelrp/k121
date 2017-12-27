(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', Controller);

    Controller.$inject = ['$transitions'];
    function Controller($transitions) {
        var vm = this;

        vm.selectedItem = "";

        ////////////////

        $transitions.onSuccess({}, function(trans) {
            vm.selectedItem = trans.to().data.selectedItem;
        });
    }
})();