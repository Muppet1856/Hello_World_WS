export default {
  async fetch(request) {
    // Check for WebSocket upgrade header
    const upgradeHeader = request.headers.get('Upgrade');
    if (!upgradeHeader || upgradeHeader !== 'websocket') {
      return new Response('Expected Upgrade: websocket', { status: 426 });
    }

    // Create a WebSocket pair (client for response, server for handling)
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    // Accept the connection
    server.accept();

    // Send static message immediately on connection open
    server.addEventListener('open', (event) => {
      server.send('Hello World from Cloudflare Workers WebSocket!');
    });

    // Handle incoming messages (optional: echo back for interactivity)
    server.addEventListener('message', (event) => {
      console.log('Received:', event.data);
      server.send(`Echo: ${event.data}`);
    });

    // Handle close (optional: log for debugging)
    server.addEventListener('close', (event) => {
      console.log('Connection closed:', event.code, event.reason);
    });

    // Return the WebSocket response (status 101 for upgrade)
    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  },
};