describe('Kicking', function () {
    it('should kick users', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function(code) {
            const client = new LipwigClient(url, code);
            client.on('kicked', function() {
                done();
            });
        });

        host.on('joined', function(user) {
            user.kick();
        });
    });

    it('should provided a reason to kicked users', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function(code) {
            const client = new LipwigClient(url, code);
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
