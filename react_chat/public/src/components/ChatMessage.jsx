/** @jsx React.DOM */

'use strict';

var ChatMessage = React.createClass({
  render: function() {
    var message = this.props.message;
    var hours = message.date.getHours();
    var minutes = message.date.getMinutes();

    if (minutes < 10) minutes = '0' + minutes;

    return (
      <div className="chat-message">
        <div className="chat-message-time">{hours}:{minutes}</div>
        <div className="chat-message-author">{message.author}</div>
        <span className="chat-message-content">{message.content}</span>
      </div>
    )
  },
})
