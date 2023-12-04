import { useState } from 'react';

const Player = ({ name, symbol }) => {
  const [editing, setEditing] = useState(false);

  const startEditing = () => {
    setEditing(true);
  };
  const saveChanges = () => {
    setEditing(false);
  };
  return (
    <li>
      <span className="player">
        {!editing && <span className="playerName">{name}</span>}
        {editing && <input placeholder={`${name} name`}></input>}
        <span className="playerSymbol">{symbol}</span>
      </span>
      {!editing && <button onClick={startEditing}>Edit</button>}
      {editing && <button onClick={saveChanges}>Save</button>}
    </li>
  );
};
export default Player;
