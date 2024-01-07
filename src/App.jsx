import Player from './components/Player';
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import Log from './components/Log';
import { getActivePlayer } from './components/helperFunctions';
import { WINNING_COMBINATIONS } from './components/winningComb';
import GameOver from './components/GameOver';
import { INITIAL_GAME_BOARD, PLAYERS } from './components/constants';

const derivingWinner = (gameBoard, players) => {
  let winnerPlayer;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winnerPlayer = players[firstSquareSymbol];
    }
  }
  return winnerPlayer;
};
const derivingGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
  }
  return gameBoard;
};

const App = () => {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = derivingGameBoard(gameTurns);
  const winnerPlayer = derivingWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winnerPlayer;
  const handleSelectSquare = (rowIndex, columnIndex) => {
    setGameTurns((prevGameTurn) => {
      const currentPlayer = getActivePlayer(prevGameTurn);
      const updatedGameTurns = [
        {
          square: { row: rowIndex, column: columnIndex },
          player: currentPlayer,
        },
        ...prevGameTurn,
      ];
      return updatedGameTurns;
    });
  };
  const handleRematch = () => {
    setGameTurns([]);
  };
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  };
  return (
    <main>
      <div id="gameMainContainer">
        <ol id="players" className="highlightPlayer">
          <Player
            onPlayerNameChange={handlePlayerNameChange}
            name={PLAYERS.X}
            symbol={'X'}
            isActive={activePlayer === 'X'}
          />
          <Player
            onPlayerNameChange={handlePlayerNameChange}
            name={PLAYERS.O}
            symbol={'O'}
            isActive={activePlayer === 'O'}
          />
        </ol>
        {(winnerPlayer || hasDraw) && (
          <GameOver
            hasDraw={hasDraw}
            winnerPlayer={winnerPlayer}
            onRestart={handleRematch}
          />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
};
export default App;
