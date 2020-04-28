import React from 'react';
import {Button, Jumbotron, Image} from 'react-bootstrap';

const banner = require('../../Media/heroBanner.jpg');

export default class Home extends React.Component{

    startAGame() {
        console.log('start a game')
    }

    render() {
        return(
            <Jumbotron style={jumboTronStyle}>
               
                <h1>Crack the Clues!</h1>
                <p style={{marginTop: '2%'}}>
                CodeBreaker is a simple game of guessing in which codes words in a set are related to a clue-word given by another player.
                 <strong> Select below to start a game or join an existing session with one of your friends!</strong>
                </p>
                <p style={{marginTop: '10%'}}>
                    <Button variant="primary" onClick={this.startAGame()}>Start a game!</Button>
                    <Button style={{float: 'right'}} variant="secondary">Join an Existing Session</Button>
                </p>
                
            </Jumbotron>
            
        )
    }
}


const jumboTronStyle = {margin:'5%',
                  marginBottom:'10%',
                  height: '400px' ,
                  backgroundImage: 'url(../../Media/heroBanner.jpg)'
                }