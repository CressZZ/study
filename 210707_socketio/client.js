const io = require('socket.io-client');
  
// export default function() {
  const socket = io.connect('http://localhost:5000');
  
  function onMessageEvent(callback) {
    socket.on('message', (message) => {
      callback(message);
    });
  }
    
  function messageSend(message) {
    socket.emit('message', message);
  }
      
  function offMessageEvent() {
    socket.off('message');
  }
   
  onMessageEvent((m)=>{console.log(m)});
//   return {
//     onMessageEvent,
//     offMessageEvent
//   };
// }