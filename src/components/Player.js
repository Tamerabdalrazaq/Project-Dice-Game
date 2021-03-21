import React from 'react'
import '../styles.css'
import DiceView from './DiceView'
class Player extends React.Component{
    constructor(name){
        super();
        this.name = name;
    }
    render(){
        return (
            <div className={`player ${this.props.name}`}>
                <h1 className="player-title">{this.props.name}</h1>
                <h1>Wallet: {this.props.wallet} $</h1>
                <h1>Bet: {this.props.bet} $</h1>
                <DiceView dices = {this.props.dices} />
            </div>
        );
    }
}

export default Player;