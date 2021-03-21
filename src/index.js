import React from 'react';
import reactDOM from 'react-dom';
import Game from './components/Game'

const App = () => {
    return <Game winnerScore = {0}/>
}

reactDOM.render(<App />, document.querySelector('#root'));








