(function() {
    'use strict';

    angular.module('app', [
        'ngMaterial',
        'ui.router'
    ])
    .config(['$mdThemingProvider', '$stateProvider',
        function($mdThemingProvider, $stateProvider) {
            // $mdThemingProvider.theme('default').dark();
            $mdThemingProvider.theme('default')
                .dark()
                .primaryPalette('blue');

            var pessoas = {
                name: 'pessoas',
                url: '/pessoas',
                templateUrl: 'templates/pessoas.html',
                data: {
                    selectedItem: 'Pessoas'
                }
            };
            
            var pessoasAdd = {
                name: 'add',
                url: '/pessoas/add',
                templateUrl: 'templates/pessoasAdd.html',
                data: {
                    selectedItem: 'Add'
                }
            };

            var pessoasEdit = {
                name: 'edit',
                url: '/pessoas/edit',
                templateUrl: 'templates/pessoasAdd.html',
                data: {
                    selectedItem: 'Add'
                },
                params: {
                    pessoa: null
                }
            };

            var sorteio = {
                name: 'sorteio',
                url: '/sorteio',
                templateUrl: 'templates/sorteio.html',
                data: {
                    selectedItem: 'Sorteio'
                }
            };

            $stateProvider
                .state(pessoas)
                .state(pessoasAdd)
                .state(pessoasEdit)
                .state(sorteio);
    }]);
})();