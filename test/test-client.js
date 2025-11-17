const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8787');

ws.on('open', () => {
  console.log('Connected!');
});

ws.on('message', (data) => {
  console.log('Received:', data.toString());
});

ws.on('close', () => {
  console.log('Disconnected.');
});

// Optional: Send a message after 2 seconds
setTimeout(() => {
  ws.send('Hello from client!');
}, 2000);