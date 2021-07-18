'use strict';

function ChatEmmiter() {
  EventEmitter.call(this);
  this._peers = {};
}

ChatEmmiter.prototype = Object.create(EventEmitter.prototype);

ChatEmmiter.prototype.onMessage = function(cb) {
  this.addListener(Actions.USER_MESSAGE, cb);
}

ChatEmmiter.prototype.onUserConnected = function(cb) {
  this.addListener(Actions.USER_CONNECTED, cb);
}

ChatEmmiter.prototype.onUserDisconnected = function(cb) {
  this.addListener(Actions.USER_DISCONNECTED, cb);
}

ChatEmmiter.prototype.setUsername = function(username) {
  this._username = username;
}

ChatEmmiter.prototype.getUsername = function() {
  return this._username;
}

ChatEmmiter.prototype.send = function(user, message) {
  this._peers[user].send(message);
}

ChatEmmiter.prototype.broadcast = function(message) {
  for (var peer in this._peers) {
    this.send(peer, message)
  }
}

ChatEmmiter.prototype.connect = function(username) {
  var self = this;

  this.setUsername(username);
  this.socket = io();
  this.socket.on('connect', function() {
    self.socket.on(Actions.USER_CONNECTED, function(userId) {
      if (userId === self.getUsername()) return;
      self._connectTo(userId);
      self.emit(Actions.USER_CONNECTED, userId);
      console.log("User connected", userId);
    });
    self.socket.on(Actions.USER_DISCONNECTED, function(userId) {
      if (userId === self.getUsername()) return;
      self._disconnectFrom(userId);
      self.emit(Actions.USER_DISCONNECTED, userId);
      console.log("User disconnected", userId);
    });
  });
  console.log('Connection with username', username);
  this.peer = new Peer(username, {
    host: location.hostname,
    port: 9000,
    path: 'chat',
  });
  this.peer.on('open', function(userId) {
    self.setUsername(userId)
  });
  this.peer.on('connection', function(connection) {
    console.log(connection);
    self._registerPeer(connection.peer, connection);
    self.emit(Actions.USER_CONNECTED, {})
  });
};

ChatEmmiter.prototype._connectTo = function(username) {
  var connection = this.peer.connect(username);
  connection.on('open', function() {
    this._registerPeer(username, connection);
  }.bind(this));
}

ChatEmmiter.prototype._registerPeer = function(username, connect) {
  console.log('Registration is in progress.');
  this._peers[username] = connection;
  connection.on('data', function(message) {
    console.log('Message recieved', message);
    this.emit(Actions.USER_MESSAGE, {content: message, author: username});
  }.bind(this));
};

ChatEmmiter.prototype._disconnectFrom = function(username) {
  delete this._peers[username];
};