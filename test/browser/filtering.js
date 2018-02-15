describe('Groups', function() {
    describe('Filtering', function() {
        it('should only send to whitelisted groups', function(done) {
            let client1;
            let client2;
            let client3;
            let count = 0;
            let users = 0;
            const host = Lipwig.create('ws://localhost:8080');
            host.on('created', function(code) {
                client1 = Lipwig.join('ws://localhost:8080', code);

                client1.on('ping', function() {
                    count++;
                    if (count === 2) { // TODO: This might have added a race condition
                        done();
                    }
                });

                client2 = Lipwig.join('ws://localhost:8080', code);

                client2.on('ping', function() {
                    count++;
                    if (count === 2) { // TODO: This might have added a race condition
                        done();
                    }
                });
                client3 = Lipwig.join('ws://localhost:8080', code);
    
                client3.on('ping', function() {
                    throw new Error();
                })
            });

            host.on('joined', function(user) {
                if (user.id === client1.id || user.id === client2.id) {
                    user.assign('main');
                }
                users++;
                if (users === 3) {
                    host.send('ping', {
                        whitelist: ['main']
                    });
                }
            });
        });

        it('should not send to blacklist groups', function(done) {
            let client1;
            let client2;
            let client3;
            let count = 0;
            let users = 0;
            const host = Lipwig.create('ws://localhost:8080');
            host.on('created', function(code) {
                client1 = Lipwig.join('ws://localhost:8080', code);

                client1.on('ping', function() {
                    count++;
                    if (count === 2) { // TODO: This might have added a race condition
                        done();
                    }
                });

                client2 = Lipwig.join('ws://localhost:8080', code);

                client2.on('ping', function() {
                    count++;
                    if (count === 2) { // TODO: This might have added a race condition
                        done();
                    }
                });
                client3 = Lipwig.join('ws://localhost:8080', code);
    
                client3.on('ping', function() {
                    throw new Error();
                })
            });

            host.on('joined', function(user) {
                if (user.id === client3.id) {
                    user.assign('main');
                }
                users++;
                if (users === 3) {
                    host.send('ping', {
                        blacklist: ['main']
                    });
                }
            });
        });

        it('should allow for a whitelist/blacklist mixture', function(done) {
            let client1;
            let client2;
            let client3;
            let count = 0;
            let users = 0;
            const host = Lipwig.create('ws://localhost:8080');
            host.on('created', function(code) {
                client1 = Lipwig.join('ws://localhost:8080', code);

                client1.on('ping', function() {
                    alert('a');
                    throw new Error();
                });

                client2 = Lipwig.join('ws://localhost:8080', code);

                client2.on('ping', function() {
                    alert('b');
                    done();
                });
                client3 = Lipwig.join('ws://localhost:8080', code);
    
                client3.on('ping', function() {
                    alert('c');
                    throw new Error();
                })
            });

            host.on('joined', function(user) {
                if (user.id === client1.id || user.id === client2.id) {
                    user.assign('main');
                }

                if (user.id === client1.id || user.id === client3.id) {
                    user.assign('secondary');
                }
                users++;
                if (users === 3) {
                    host.send('ping', {
                        whitelist: ['main'],
                        blacklist: ['secondary']
                    });
                }
            });
        });
    })
})