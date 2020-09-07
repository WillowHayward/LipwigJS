describe('Messaging', function () {
    it('should allow for rooms to be created', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function() {
            done();
        });
    });

    it('should allow for rooms to be joined', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function(code) {
            const client = new LipwigClient(url, code);
            client.on('joined', function() {
                done();
            })
        });
    });

    it('should allow for messages to be sent from the host to an arbitrary user', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function(code) {
            const client = new LipwigClient(url, code);
            client.on('done', function() {
                done();
            });
        });

        host.on('joined', function(user) {
            user.send('done');
        });
    });

    it('should allow for once messages to only trigger once', function(done) {
        const host = new LipwigHost(url);
        let mainUser;
        host.on('created', function(code) {
            const client = new LipwigClient(url, code);
            client.on('once', function() {
              done()
              mainUser.send('once');
            });
        });

        host.on('joined', function(user) {
            mainUser = user;
            user.send('once');
        });
    });

    it('should allow for messages to be sent from a user to the host', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function(code) {
            const client = new LipwigClient(url, code);
            client.on('joined', function() {
                client.send('done');
            });
        });

        host.on('done', function() {
            done();
        })
    });

    it('should allow for messages to be sent to and from the host and an arbitrary user', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function(code) {
            const client = new LipwigClient(url, code);
            client.on('joined', function() {
                client.send('poke');
            })

            client.on('poked', function() {
                done();
            });
        });

        host.on('poke', function(user) {
            user.send('poked');
        });
    });

    it('should allow for messages to be sent from the host to specific users', function(done) {
        let count = 0;
        const host = new LipwigHost(url);
        host.on('created', function(code) {
            for (i = 0; i < 8; i++) {
                client = new LipwigClient(url, code);
                client.on('add', function() {
                    count++;
                    if (count === 4) {
                        done();
                    }
                });
            }
        });

        const users = [];

        host.on('joined', function(user) {
            users.push(user);
            if (users.length === 8) {
                for (i = 0; i < 8; i+= 2) {
                    users[i].send('add');
                }
            }
        });
    });
  
    it('should allow for multiple, independent rooms', function(done) {
        // TODO: Implement this
        done();
    });
  });
