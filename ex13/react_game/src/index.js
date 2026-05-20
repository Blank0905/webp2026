import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// 1. Square 元件 (負責渲染單一格子) [cite: 1515, 1518]
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// 2. Board 元件 (負責渲染 3x3 的遊戲盤) [cite: 1448, 1450]
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// 3. Game 元件 (負責管理歷史紀錄、步驟與輪替狀態) [cite: 986, 1004]
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  // 處理點擊事件 [cite: 1257, 1260]
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    // 如果已經有人贏了，或是該格子已經有值，就不做任何事 [cite: 1268]
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  // 回到特定步驟 [cite: 1298, 1301]
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares); // 檢查是否有贏家 [cite: 1039]

    // 建立歷史步驟按鈕 [cite: 1045, 1047]
    const moves = history.map((step, move) => {
      const desc = move ?
        '回到 #' + move + ' 步' :
        '遊戲開始';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "贏家是: " + winner;
    } else {
      status = "下一位玩家: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// 4. 判斷贏家的輔助函式 [cite: 1202, 1240]
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫線
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 直線
    [0, 4, 8], [2, 4, 6]             // 對角線
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// 渲染到畫面 [cite: 974, 979]
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);