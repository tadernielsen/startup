const app = require('./service');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});