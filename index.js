const path =  require('path')

xsock.unlink = unlink
module.exports = xsock

function unlink (name, cb) {
  if (!cb) cb = noop
  if (process.platform === 'win32') process.nextTick(cb)
  else require('fs').unlink(name, cb)
}

function xsock (name) {
  return process.platform === 'win32'
    ? '\\\\.\\pipe\\xsock\\' + path.resolve(name)
    : path.resolve(name)
}

function noop () {}
