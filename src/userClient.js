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

const eventMessage = {
    construtor(from, type, data)
    {
        this.from = from;
        this.type = type;
        this.data = data;
    }
}

class UserClient {
    events = [];

    constructor()
    {
        const protocol = window.location.protocol === 'https:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        this.socket.onopen = () => {
            this.connected = true;
        };

        this.socket.onmessage = async (msg) => {

        };

        this.socket.onclose = () => {
            this.connected = false;
        };
    }

    sendMessage()
    {

    }

    receiveMessage()
    {
        
    }
}

const client = new UserClient();
export { event, client };