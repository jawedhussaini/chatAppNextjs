const io = require("socket.io")(3000, {
  cors: { origin: "http://localhost:3001", methods: ["POST", "GET"] },
});


let onlineUsers = [];

io.on("connection",(socket)=>{
console.log("a user connected")
  socket.on("new-user-add", (newUserId) => {
    console.log(newUserId)
    if (!onlineUsers.some((user) => user.userId === newUserId)) {  
      // if user is not added before
      onlineUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("new user is here!", onlineUsers);
    }
    // send all active users to new user
    io.emit("get-users", onlineUsers);
  });

 socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    console.log("user disconnected", onlineUsers);
    // send all online users to all users
    io.emit("get-users", onlineUsers);
  });
  
  socket.on("offline", () => {
    // remove user from active users
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    console.log("user is offline", onlineUsers);
    // send all online users to all users
    io.emit("get-users", onlineUsers);
  });

socket.on("message",(message,room)=>{
  console.log(message,room)
  if(room.length){
io.to(room).emit("message",message)
  }
       
    
})

socket.on("joinRoom",(room)=>{
    console.log("joining room",room )
    socket.join(room)
})
})

console.log("hello");
