page = 'portal';
function showPage(destination) {
    document.getElementById(page).classList.add('hide');
    document.getElementById(destination).classList.remove('hide');
    page = destination;
}

const url = 'ws://localhost:8080';

let host;
let client;
document.getElementById('btnCreate').onclick = function() {
    showPage('connecting');
    host = Lipwig.create(url);
    host.on('created', function(code) {
        document.getElementById('codeDisplay').textContent = code;
        showPage('chat');
    });

    host.on('joined', function(user) {
        display(user.id + ' joined!');
        broadcast(user.id + " joined!", host);
        user.on('message', function(message) {
            display(user.id + ': ' + message);
            broadcast(user.id + ': ' + message, user);
        });
    });

    document.getElementById('btnSend').onclick = function() {
        const message = document.getElementById('txtChat').value;
        display(host.id + ': ' + message);
        broadcast(host.id + ': ' + message, host);
        document.getElementById('txtChat').value = '';
    }
};

document.getElementById('btnJoin').onclick = function() {
    showPage('connecting');
    const code = document.getElementById('txtCode').value;
    client = Lipwig.join(url, code);

    client.on('connected', function() {
        document.getElementById('codeDisplay').textContent = code;
        showPage('chat');
    });

    client.on('message', function(message) {
        display(message);
    });

    client.on('error', function(error) {
        if (error === 2) {
            // Room not found
            alert('Room ' + code + ' not found!');
            showPage('portal');
        }
    });

    document.getElementById('btnSend').onclick = function() {
        const message = document.getElementById('txtChat').value;
        client.send('message', message);
        display(client.id + ': ' + message)
        document.getElementById('txtChat').value = '';
    }
}

function broadcast(message, origin) {
    const users = host.getUsers();
    const userIDs = Object.keys(users);
    userIDs.forEach(function(id) {
        const user = users[id];
        if (user === origin) {
            return;
        }
        user.send('message', message);
    });
}

function display(message) {
    history = document.getElementById('history').innerHTML;

    document.getElementById('history').innerHTML += '<br/>' + message;
}