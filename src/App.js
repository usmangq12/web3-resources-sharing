import React, { useState } from "react";
import mockData from "./mockData";
import ResourceSharing from "./ResourceSharing";
import "./App.css";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [players, setPlayers] = useState(mockData);

  // Find the logged-in player
  const loggedInPlayer = players.find((player) => player.isLoggedIn);

  const handleResourceShare = (toPlayerId, resourceType, amount) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) => {
        if (player.id === loggedInPlayer.id) {
          return {
            ...player,
            resources: {
              ...player.resources,
              [resourceType]: {
                ...player.resources[resourceType],
                amount: player.resources[resourceType].amount - amount,
              },
            },
          };
        } else if (player.id === toPlayerId) {
          return {
            ...player,
            resources: {
              ...player.resources,
              [resourceType]: {
                ...player.resources[resourceType],
                amount: player.resources[resourceType].amount + amount,
              },
            },
          };
        }
        return player;
      });
      return updatedPlayers;
    });
  };

  return (
    <div className="App">
      <h1>Wolf Game - Logged In: {loggedInPlayer.player}</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>{loggedInPlayer.player}</h2>
        <div>
          {Object.entries(loggedInPlayer.resources).map(([resource, data]) => {
            console.log("resource", data.icon); // Correct placement for console log

            return (
              <div key={resource}>
                <data.icon style={{ width: "40px", height: "40px" }} />
                {/* <img src={data.icon} alt={resource} /> */}
                {/* Display resource icon */}
                {resource}: {data.amount}
              </div>
            );
          })}
        </div>
      </div>

      {players
        .filter((player) => !player.isLoggedIn)
        .map((otherPlayer) => (
          <div key={otherPlayer.id} style={{ marginBottom: "20px" }}>
            <h2>{otherPlayer.player}</h2>
            <div>
              {Object.entries(otherPlayer.resources).map(([resource, data]) => (
                <div key={resource}>
                  <data.icon style={{ width: "40px", height: "40px" }} />
                  {/* <img src={data.icon} alt={resource} /> */}
                  {resource}: {data.amount}
                </div>
              ))}
            </div>
          </div>
        ))}

      <ResourceSharing
        players={players}
        loggedInPlayer={loggedInPlayer}
        onShare={handleResourceShare}
      />
    </div>
  );
}

export default App;
