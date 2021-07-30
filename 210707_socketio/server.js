const server = require('http').createServer();
const io = require('socket.io')(server);
  
const clients = [];
  
io.on('connection', (client) => {
  clients.push(client);
  
  client.on('message', (message) => {
    // handle message...
    client.forEach((c) => c.emit('message', message));
  });
  
  client.on('disconnect', () => {
    console.log('client disconnect...', client.id);
    // handle disconnect..
    clients.filter((c) => c.id !== client.id);
  });
  
  client.on('error', (err) => {
    console.log('received error from client:', client.id);
    // handle error..
  });
});
  
server.listen(5000, (err) => {
  if (err) throw err;
  console.log('listening on port 5000');
});