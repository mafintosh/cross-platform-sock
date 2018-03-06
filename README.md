# cross-platform-sock

Create unix sockets on both unix systems and windows

```
npm install cross-platform-sock
```

[![build status](https://travis-ci.org/mafintosh/cross-platform-sock.svg?branch=master)](https://travis-ci.org/mafintosh/cross-platform-sock)
[![Build status](https://ci.appveyor.com/api/projects/status/9xoqnvi9guyawi30/branch/master?svg=true)](https://ci.appveyor.com/project/mafintosh/cross-platform-sock/branch/master)

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
