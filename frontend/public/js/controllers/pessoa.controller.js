(function () {
    'use strict';

    angular
        .module('app')
        .controller('PessoaController', Controller);

    Controller.$inject = ['PessoaService', '$state'];
    function Controller(pessoaService, $state) {

        var vm = this;

        vm.remove = remove;
        vm.addPerson = addPerson;

        activate();

        ////////////////

        function activate() {

            pessoaService.getAll()
                .then(function (result) {
                    vm.pessoas = result;
                });
        }

        function addPerson() {
            $state.go('add');
        }

        function remove(pessoa) {
            pessoaService.remove(pessoa)
                .then(function (result) {
                    _.remove(vm.pessoas, { _id: pessoa._id })
                });
        }
    }
})();