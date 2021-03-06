/* global window */
// copied from browser-run
// changed xhr-write-stream to socket.io

require('source-map-support').install();

// delay window.close
var close = window.close;
// ['c' + 'lose'] is to bypass IE11 SCRIPT5045:
// Assignment to read-only properties is not allowed in strict mode
window['c' + 'lose'] = function () {
  setTimeout(function () {
    close.call(window);
  }, 1000);
};

window.onerror = function (msg, file, line, column, err) {
  if (err && msg.indexOf(err.stack) > -1) {
    err.stack = err.stack + '\n  at ' + file + ':' + line + ':' + column;
  }
  console.error(err && err.stack || err);
};

var io = require('socket.io-client')();

var console = window.console || {};

function patch(method) {
  var old = console[method];
  console[method] = function() {
    const message = Array.prototype.slice.call(arguments, 0).join(' ');
    if (message) io.emit(method, message);
    if (old) old.apply(console, arguments);
  };
}

var methods = ['log', 'error', 'warn', 'dir', 'debug', 'info', 'trace'];
var i;
for (i = 0; i < methods.length; i++) {
  patch(methods[i]);
}

io.on('ask-coverage', function() {
  if (window.__coverage__) {
    io.emit('coverage', JSON.stringify(window.__coverage__));
  }
});
