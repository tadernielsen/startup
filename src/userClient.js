const event = {
    System: 'system',
    announcement: 'announcement',
    newDevLog: 'newDevLog',
    newGame: 'newGame',
    login: 'login',
    logout: 'logout',
    like: 'like',
    favorite: 'favorite',
}

class eventMessage {
    constructor(from, type, data)
    {
        this.from = from;
        this.type = type;
        this.data = data;
    }
}

class UserClient {
    events = [];
    handlers = [];

    constructor()
    {
        let port = window.location.port;
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

        this.socket.onopen = (msg) => {
            this.receiveMessage(new eventMessage('system', event.System, {msg: 'Welcome to TN-Games!'}));
        };

        this.socket.onmessage = async (msg) => {
            try 
            {
                const event = JSON.parse(msg.data);
                this.receiveMessage(event);
            } 
            catch
            {}
        };

        this.socket.onclose = (msg) => {
            this.receiveMessage(new eventMessage('system', event.System, {msg: 'Disconnected'}));
        };
    }

    sendMessage(from, type, data)
    {
        const event = new eventMessage(from, type, data);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler)
    {
        this.handlers.push(handler);
    }

    removeHandler(handler)
    {
        this.handlers.filter(h => h !== handler);
    }

    receiveMessage(event)
    {
        this.events.push(event);

        if (this.events.length > 4)
        {
            this.events.shift();
        }

        this.events.forEach((evnt) => {
            this.handlers.forEach((handler) => {
                handler(evnt);
            })
        })
    }
}

const client = new UserClient();
export { event, client };