import { useState } from 'react';

const Player = ({ name, symbol, isActive, onPlayerNameChange }) => {
  const [isEditing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };
  const handleBtnClick = () => {
    if (isEditing) {
      onPlayerNameChange(symbol, playerName);
    }
    setEditing((editing) => !editing);
  };

  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {isEditing ? (
          <input
            required
            type="text"
            value={playerName}
            placeholder={playerName}
            onChange={handleChange}
          ></input>
        ) : (
          <span className="playerName">{playerName}</span>
        )}
        <span className="playerSymbol">{symbol}</span>
      </span>
      <button onClick={handleBtnClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
};
export default Player;
