class UserClient {
    events = [];

    constructor()
    {
        const protocol = window.location.protocol === 'https:' ? 'ws' : 'wss';
        this.socket = new WebSocket('${protocol}://${window.location.host}/ws');

        this.socket.onopen = () => {
            this.connected = true;
        };

        this.socket.onmessage = async (msg) => {

        };

        this.socket.onclose = () => {
            this.connected = false;
        };
    }
}