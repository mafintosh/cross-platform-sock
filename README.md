# cross-platform-sock

Create unix sockets on both unix systems and windows

```
npm install cross-platform-sock
```

On unix it'll just use a unix socket and on windows it'll return a pipe name.

## Usage

``` js
const xsock = require('cross-platform-sock')
const net = require('net')

const server = net.createServer(function (socket) {
  socket.end('hello unix socket')
})

const sock = xsock('./test.sock')

xsock.unlink(sock, function () {
  server.listen(sock, function () {
    const socket = net.connect(sock)

    socket.on('data', function (data) {
      console.log('data:', data)
    })
  })
})
```

Running the above should print

```
data: hello unix socket
```

On all systems.

## API

#### `sock = xsock(name)`

Create a cross platform socket name.

#### `xsock.unlink(sock, cb)`

Unlink a previous socket. Only needed on unix systems. On windows this is just a noop.

## License

MIT
