(function () {
    'use strict';

    angular
        .module('app')
        .controller('PessoaController', Controller);

    Controller.$inject = ['PessoaService'];
    function Controller(pessoaService) {

        var vm = this;

        vm.edit = edit;
        vm.remove = remove;

        activate();

        ////////////////

        function activate() {

            pessoaService.getAll()
                .then(function (result) {
                    vm.pessoas = result;
                });
        }

        function edit() {

        }

        function remove(pessoa) {
            pessoaService.remove(pessoa)
                .then(function (result) {
                    _.remove(vm.pessoas, { _id: pessoa._id })
                });
        }
    }
})();