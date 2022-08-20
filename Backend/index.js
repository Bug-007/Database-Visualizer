const express = require('express');

const { createServer } = require("http");
const { Server } = require("socket.io");
const userRouter = require('./routers/userRouter');
const dataRouter = require('./routers/dataRouter');
const cors = require('cors');

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { cors : { origin: ['http://localhost:3000', 'http://192.168.2.172:3000'] } });

// on function is used recieve
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('sendmsg', (data) => {
    console.log(data);
    data.sent = false;
    socket.broadcast.emit('recmsg', data);
  });

});

const port = 5000;


// to allow react frontend to access the backend
app.use(cors({origin: 'http://localhost:3000'}));

// to parse json data
app.use(express.json());

// middlewares - to intercept the request
app.use('/user', userRouter);
app.use('/data', dataRouter);

app.get( '/home', (req, res) => { 
    res.send('Hello Express!');
})

httpServer.listen(port, () => {
    console.log('the server has started');
});