(function () {
    'use strict';

    angular
        .module('app')
        .service('PessoaService', Service);

    Service.$inject = ['$http', '$interpolate', 'Endpoint'];
    function Service($http, $interpolate, endpoint) {
        this.getAll = getAll;
        this.add = add;
        this.edit = edit;
        this.remove = remove;

        ////////////////

        function getAll() {

            var url = endpoint.api + endpoint.pessoas;

            return $http
                .get(url)
                .then(success, failure);
        }

        function add(pessoa) {

            var url = endpoint.api + endpoint.pessoas;

            return $http
                .post(url, pessoa)
                .then(success, failure);
        }

        function edit(pessoa) {

            var url = endpoint.api + endpoint.pessoas;

            return $http
                .put(url, pessoa)
                .then(success, failure);
        }

        function remove(pessoa) {

            var url = endpoint.api + $interpolate(endpoint.pessoasId)({ _id: pessoa._id});

            return $http
                .delete(url, pessoa)
                .then(success, failure);
        }

        function success(response) {
            return response.data;
        }

        function failure(err) {
            return err.data;
        }
    }
})();