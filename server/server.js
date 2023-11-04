const io = require("socket.io")(3000, {
  cors: { origin: "http://localhost:3001", methods: ["POST", "GET"] },
});

io.on("connection",(socket)=>{
console.log("a user connected")
socket.on("message",(message,room)=>{
  console.log(message,room)
  if(room.length){
io.to(room).emit("message",message)
  }
       
    
})
socket.on("disconnect",()=>{
    console.log("a user is disconnected")
})
socket.on("joinRoom",(room)=>{
    console.log("joining room",room )
    socket.join(room)
})
})

console.log("hello");
