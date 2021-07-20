/** @jsx React.DOM */

var MessageInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      message: ''
    }
  },

  keyHandler: function(event) {
    const message = this.state.message.trim();

    if (event.keyCode === 13 && message.length) {
      this.props.messageHandler(message);
      this.setState({
        message: '',
      });
      setTimeout(() => {window.scrollTo(0,document.body.scrollHeight)}, 10);
    }
  },

  render: function() {
    return (
      <input
        type="text"
        className="form-control"
        placeholder="Type your message here"
        valueLink={this.linkState("message")}
        onKeyUp={this.keyHandler}
      />
    )
  },
})
