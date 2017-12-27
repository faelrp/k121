(function() {
    'use strict';

    angular.module('app')
        .constant('Endpoint', {
            api: 'http://localhost:5001',
            pessoas: '/pessoas',
            pessoasId: '/pessoas/{{_id}}',
            sorteio: '/sorteio'
        });
})();