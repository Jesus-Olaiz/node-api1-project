const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE

server.listen(port, () => {
    console.log("Server running on http://localhost:9000")
})
