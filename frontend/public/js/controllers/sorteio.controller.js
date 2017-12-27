(function () {
    'use strict';

    angular
        .module('app')
        .controller('SorteioController', Controller);

    Controller.$inject = ['PessoaService', 'SorteioService', '$mdToast'];
    function Controller(pessoaService, sorteioService, $mdToast) {

        var vm = this;

        vm.sorteio = sorteio;

        activate();

        ////////////////

        function activate() {
        }

        function sorteio() {
            sorteioService.doIt()
                .then(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Sorteio dos amigos secretos foram enviados por email :)')
                            .position('top right')
                            .hideDelay(3000)
                    );
                });
        }
    }
})();