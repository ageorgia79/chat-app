'use strict';
//variable created for server messages//

//variable for the template created for incoming messages//
var msgbox = _.template($('.chat-message').text());

//variable created for user name//
var user = 'Andy G';

var myServer;


//pulls data from the server and displays it in the chat screen//
function renderChat(data) {

//this is supposed to clear the chat screen of any existing information that may aleady be in there//
  $('.textappend').empty();

//starts from index point 0 and counts to the end of the array in which data will be pulled from//
  for (var i = 0; i < data.length - 1; i += 1) {

//this is verifying that message information actually exists//
    if (data[i].message) {

//variable created for the data through the template//
      var rendered = msgbox(data[i]);

//takes the data from the server and appends it to the chat screen as intended//
      $('.textappend').append(rendered);
    }
  }
}

function startChat () {

//gets json from the server and assigns it to data//
  $.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages').done(function(data) {

//assigns data object to messages variable//
    myServer = data;

//calls the function and the array from the server is passed in//
    renderChat(data);
  });
}

//here is my constructor that will create my object to be sent//
function Message(user, message, time) {

  this.user = user || '';

  this.message = message || '';
  
  this.time = time || '';
}

//this sends my message object to the server//
function refreshChat(info) {
  $.post('http://tiny-pizza-server.herokuapp.com/collections/chat-messages', info);
}

//when the button is clicked, it creates an instance  of the function Message//
$('.send').click(function() {

//what i type in the input field is assigned to message//
  var message = $('.message').val();
  $('.message').val('');

//supposed to set the current time//
  var time = Date.now();

//creates the outgoing instance//
  var delivery = new Message(user, message, time);

//send outgoing to the server//
  refreshChat(delivery);
});

//this gives the option of keypress of number 13 which is "enter" so that you dont have to click//
$('.message').keypress(function(enter) {

  if(enter.which == 13) {
    $('.send').click(); 
  }
})
//reloads every one second//
setInterval(startChat, 1000);