'use strict';

var myServer;

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

    myServer = data;

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

  var message = $('.message').val();
  $('.message').val('');

  var time = Date.now();

  var outgoing = new Message(user, message, time);

  refreshChat(outgoing);
});

$('.message').keypress(function(enter) {

  if(enter.which == 13) {
    $('.send').click(); 
  }
})

setInterval(loadChat, 1000);