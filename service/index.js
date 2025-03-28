const app = require('./service');
const { serverProxy } = require('./serverProxy');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const httpServer = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
serverProxy(httpServer);