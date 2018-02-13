describe('Kicking', function () {
    it('should kick users', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            const client = Lipwig.join('ws://localhost:8080', code);
            client.on('kicked', function() {
                done();
            });
        });

        host.on('joined', function(user) {
            user.kick();
        });
    });

    it('should provided a reason to kicked users', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            const client = Lipwig.join('ws://localhost:8080', code);
            client.on('kicked', function(reason) {
                if (reason === 'The reason') {
                    done();
                }
            });
        });

        host.on('joined', function(user) {
            user.kick('The reason');
        });

    });
});