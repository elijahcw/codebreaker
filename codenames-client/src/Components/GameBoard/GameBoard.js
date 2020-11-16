import React from 'react'
import {Row, Col, Container, Button, Alert, Card} from 'react-bootstrap'
import Sentencer from 'sentencer';
import Swal from 'sweetalert2';
import io from 'socket.io-client';

// Create Socket.Io connection
const socket = io();

const colors = ['red',
                'red',
                'red',
                'red',
                'red',
                'red',
                'red',
                'red',
                'blue',
                'blue',
                'blue',
                'blue',
                'blue',
                'blue',
                'blue',
                'blue',
                'blank',
                'blank',
                'blank',
                'blank',
                'blank',
                'blank',
                'blank',
                'black']


export default class GameBoard extends React.Component{

    state={
        cardsArray: [],
        host: false,
        showClue: false,
        clueMessage: '',
        showClue: false,
        activeGame: false,
        activeSession: ''
    }

    

// Array Shuffle Function
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
          // swap elements array[i] and array[j]
          // we use "destructuring assignment" syntax to achieve that
          [array[i], array[j]] = [array[j], array[i]];
        }
        // Conole log the new shuffled array and return it
        return array
      }





// Page Loading Method
  async  componentDidMount(){

     if(this.props.location.search === '?host=true'){
        this.setState({host: true})
     }
    let timerInterval
    Swal.fire({
      title: 'Your game board is loading!',
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then( async (result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        var cards = [];
        if(this.props.location.search === '?host=true'){
          var wordsArray = [];
          var cardColors = await this.shuffle(colors);
          for (var i = 0; i< 24; i++){
            let genWord;
            do {
              genWord = Sentencer.make("{{ noun }}").toString()
            }
            while (wordsArray.indexOf(genWord) >= 0);
            wordsArray.push(genWord);
            var card = {
                word: genWord,
                color: cardColors[i].toString(),
                active: false,
            }
            cards.push(card)
          }
          this.setState({cardsArray: cards});
        }   
        Swal.fire(
            'Done!',
            'Your Game Board is Loaded; Enjoy your game!',
            'success'
          ).then((res) =>{
            this.loadSession();
          })
      }
    })


    socket.on('newClient',(msg) =>{
      socket.emit('cardReveal', {cards: this.state.cardsArray})
    })
  
    socket.on('message', (msg) => {
      this.setState({clueMessage: msg.message});
      this.setState({showClue: true});
    });
  
    socket.on('cardReveal', (cards) =>{
      this.setState({cardsArray: cards.cards})
      this.setState({ state: this.state });
    });
        
    }
   
    

// Load Session ID Parameters
loadSession(){
  const sessionId = this.props.match.params.boardId;
  this.setState({activeSession: sessionId});
  socket.emit('Session Start', {session: this.props.match.params.boardId});
}

updateAndReveal(i) {
if(this.props.location.search !== '?reveal=true'){
  var card = {
    word: this.state.cardsArray[i].word,
    color: this.state.cardsArray[i].color,
    active: true
  }
 // Generate the Cards Array and modify before sending over to other clients
  var cardList = this.state.cardsArray;
  let index = i;
 // Splice the new card value into the array
 cardList.splice(index, 1, card);
 this.setState({cardsArray: cardList});
 socket.emit('cardReveal', {cards: cardList});
}
}

gameCard(card) {
  var variant;
  // Set Card Color
  var isClueMaster = this.props.location.search === '?reveal=true';
  if((card.active && !isClueMaster) || (isClueMaster && !card.active)) {
      if(card.color === 'blue'){
          variant = 'Primary';
      } else if(card.color === 'red') {
          variant = 'Danger';
      } else if (card.color === 'blank') {
          variant = 'Warning';
      } else if (card.color === 'black') {
          variant = 'Dark'
      }
  } else {
    variant = 'Light'
  }
  
  // Main Render Method
  return(
      <Card className="gameCard"
      bg={variant.toLowerCase()}
      text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{width:'250px', height:'100%', padding: '5%'}} 
      >
          <Card.Body>
              <Card.Text style ={{textAlign:'center', fontSize:'150%'}}>{card.word}</Card.Text>
          </Card.Body>
      </Card>
  )}

// Load the Data Cards after the Response has been recieved 
loadDataCards(){
  if(this.state.cardsArray.length !== 0 ){
    return(
        this.state.cardsArray.map((card,i)=> {
          return <Col md={3}  key={card.word} className='cardList'
                    onClick={() => this.updateAndReveal(i)}>
                    {this.gameCard(card)}
                </Col>;
        })
    )
  }
}


// Post The Chat to Other Clients
async postChat(){
  console.log(this.state.cardsArray)
  const { value: text } = await Swal.fire({
    input: 'textarea',
    inputPlaceholder: 'Type your clue here...',
    inputAttributes: {
      'aria-label': 'Type your clue message here'
    },
    showCancelButton: true
  })
  
  if (text) {
    socket.emit('message',{message: text})
    this.setState({clueMessage: text})
    this.setState({showClue: true})
  }

}

// Clue Alerts
clueAlert() {
  if (this.state.showClue) {
    return (
      <Alert variant="success" onClose={() => this.setState({showClue: false})} dismissible>
        <Alert.Heading>Clue</Alert.Heading>
        <p>
          {this.state.clueMessage}
        </p>
      </Alert>
    );
  }
}





// Main Render Method
render() {

return (  
    <>
    <Button style={{margin:'2%'}} variant='success' onClick={() => this.postChat()}>Post a Clue</Button>
    <Button style={{float:'right', margin:'2%'}} href={window.location.origin + '/board/' + this.state.activeSession + '?reveal=true'} variant='danger'>Clue Master</Button>
    <Container fluid>
        <Row>
          <p style={{margin:'2%'}}>Share the following links with your friends to get started: 
            <Button href={window.location.origin + '/board/' + this.state.activeSession} variant='link'>{window.location.origin + '/board/' + this.state.activeSession}</Button>
          </p>  
        </Row>
        <Row>
          <Col>
            {this.clueAlert()}
          </Col>
        </Row>
        <Row>
            {this.loadDataCards()}
        </Row>
    </Container>
    </>
)
}






}