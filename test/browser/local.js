describe('Local', function() {
  it('should allow for a local user to be created', function(done) {
    const host = new LipwigHost(url);
    host.on('created', () => {
      const client = host.createLocalClient();
      client.on('joined', function() {
        done();
      });
      
    });

    host.on('joined', function(user) {
      user.send('localCreated');
    });

  });
});
