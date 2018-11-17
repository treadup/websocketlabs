import asyncio
from quart import Quart, websocket

app = Quart(__name__)

tick_counter = 0

@app.route('/')
async def hello():
    return 'Tick counter ' + str(tick_counter)

@app.websocket('/ws')
async def ws():
    quit = False
    while not quit:
        data = await websocket.receive()

        if data == 'PING':
            response = 'PONG'
        elif data == 'TICK':
            response = str(tick_counter)
        elif data == 'QUIT':
            response = 'BYE'
            quit = True
        else:
            response = 'UNKNOWN'

        await websocket.send(response)

async def game_logic():
    global tick_counter
    while True:
        tick_counter = tick_counter + 1
        await asyncio.sleep(0.1)

asyncio.ensure_future(game_logic())

app.run()
