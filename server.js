const app = require("express")();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3001;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Content-Type, Authorization, X-Requested-With, X-CSRF-Token",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("What is Socket ID", socket);
  socket.on("chat", (payload) => {
    console.log("Chat", payload);
    io.emit("chat", payload);
  });
});
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
