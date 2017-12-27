(function () {
    'use strict';

    angular
        .module('app')
        .controller('SorteioController', Controller);

    Controller.$inject = ['PessoaService'];
    function Controller(pessoaService) {

        var vm = this;

        vm.sorteio = sorteio;

        activate();

        ////////////////

        function activate() {
        }

        function sorteio() {
            console.log('test');
        }
    }
})();