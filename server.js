const app = require('express')();
const PORT = process.env.PORT || 4000;
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
      'Content-Type, Authorization, X-Requested-With, X-Socket-ID',
    credentials: true,
  },
});

io.on('connect', (socket) => {
  console.log('a user connected');
  // console.log('what is socket', socket);
  // make any event emit to all clients
  socket.on('chat', (payload) => {
    io.emit('chat', payload);
  });
  socket.on('askForName', () => {
    io.emit('askForName');
  });
  socket.on('getGroupNames', async (names) => {
    await io.emit('getGroupNames', names);
  });
  socket.on('getSelectedGropuNames', async (names) => {
    await io.emit('getSelectedGropuNames', names);
  });
});

server.listen(PORT, () => {
  console.log('listening on port', PORT);
});
