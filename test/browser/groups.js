describe('Groups', function() {
    it('should alert people when they are assigned to a group', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            const client = Lipwig.join('ws://localhost:8080', code);

            client.on('assigned', function() {
                done();
            });
        });

        host.on('joined', function(user) {
            user.assign('a group');
        });
    });

    it('should alert people when they are removed from a group', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            const client = Lipwig.join('ws://localhost:8080', code);

            client.on('unassigned', function() {
                done();
            });
        });

        host.on('joined', function(user) {
            user.assign('a group');
            user.unassign('a group');
        });
    });

    it('should inform users what group they\'ve been added to', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            const client = Lipwig.join('ws://localhost:8080', code);

            client.on('assigned', function(group) {
                if (group === 'a group') {
                    done();
                }
            });
        });

        host.on('joined', function(user) {
            user.assign('a group');
        });
    });

    it('should inform users what group they\'ve been removed from', function(done) {
        const host = Lipwig.create('ws://localhost:8080');
        host.on('created', function(code) {
            const client = Lipwig.join('ws://localhost:8080', code);

            client.on('unassigned', function(group) {
                if (group === 'a group') {
                    done();
                }
            });
        });

        host.on('joined', function(user) {
            user.assign('a group');
            user.unassign('a group');
        });
    });
})