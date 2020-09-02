/**
// NOTE: These tests have seem to interfere with each other
// CONT: I believe this is because they originally all used non-arrow functions
describe('Groups', function() {
    describe('Filtering', function() {
        it('should only send to whitelisted groups', function(done) {
            let client1;
            let client2;
            let client3;
            let count = 0;
            let users = 0;
            const host = new LipwigHost(url);
            host.on('created', (code) => {
                client1 = new LipwigClient(url, code);

                client1.on('poke', () => {
                    count++;
                    if (count === 2) { // TODO: This might have added a race condition
                        done();
                    }
                });

                client2 = new LipwigClient(url, code);

                client2.on('poke', () => {
                    count++;
                    if (count === 2) { // TODO: This might have added a race condition
                        done();
                    }
                });
                client3 = new LipwigClient(url, code);
    
                client3.on('poke', () => {
                    throw new Error('Should not have poked client3');
                })
            });

            host.on('joined', (user) => {
                if (user.id === client1.id || user.id === client2.id) {
                    user.assign('main');
                }
                users++;
                if (users === 3) {
                    host.send('poke', {
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
            const host = new LipwigHost(url);
            host.on('created', (code) => {
                client1 = new LipwigClient(url, code);

                client1.on('poke', () => {
                    count++;
                    if (count === 2) { // TODO: This might have added a race condition
                        done();
                    }
                });

                client2 = new LipwigClient(url, code);

                client2.on('poke', () => {
                    count++;
                    if (count === 2) { // TODO: This might have added a race condition
                        done();
                    }
                });
                client3 = new LipwigClient(url, code);
    
                client3.on('poke', () => {
                    throw new Error('Should not have poked client3');
                })
            });

            host.on('joined', (user) => {
                if (user.id === client3.id) {
                    user.assign('main');
                }
                users++;
                if (users === 3) {
                    host.send('poke', {
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
            const host = new LipwigHost(url);
            host.on('created', (code) => {
                client1 = new LipwigClient(url, code);

                client1.on('poke', () => {
                    throw new Error('Should not have poked client1');
                });

                client2 = new LipwigClient(url, code);

                client2.on('poke', () => {
                    done();
                });
                client3 = new LipwigClient(url, code);
    
                client3.on('poke', () => {
                    throw new Error('Should not have poked client3');
                })
            });

            host.on('joined', (user) => {
                if (user.id === client1.id || user.id === client2.id) {
                    user.assign('main');
                }

                if (user.id === client1.id || user.id === client3.id) {
                    user.assign('secondary');
                }
                users++;
                if (users === 3) {
                    host.send('poke', {
                        whitelist: ['main'],
                        blacklist: ['secondary']
                    });
                }
            });
        });
    })
})
*/
