/** @jsx React.DOM */

$(function() {
  $('#connect-btn').on('click', () => {
    const username = $('#username-input').val();
    const container = $('#container')[0];
    initChat(username, container);
    console.log(`Chat connection initiated with username: ${username}`)
  });

  function initChat(username, container) {
    React.renderComponent(
      <ChatBox chatProxy={new ChatEmmiter()} username={username}></ChatBox>,
      container
      );
    }
});
