var textAppend = _.template($('.text-append').text());


$.getJSON("http://tiny-pizza-server.herokuapp.com/collections/chat-messages").done(function(data){
  renderTextAppend(data)
});



function renderTextAppend (alltext) {
    var rendered = textAppend(user);
    console.log(rendered);
    $('.textappend').prepend(rendered);
};






