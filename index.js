const port = process.env.PORT || 5000;
const express = require('express')
const path = require('path')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); // socket.io instance initialization
 



// --------------------Socket IO--------------------------------
var clients = 0;

// listen on the connection event for incoming sockets
io.on('connection', function(socket){
 let sessionID;
 console.log('A user connected');
 clients ++ ;  
    
    // Session Start
    socket.on('Session Start', function(session){ 
      sessionID = session.session.toString();
      socket.join(sessionID) 
      socket.to(sessionID).emit('stream', "Session Initiated");
      console.log('This Session ID is: ' + sessionID);
    });

    // Session Post
      socket.on('message', function(message){
      socket.to(sessionID).broadcast.emit('message',message)
    })

    
    // Session Disconnect
    socket.on('disconnect', function(){
      clients--;
      console.log('user disconnected');       
    });
  
  });




// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'qmonitorclient/build')));


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/qmonitorclient/build/index.html'));
});



http.listen(port, function(){
    console.log('Signaler listening on *: ', port);
   });