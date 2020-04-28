import React from 'react'
import {Row, Col,  Card, Container} from 'react-bootstrap'
import Sentencer from 'sentencer';
import GameCard from '../Card/GameCard'
import Swal from 'sweetalert2';


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
        cardsArray: []
    }


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


  async  componentDidMount(){

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
        var cardColors = await this.shuffle(colors);
        for (var i = 0; i< 24; i++){
            var card = {
                word: Sentencer.make("{{ noun }}").toString(),
                color: cardColors[i].toString(),
                active: false,
            }
            cards.push(card)
        }
        
        Swal.fire(
            'Done!',
            'Your Game Board is Loaded; Enjoy your game!',
            'success'
          ).then((res) =>{
            this.setState({cardsArray: cards});
          })
      }
    })

        
    }
    
   // Load the Data Cards after the Response has been recieved 
loadDataCards(){
    return(
        this.state.cardsArray.map((card,i)=> {
          return <Col md={3}  key={i} className='cardList'>
                    <GameCard card = {card} />
                </Col>;
        })
    )
}

render() {

return (  
    <>
    <Container fluid>
        <Row>
            {this.loadDataCards()}
        </Row>
    </Container>
    </>
)
}






}