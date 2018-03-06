xsock.unlink = unlink
module.exports = xsock

function unlink (name, cb) {
  if (!cb) cb = noop
  if (process.platform === 'win32') process.nextTick(cb)
  else require('fs').unlink(name, cb)
}

function xsock (name) {
  return process.platform === 'win32'
    ? '\\\\.\\pipe\\xsock\\' + name
    : name
}

function noop () {}
