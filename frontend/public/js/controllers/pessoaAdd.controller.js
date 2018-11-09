(function () {
    'use strict';

    angular
        .module('app')
        .controller('PessoaAddController', Controller);

    Controller.$inject = ['$mdToast', '$state', '$stateParams', 'PessoaService'];
    function Controller($mdToast, $state, $stateParams, pessoaService) {

        var vm = this;

        vm.editing = false;

        vm.save = save;

        vm.user = {};

        activate();

        ////////////////

        function activate() {
            if ($stateParams.pessoa) {
                vm.editing = true;
                vm.user = $stateParams.pessoa;
            }
        }

        function save() {
            if (!vm.editing) {
                add();
            } else {
                edit();
            }
            
        }

        function add() {
            pessoaService.add(vm.user)
                .then(function (result) {
                    var message = "";
                    if (result._id) {
                        message = "People Added!";
                        $state.go('pessoas');
                    } else {
                        message = result.message || "Unabled to Added";
                    }

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(message)
                            .position('top right')
                            .hideDelay(3000)
                    );
                });
        }

        function edit() {
            pessoaService.edit(vm.user)
                .then(function (result) {
                    var message = "";
                    if (result._id) {
                        message = "People Updated!";
                        $state.go('pessoas');
                    } else {
                        message = result.message || "Unabled to Update";
                    }

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(message)
                            .position('top right')
                            .hideDelay(3000)
                    );
                });
        }
    }
})();