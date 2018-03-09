import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history: [{
        squares:[Array(3).fill(null),Array(3).fill(null),Array(3).fill(null)]
      }],
      xIsNext:true,
      current:0
    };
    //this.handleClickSquare = this.handleClickSquare.bind(this);
  }
  handleClickSquare(row, col){

    console.log(row,col);
    let currentSquares = this.state.history[this.state.current].squares;
    let winner = calculateWinner(currentSquares);
    if (winner || currentSquares[row][col]) {
      return;
    }
    let currentList = this.state.history.slice(0, this.state.current + 1);
    let newSquares = currentList[this.state.current].squares.slice();

    console.log(this.state.history);
    console.log(newSquares);
    console.log(currentList);

    newSquares[row][col] = this.state.xIsNext?'X':'O';
    currentList.concat([{squares:newSquares}]);

    console.log(newSquares);
    console.log(currentList);

    this.setState({
      history:currentList,
      xIsNext:!this.state.xIsNext,
      current:currentList.length - 1
    });
  }
  handleClickHistrory(step){
    this.setState({
      current:step,
      xIsNext: (step % 2)? false:true
    });
  }
  render() {
    //console.log(this.state);
    let squares = this.state.history[this.state.current].squares;
    //console.log(squares);
    let winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext?'X':'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(row, col) => this.handleClickSquare(row, col)} />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>
            {
              this.state.history.map((his,index) => {
                let text = index?'Move to #' + index:'Game start';
                return(
                    <li key={text}>
                      <button onClick={() => this.handleClickHistrory(index)}>
                        {text}
                      </button>
                    </li>
                )})
            }
          </ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]],
  ];
  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    let [a1, a2] = a;
    let [b1, b2] = b;
    let [c1, c2] = c;
    if (squares[a1][a2] && squares[a1][a2] === squares[b1][b2] && squares[c1][c2] === squares[a1][a2]) {
      return squares[a1][a2];
    }
  }
  return null;
}
export default Game;