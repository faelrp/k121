(function() {
    'use strict';

    angular.module('app')
        .constant('Endpoint', {
            api: 'http://localhost:5001/api',
            pessoas: '/pessoas',
            pessoasId: '/pessoas/{{_id}}'
        });
})();