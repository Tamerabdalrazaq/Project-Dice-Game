import React from 'react'
import Player from './Player'
class PlayerClass {
    constructor(name='', wallet = 50, accumulated=0, bet = 0){
        this.name = name;
        this.wallet = wallet;
        this.accumulated = accumulated;
        this.bet = bet
        this.dices = [null, null]
    }
    setPlayerState = (obj) => {
        for(let key in obj){
            this[key] = obj[key];
        }
    }
    getProperty(property){
        return this[property];
    }
    getScore(){
        return this.dices[0] + this.dices[1];
    }
}

console.log(React.createElement(Player, null));

const players = [ ]
class Game extends React.Component{
    state = {
        player1: new PlayerClass('player1'),
        player2: new PlayerClass('player2'),
        dices: [null, null],
        currentPlayer: 'player1',
        round: 1,
        currentBet: '',
    }

    rollDice = () =>{
        let randoms = [generateRandom(), generateRandom()];
        console.log(randoms);
        if(checkValidBet(this.state[this.state.currentPlayer].wallet, this.state.currentBet)){
            let updatedPlayer = this.state[this.state.currentPlayer];
            updatedPlayer.setPlayerState({
            accumulated:
            updatedPlayer.getProperty('accumulated')+randoms[0]+randoms[1],
            bet: this.state.currentBet,
            dices: [...randoms], 
            wallet: this.state[this.state.currentPlayer].wallet - this.state.currentBet,
            });
            this.setState({
                [this.currentPlayer]: updatedPlayer,
                dices: [...randoms],
                
            });
            this.passPlayer();
        }
    }

    passPlayer = () => {
        let updatedPlayer = this.state[this.state.currentPlayer];
        updatedPlayer.setPlayerState({
        bet:
        this.state.currentPlayer === 'player1' ? this.state.player1.bet: this.state.player2.bet,
        accumulated: 0,
        });
        this.setState({
            [this.currentPlayer]: updatedPlayer,
            currentPlayer: this.state.currentPlayer === 'player1' ? 'player2':'player1', 
        })
        if(this.state.currentPlayer === 'player2'){
            this.checkWinner();
        }
    }
    
    checkWinner = () => {
        let player1 = this.state.player1;
        let player2 = this.state.player2;
        let totalBets = player1.getProperty('bet') + player2.getProperty('bet')
        if(player1.getScore() > player2.getScore()){
            player1.setPlayerState({
                wallet: player1.getProperty('wallet') + totalBets,
            })
        }
        else if(player1.getScore() < player2.getScore()){
            player2.setPlayerState({
                wallet: player2.getProperty('wallet') + totalBets,
            })
        }
        else{
            player1.setPlayerState({
                wallet: player1.getProperty('wallet') + player1.getProperty('bet'),
            });

            player2.setPlayerState({
                wallet: player2.getProperty('wallet') +  player2.getProperty('bet'),
            })
        }
        if(player1.getProperty('wallet') <= 0 || player2.getProperty('wallet') <= 0){
            alert(`${player1.getProperty('waller') <= 0 ? 'player2': 'player1'} has lost the game `)
            this.restartGame();
        }
    }

    restartGame(){
        this.setState({
            player1: new PlayerClass('p1'),
            player2: new PlayerClass('p2')
        })
    }
    render(){
        return (
            <div className="container">
                <Player name='P1' wallet={this.state.player1.wallet}
                accumulated={this.state.player1.accumulated}
                bet = {this.state.player1.bet}
                dices = {this.state.player1.dices}
                />
                <Player name='P2'
                wallet={this.state.player2.wallet}
                accumulated={this.state.player2.accumulated}
                bet = {this.state.player2.bet}
                dices = {this.state.player2.dices}
                />
                <div className="tools">
                    <div className="inputs">
                        <input type="text" placeholder="YourBet" id='mainInput' onChange = {
                            async (e) => {
                                await this.setState({currentBet:
                                    parseInt(e.target.value)
                                });
                                e.target.value = `${this.state.currentBet}`;
                            }
                        }/>
                        <input type="text" id="dollar" value="$" disabled/>
                    </div>
                    <button onClick={this.rollDice}>roll dice</button>
                </div>
            </div>
        );
    }
}

function generateRandom(a=1, b=6){
    return Math.floor( (a) + Math.random()*(b-a+1) )
}

function checkValidBet(wallet, bet){
    return ((wallet >= bet) && (bet > 0))
}

export default Game;