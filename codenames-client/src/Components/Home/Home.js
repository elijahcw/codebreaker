import React from 'react';
import {Button, Jumbotron} from 'react-bootstrap';
import {Redirect}  from 'react-router-dom';
import Swal from 'sweetalert2';
import uuid from 'react-uuid';




export default class Home extends React.Component{

    
state={
    activeGame: '',
    redirect: false
  }
  
  // Starts a new game and redirects the user
  startNewGame(){
    var guid = uuid().toString();
    console.log(guid);
    this.setState({activeGame: guid})
    this.setState({redirect: true})
  }
  
  
  checkForActiveGame(){
    if(this.state.redirect === true && this.state.activeGame !== ''){
      return(
        <Redirect to={'/board/' + this.state.activeGame + '?host=true'} />
      )
    }
  }
  
  async joinAGame(){
      const { value: session } = await Swal.fire({
        input: 'text',
        inputPlaceholder: 'Enter the session Id code for your game...'
      })
      
      if (session) {
        this.setState({activeGame:session});
        this.setState({redirect: true});
      }
  }

    render() {
        return(
            <>
            {this.checkForActiveGame()}
            <Jumbotron style={jumboTronStyle}>
               
                <h1>Crack the Clues!</h1>
                <p style={{marginTop: '2%'}}>
                CodeBreaker is a simple game of guessing in which codes words in a set are related to a clue-word given by another player.
                 <strong> Select below to start a game or join an existing session with one of your friends!</strong>
                </p>
                <p style={{marginTop: '10%'}}>
                    <Button variant="primary" onClick={() => this.startNewGame()}>Start a game!</Button>
                    <Button style={{float: 'right'}} variant="secondary" onClick={()=> this.joinAGame()}>Join an Existing Session</Button>
                </p>
                
            </Jumbotron>
            </>
            
        )
    }
}


const jumboTronStyle = {margin:'5%',
                  marginBottom:'10%',
                  height: '400px' ,
                  backgroundImage: 'url(../../Media/heroBanner.jpg)'
                }