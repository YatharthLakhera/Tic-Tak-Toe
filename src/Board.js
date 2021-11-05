import React from 'react';
import Square from './Square.js';
import Reset from './Reset.js';

export default class Board extends React.Component {

    defaultState() {
        return {
            squares: Array(9).fill(null),
            clickCount: 0,
            title: 'Player 1 Turn',
            currentPlayer: 1,
            isGameOver: false,
            titleClass: 'status',
            showReset: false
        };
    }

    constructor(props) {
        super(props);
        this.state = this.defaultState();
    }

    renderSquare(index) {
        return (
            <Square
                value={this.state.squares[index]}
                onClick={() => this.processSquareClick(index)}
            />
        );
    }

    processSquareClick(index) {
        if (!this.state.isGameOver && this.state.squares[index] === null) {
            let newState = this.state;
            if (this.state.clickCount % 2 === 1) {
                newState.squares[index] = 'X';
                newState.title = 'Player 1 Turn';
                newState.currentPlayer = 2;
            } else {
                newState.squares[index] = 'O';
                newState.title = 'Player 2 Turn';
                newState.currentPlayer = 1;
            }
            newState.clickCount += 1;
            this.setState(newState);
            this.checkGameStatus();
        }
    }

    checkGameStatus() {
        let newState = this.state;
        if (this.state.clickCount === 9) {
            newState.isGameOver = true;
            newState.title = 'GAME OVER!';
            newState.titleClass = 'status-game-over';
            newState.showReset = true;
            this.setState(newState);
        } else if (this.isEqual(this.state.squares[0], this.state.squares[1], this.state.squares[2]) || 
            this.isEqual(this.state.squares[3],this.state.squares[4],this.state.squares[5]) || 
            this.isEqual(this.state.squares[6],this.state.squares[7],this.state.squares[8]) ||
            this.isEqual(this.state.squares[0],this.state.squares[3],this.state.squares[6]) || 
            this.isEqual(this.state.squares[1],this.state.squares[4],this.state.squares[7]) || 
            this.isEqual(this.state.squares[2],this.state.squares[5],this.state.squares[8]) || 
            this.isEqual(this.state.squares[0],this.state.squares[4],this.state.squares[8]) || 
            this.isEqual(this.state.squares[2],this.state.squares[4],this.state.squares[6])
        ) { 
            newState.isGameOver = true;
            newState.title = 'Player ' + this.state.currentPlayer + ' Won';
            newState.titleClass = 'status-game-over';
            newState.showReset = true;
            this.setState(newState);
        }
    }



    isEqual(val1, val2, val3) {
        return val1 === val2 && val1 === val3 && val1 != null;
    }

    render() {

        return (
            <div className='top'>
                <div className={this.state.titleClass}>{this.state.title}</div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <Reset onClick={() => this.resetGame()}/>
            </div>
        )
    }

    resetGame() {
        this.setState(this.defaultState());
    }
}