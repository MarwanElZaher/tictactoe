const GameOver = ({ winnerPlayer, onRestart, hasDraw }) => {
  return (
    <div id="game-over">
      <h2>GameOver!</h2>
      {hasDraw ? <p>Draw</p> : <p>{winnerPlayer} Won!</p>}

      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
};
export default GameOver;
