module.exports = {
    port: 5001,
    database: {
        host: [
            'k121-shard-00-00-jdjv3.mongodb.net:27017',
            'k121-shard-00-01-jdjv3.mongodb.net:27017',
            'k121-shard-00-02-jdjv3.mongodb.net:27017'
        ],
        name: 'k121',
        user: 'admin',
        pass: 'aN9fK7jqaNaBbmzt',
		authSource: 'admin',
		ssl: true,
		replicaSetName: 'k121-shard-0',
        url: `mongodb://localhost:27017/k121`
    },
    email: {
        apiKey: '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',
    }
};