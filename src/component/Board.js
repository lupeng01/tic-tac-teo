import React from 'react';
import Square from './Square';

class Board extends React.Component {
  
  renderSquare(row,col,iswin) {
    return (
      <Square
        iswin={iswin} 
        key={row.toString()+col.toString()}
        value={this.props.squares[row][col]} 
        onClick={() => this.props.onClick(row, col)} />
    );
  }
  isWinSquare(row,col){
    if(this.props.winner){
      let [[a1,a2],[b1,b2],[c1,c2]] = this.props.winner;
      if((row === a1 && col === a2) || (row === b1 && col === b2) || (row === c1 && col === c2)){
        return true;
      }
    }
    return false;
  }
  render() {
    let boardRow = [];
    for (var i = 0; i < 3; i++) {
      let listSquares = [];
      for (var j = 0; j < 3; j++) {
        //let
        listSquares.push(this.renderSquare(i,j,this.isWinSquare(i,j)));
      }
      boardRow.push(
        <div className="board-row" key={'board-row'+ i}>
          {listSquares}
        </div>
      );
    }

    return (
      <div>
        {boardRow}
      </div>
    );
  }
}

export default Board;