import Player from './components/Player';
const App = () => {
  return (
    <main>
      <div id="gameMainContainer">
        <ol id="players">
          <Player name={'player 1'} symbol={'O'} />
          <Player name={'player 2'} symbol={'X'} />
        </ol>
      </div>
    </main>
  );
};
export default App;
