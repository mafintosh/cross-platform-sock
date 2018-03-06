const path = require('path')
const fs = require('fs')

const isWindows = process.platform === 'win32'

xsock.unlink = unlink
module.exports = xsock

function unlink (name, cb) {
  if (!cb) cb = noop
  if (isWindows) process.nextTick(cb)
  else fs.unlink(name, cb)
}

function xsock (name) {
  return isWindows
    ? '\\\\.\\pipe\\xsock\\' + path.resolve(name)
    : path.resolve(name)
}

function noop () {}
