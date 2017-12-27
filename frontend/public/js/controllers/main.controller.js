(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', Controller);

    Controller.$inject = ['$transitions', '$state'];
    function Controller($transitions, $state) {
        var vm = this;

        vm.selectedItem = "";

        ////////////////

        $transitions.onSuccess({}, function(trans) {
            vm.selectedItem = trans.to().data.selectedItem;
        });

        $state.go('pessoas');
    }
})();