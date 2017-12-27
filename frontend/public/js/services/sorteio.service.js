(function () {
    'use strict';

    angular
        .module('app')
        .service('SorteioService', Service);

    Service.$inject = ['$http', '$interpolate', 'Endpoint'];
    function Service($http, $interpolate, endpoint) {
        this.doIt = doIt;

        ////////////////

        function doIt() {

            var url = endpoint.api + endpoint.sorteio;

            return $http
                .post(url, {})
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