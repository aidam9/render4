const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
 
wss.on('connection', ws => {
  console.log('Client connected!');
  
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
 
app.get('/', (req, res) => res.send('Hello World!'));
 
server.listen(3000, () => console.log('Listening on port 3000'));
