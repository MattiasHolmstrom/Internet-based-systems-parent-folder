var express = require('express') // Popular web framework for Node.js
var bodyParser = require('body-parser') // Auto parses body of post and put requests
var morgan = require('morgan') // Logs HTTP requests to the console
var app = express()
app.use(express.static('static'));    // makes the files in /static folder available
app.use(bodyParser.urlencoded({ extended: true })) //
app.use(bodyParser.json());                        // Hooking on functions that will we called for each request
app.use(morgan('dev'));                            //

var data = require('./data');
var port = 15764;
// HTTP SERVER
app.listen(port, function () {
  console.log('Message app listening on port '+port+'!')
});

// HOME PAGE
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

// MESSAGES ENDPOINT
app.post('/messages', function(request, response) {
  console.log(request.body);
  data.addMessage(request.body.userName, request.body.text);
  response.sendStatus(200);

});
app.post('/messages', function(request, response){
  var meddelande = request.body.text;
var namn = request.body.username;
if(meddelande === "" || namn === ""){
response.sendStatus(400)
}
else{
  data.addMessage(namn, meddelande)
  response.sendStatus(201)
}
});

app.get('/messages', function(request, response){
  response.json(data.messages);
});

app.get('/messages/:id', function(request, response){
  var id = request.params.id;
  if(!getMessageById(id)){
    response.sendStatus(404);
  }
  else{
    response.json(data.getMessageById(id));
    response.sendStatus(200)
  }
  response.json(data.getMessageById(id))
})

app.delete('/messages/:id', function(request, response){
  var id = request.params.id;
  console.log(id);
  if(getMessageById(id)){
    response.json(data.removeMessage(id)); 
  }
  else
  response.sendStatus(404);
})