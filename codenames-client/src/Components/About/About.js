import React from 'react';


export default class Home extends React.Component{



    render() {
        return(
            <div class="jumbotron" style={{"backgroundImage": 'url(../../Media/heroBanner.jpg)'}}>
               
                <h1>Crack the Clues!</h1>
                <p>
                Codenames is a game of guessing which codes in a set are related to a clue-word given by another player.

                Players split into two teams: red and blue. One player of each team is selected as the team's clue-giver; the others are tasked with using the clues to break the code!

                Twenty-four game cards are displayed on the board in random order. Eight of the words will belong to the red team, eight will belong to the blue team, one black card represents 'the eight ball' and results in an instant loss for the team that selects it.
                The remaining yellow cards are 'annonymous' and do not belong to either team.
                </p>
                <p>
                The teams' clue-givers open the map key on their mobile device.  This map will reveal to the clue-giver the list of red/blue cards assigned to each team. Teams take turns. On each turn, the appropriate clue-giver can reveal a verbal hint about the words on the respective cards. 
                Each hint may only consist of one single word and a number. This hint can be related to as many of the words on his/her own teams' cards as possible, but not to any others – lest they accidentally lead their team to choose a card representing an annonymous card, a word-card belonging to the opposing team, or the 'eight-ball'!

                The hint's word can be chosen freely, as long as it is not any of the words on the cards on the 
                board still showing at that time.  A team makes their guess by clicking on the card on the board at which time the color designation will be revealed.
                in the grid are related to the word of the clue. 
                
                It also determines the maximum number of guesses the CodeBreaker teammates may make on that turn. Teams
                must make at least one guess per turn, risking a wrong guess and its consequences. 
                
                They may also end their turn voluntarily at any point thereafter.
                </p>
                <p>
                After a team's clue-giver gives the hint with its word and number,
                their respective teammates make guesses about which code name cards bear words related to the hint
                and select them from the board, one at a time.  When a card is selected, it will automatically show what color it is asigned to.
                - blue team, red team, annonymous, or the eight-ball card.  If the eight-ball is selected, the game ends 
                immediately, with the team who selected it losing. If a card from the opposite team is selected, 
                the turn ends immediately, and that other team is also one card closer to winning. If an annonymous card is selected, the turn simply ends.

                The game ends when all of one team's agents are identified (winning the game for that team), or when one team has identified the eight-ball (losing the game).
                </p>
            </div>
            
        )
    }
}