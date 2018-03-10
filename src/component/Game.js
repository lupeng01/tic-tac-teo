import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history: [
        [Array(3).fill(null),Array(3).fill(null),Array(3).fill(null)]
      ],
      xIsNext:true,
      current:0
    };
    //this.handleClickSquare = this.handleClickSquare.bind(this);
  }
  handleClickSquare(row, col){

    //console.log(row,col);
    let currentSquares = this.state.history[this.state.current];
    let winner = calculateWinner(currentSquares);
    if (winner || currentSquares[row][col]) {
      return;
    }
    let currentList = this.state.history.slice(0, this.state.current + 1);
    let newSquares = [Array(3).fill(null),Array(3).fill(null),Array(3).fill(null)];
    newSquares[0] = currentList[this.state.current][0].slice();
    newSquares[1] = currentList[this.state.current][1].slice();
    newSquares[2] = currentList[this.state.current][2].slice();

    /*console.log(this.state.history);
    console.log(newSquares);
    console.log(currentList);*/

    //currentList.concat([{squares:newSquares}]);
    newSquares[row][col] = this.state.xIsNext?'X':'O';
    currentList = currentList.concat([newSquares]);
    /*console.log(newSquares);
    console.log(currentList);*/

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
    let squares = this.state.history[this.state.current];
    //console.log(squares);
    let winner = calculateWinner(squares);
    let status;
    if (winner) {
      let a = winner[0];
      let [a1, a2] = a;
      status = 'Winner: ' + squares[a1][a2];
    } else {
      status = 'Next player: ' + (this.state.xIsNext?'X':'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(row, col) => this.handleClickSquare(row, col)} winner={winner}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>
            {
              this.state.history.map((his,index) => {
                let text = index?'Move to #' + index:'Game start';
                return(
                    <li key={text} className={(index === this.state.current)?'active':''}>
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
      //return squares[a1][a2];
      return lines[i];
    }
  }
  return null;
}
export default Game;