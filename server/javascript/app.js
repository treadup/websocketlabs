const WebSocket = require('ws');

const port = 7000

let tickCount = 0

const wss = new WebSocket.Server({ port: port });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    switch(message) {
      case 'PING':
        ws.send('PONG')
        break
      case 'TICK':
        ws.send(tickCount.toString())
        break
      case 'QUIT':
        ws.send('BYE')
        ws.close()
        break
      default:
        ws.send('UNKNOWN');
    }
  });

  ws.send('HELLO');
});

console.log(`Listening on port ${port}`)

function game_logic() {
  tickCount++

  // Schedule the game logic to be called on the next iteration
  // of the event loop.
  setImmediate(game_logic)
}

setImmediate(game_logic)
