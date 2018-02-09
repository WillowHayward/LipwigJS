describe('Lipwig', function () {

    it('should allow for rooms to be created', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function() {
            done();
        });
    });

    it('should allow for rooms to be joined', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            const client = Lipwig.join('ws://localhost:8080', code);
            client.on('joined', function() {
                done();
            })
        });
    });

    it('should allow for messages to be sent from the host to an arbitrary user', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            const client = Lipwig.join('ws://localhost:8080', code);
            client.on('done', function() {
                done();
            });
        });

        host.on('joined', function(user) {
            user.send('done');
        });
    });

    it('should allow for messages to be sent from a user to the host', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            const client = Lipwig.join('ws://localhost:8080', code);
            client.on('joined', function() {
                client.send('done');
            })
        });

        host.on('done', function() {
            done();
        })
    });

    it('should allow for messages to be sent to and from the host and an arbitrary user', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            const client = Lipwig.join('ws://localhost:8080', code);
            client.on('joined', function() {
                client.send('ping');
            })

            client.on('pong', function() {
                done();
            });
        });

        host.on('ping', function(user) {
            user.send('pong');
        });
    });

    it('should allow for messages to be sent from the host to specific users', function(done) {
        let count = 0;
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            for (i = 0; i < 8; i++) {
                client = Lipwig.join('ws://localhost:8080', code);
                client.on('add', function() {
                    count++;
                });
                client.on('finish', function() {
                    if (count === 4) {
                        done();
                    }
                })
            }
        });

        const users = [];

        host.on('joined', function(user) {
            users.push(user);
            if (users.length === 8) {
                for (i = 0; i < 8; i+= 2) {
                    users[i].send('add');
                }

                users[0].send('finish'); // TODO: This adds a race condition. Fix that
            }
        });
    });
  
    it('should allow for multiple, independent rooms', function(done) {
        // TODO: Implement this
        done();
    });
  });