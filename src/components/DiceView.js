import React from 'react'
import '../styles.css'


class DiceView extends React.Component{
    constructor(name){
        super();
        this.name = name;
    }
    render(){
        return (
            this.props.dices[0] && (
            <div className="diceView">
                <img src={require(`../img/dice${this.props.dices[0]}.png`).default} />
                <img src={require(`../img/dice${this.props.dices[1]}.png`).default} />
            </div>
            )
        );
    }
}

export default DiceView;