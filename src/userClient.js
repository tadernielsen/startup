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
            this.receiveMessage(new eventMessage('system', event.System, 'connected'));
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

        this.socket.onclose = () => {
            this.receiveMessage(new eventMessage('system', event.System, 'disconnected'));
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