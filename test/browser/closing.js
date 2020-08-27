describe('Closing', function() {
    it ('should alert the host that the room is successfully closed', function(done) {
        const host = Lipwig.create(url);
        host.on('created', function() {
            host.close();
        });

        host.on('closed', function() {
            done();
        })
    });
    it ('should alert clients that the room is closed', function(done) {
        const host = Lipwig.create(url);
        host.on('created', function(code) {
            const client = Lipwig.join(url, code);
            client.on('joined', function() {
                host.close();
            });

            client.on('closed', function() {
                done();
            });
        });
    });
    it ('should alert all clients that the room is closed', function(done) {
        const host = Lipwig.create(url);
        let count = 0;
        let users = [];
        host.on('created', function(code) {
            let client;
            for (i = 0; i < 5; i++) {
                client = Lipwig.join(url, code);
                client.on('closed', function() {
                    count++;
                    if (count === users.length) {
                        done();
                    }
                });
            }
        });

        host.on('joined', function(user) {
            users.push(user);
            if (users.length === 5) {
                host.close();
            }
        })
    });

    it ('should report the reason for closing', function(done) {
        const host = Lipwig.create(url);
        host.on('created', function() {
            host.close('The reason');
        });

        host.on('closed', function(reason) {
            if (reason === 'The reason') {
                done();
            }
        });
    });
});
