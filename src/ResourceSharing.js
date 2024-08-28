import React, { useState } from "react";

function ResourceSharing({ players, loggedInPlayer, onShare }) {
  const [toPlayerId, setToPlayerId] = useState("");
  const [resourceType, setResourceType] = useState("wool");
  const [amount, setAmount] = useState(0);

  const handleShare = () => {
    const availableAmount = loggedInPlayer.resources[resourceType];

    if (amount <= 0 || amount > availableAmount) {
      alert(`Invalid amount! You only have ${availableAmount} ${resourceType}.`);
    } else if (!toPlayerId) {
      alert("Please select a player to share resources with.");
    } else {
      onShare(Number(toPlayerId), resourceType, Number(amount));
      setAmount(0);
    }
  };

  return (
    <div>
      <h3>Share Resources</h3>

      <div>
        <label>
          To Player:
          <select value={toPlayerId} onChange={(e) => setToPlayerId(e.target.value)}>
            <option value="">Select Player</option>
            {players
              .filter(player => player.id !== loggedInPlayer.id) 
              .map(player => (
                <option key={player.id} value={player.id}>
                  {player.player}
                </option>
              ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Resource Type:
          <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
            <option value="wool">Wool</option>
            <option value="sheep">Sheep</option>
            <option value="wolves">Wolves</option>
            <option value="grass">Grass</option>
            <option value="farmer">Farmer</option>
            <option value="land">Land</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>

      <button onClick={handleShare}>Share Resources</button>
    </div>
  );
}

export default ResourceSharing;
