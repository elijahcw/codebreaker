import React from 'react';
import {Card} from 'react-bootstrap';



export default class GameCard extends React.Component{
    state = {
        color: this.props.card.color,
        activeState: this.props.card.active,
        word: this.props.card.word
    }


    handleClick() {
        this.setState({activeState: !this.state.activeState})
    }

    render(){
        // Set Card Color
        var variant = 'Light'
        if(this.state.activeState) {
            if(this.state.color === 'blue'){
                variant = 'Primary';
            } else if(this.state.color === 'red') {
                variant = 'Danger';
            } else if (this.state.color == 'blank') {
                variant = 'Warning';
            } else if (this.state.color == 'black') {
                variant = 'Dark'
            }
        } 
        
        // Main Render Method
        return(
            <Card
            bg={variant.toLowerCase()}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            onClick ={ () => this.handleClick()} 
            style={{width:'200px', height:'75px', padding: '5%', marginBottom: '5%'}}>
                <Card.Body>
                    <Card.Text style ={{textAlign:'center'}}>{this.state.word}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

}

