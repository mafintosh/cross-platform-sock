const tape = require('tape')
const net = require('net')
const xsock = require('./')

tape('basic server and client', function (t) {
  const server = net.createServer(onsocket)
  const sock = xsock('test.sock')
  const expected = [
    Buffer.from('a'),
    null
  ]

  xsock.unlink(sock, function () {
    server.listen(sock, function () {
      const client = net.connect(sock)
      client.on('readable', function () {
        t.same(client.read(), expected.shift())
      })
      client.on('end', function () {
        t.same(expected.length, 0)
        client.destroy()
        server.close()
        t.end()
      })
    })
  })

  function onsocket (socket) {
    socket.write('a')
    socket.end()
  }
})
