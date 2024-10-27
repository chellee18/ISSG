const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server);

// Terhubung ke server
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  socket.on("disconnect", () => {
      console.log(`Client ${socket.id} disconnected`);
  });

  // Menerima pesan dari client 1 atau 2 dan kemudian mengirim atau menyiarkan kembali ke client 1 atau 2
  socket.on("message", (data) => {
      let { username, message } = data;
      console.log(`Receiving message from ${username}: ${message}`);

      io.emit("message", data);
  });
});

// Menentukan port server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
