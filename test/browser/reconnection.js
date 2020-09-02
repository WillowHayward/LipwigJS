/* Not currently implemented
describe('reconnection', function() {
    it('should allow for the host to reconnect', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function() {
            host.retry = false;
            host.socket.close();
            const socket = new WebSocket(url);
            socket.addEventListener('open', function() {
                host.reconnect(socket);
            });
        });

        host.on('reconnected', function() {
            done();
        });
    });

    it('should allow the host to automatically reconnect', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function(code) {
            host.socket.close();
        });

        host.on('reconnected', function() {
            done();
        });
    });

    it('should allow for clients to reconnect', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function(code) {
            const client = new LipwigClient(url, code);
            client.on('reconnected', function() {
                client.send('rejoined');
            });
            client.on('joined', function() {
                client.retry = false;
                client.socket.close();
                const socket = new WebSocket(url);
                socket.addEventListener('open', function() {
                    client.reconnect(socket);
                });
            })
        });

        host.on('rejoined', function() {
            done();
        });
    });

    it('should allow clients to automatically reconnect', function(done) {
        const host = new LipwigHost(url);
        host.on('created', function(code) {
            const client = new LipwigClient(url, code);
            client.on('reconnected', function() {
                client.send('rejoined');
            });
            client.on('joined', function() {
                client.socket.close();
            })
        });

        host.on('rejoined', function() {
            done();
        });
    });
});
*/
