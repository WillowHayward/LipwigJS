describe('Ping', function () {
    it('should allow for hosts to ping', function(done) {
        this.skip();
        const host = Lipwig.create(url);
        host.on('created', function() {
            host.ping();
        });

        host.on('pong', function() {
            done();
        });
    });
});
