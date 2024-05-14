const newman = require('newman');

newman.run({
    collection: {
        item: [
            {
                name: 'Criar conta',
                request: {
                    method: 'POST',
                    header: [],
                    body: {
                        mode: 'raw',
                        raw: JSON.stringify({
                            "type": "deposit",
                            "destination": "100",
                            "amount": 10
                        })
                    },
                    url: {
                        raw: 'http://localhost:3000/event',
                        protocol: 'http',
                        host: ['localhost'],
                        port: '3000',
                        path: ['event']
                    }
                },
                response: []
            },
            {
                name: 'Depositar',
                request: {
                    method: 'POST',
                    header: [],
                    body: {
                        mode: 'raw',
                        raw: JSON.stringify({
                            "type": "deposit",
                            "destination": "123",
                            "amount": 2000
                        })
                    },
                    url: {
                        raw: 'http://localhost:3000/event',
                        protocol: 'http',
                        host: ['localhost'],
                        port: '3000',
                        path: ['event']
                    }
                },
                response: []
            },
            {
                name: 'Obter saldo',
                request: {
                    method: 'GET',
                    header: [],
                    body: {},
                    url: {
                        raw: 'http://localhost:3000/balance?account_id=123',
                        protocol: 'http',
                        host: ['localhost'],
                        port: '3000',
                        path: ['balance'],
                        query: [
                            {
                                key: 'account_id',
                                value: '123'
                            }
                        ]
                    }
                },
                response: []
            },
            {
                name: 'Retirar dinheiro',
                request: {
                    method: 'POST',
                    header: [],
                    body: {
                        mode: 'raw',
                        raw: JSON.stringify({
                            "type": "withdraw",
                            "origin": "123",
                            "amount": 1000
                        })
                    },
                    url: {
                        raw: 'http://localhost:3000/event',
                        protocol: 'http',
                        host: ['localhost'],
                        port: '3000',
                        path: ['event']
                    }
                },
                response: []
            }
        ]
    }
}, function (err, summary) {
    if (err) {
        console.error('Erro nos testes:', err);
    } else {
        console.log('Testes executados com sucesso:', summary);
    }
});
