const port = process.env.PORT || 3000;
const express = require('express')
const path = require('path')
const app = express();
const {createServer} = require('http');
const {Server} = require('socket.io');
const server = createServer(app);
const io = new Server(server);


 
var clients = 0;


// --------------------Socket IO--------------------------------

// listen on the connection event for incoming sockets
io.on('connection', function(socket){
 var sessionID;
 clients ++ ;  
    
    // Session Start
    socket.on('Session Start', function(session){ 
      sessionID = session.session.toString();
      socket.join(sessionID) 
      socket.to(sessionID).emit('newClient', "A new Client Joined!");
      console.log('This Session ID is: ' + sessionID);
    });

    // Session Post
      socket.on('message', function(message){
      socket.to(sessionID).emit('message',message)
    })

    // Session Post
    socket.on('cardReveal', function(cards){
      console.log(cards)
      socket.to(sessionID).emit('cardReveal', {cards: cards.cards})
    })

    
    // Session Disconnect
    socket.on('disconnect', function(){
      clients--;
      console.log('user disconnected');       
    });
  
  });


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'codenames-client/build')));


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/codenames-client/build/index.html'));
});



server.listen(port, function(){
    console.log('Signaler listening on *: ', port);
   });