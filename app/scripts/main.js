'use strict';

var tinyServer;

var user = 'Andy G';

var msgbox = _.template($('.chat-message').text());



function renderChat(data) {

  $('.textappend').empty();

  for (var i = 0; i < data.length - 1; i += 1) {

    if (data[i].message) {

      var rendered = msgbox(data[i]);

      $('.textappend').append(rendered);
    }
  }
}

function loadChat () {

  $.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages').done(function(data) {

    tinyServer = data;

    renderChat(data);
  });
}

function Message(user, message, time) {
  this.user = user || '';
  this.message = message || '';
  this.time = time || '';
}

function refreshChat(info) {
  $.post('http://tiny-pizza-server.herokuapp.com/collections/chat-messages', info);
}

$('.send').click(function() {

  var textbox = $('.textbox').val();
  $('.textbox').val('');

  var time = Date.now();

  var outgoing = new Message(user, message, time);

  refreshChat(outgoing);
});

setInterval(loadChat, 1000);

