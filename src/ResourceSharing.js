import React, { useState } from "react";
import Texture from "./images/texture.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function ResourceSharing({ players, loggedInPlayer, onShare, onClose }) {
  const [toPlayerId, setToPlayerId] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [amount, setAmount] = useState(0);
  
  const handleShare = () => {
    const availableAmount = loggedInPlayer.resources[resourceType]?.amount || 0;

    if (amount <= 0 || amount > availableAmount) {
      alert(
        `Invalid amount! You only have ${availableAmount} ${resourceType}.`
      );
    } else if (!toPlayerId) {
      alert("Please select a player to share resources with.");
    } else {
      onShare(Number(toPlayerId), resourceType, Number(amount));
      setAmount(0);
      onClose();
    }
  };

  return (
    <Box
      sx={{
        padding: "12px",
        borderRadius: "5px",
        color: "black",
        fontSize: "14px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${Texture})`,
          position: "absolute",
          opacity: 0.2,
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: -2,
        }}
      />

      <Typography
        variant="h5"
        gutterBottom
        sx={{
          marginBottom: "6px",
          color: "#b11d18",
          lineHeight: "1.4",
          fontSize: "22px",
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "'Press Start 2P', 'system-ui'",
        }}
      >
        Share Resources
      </Typography>

      <Box sx={{ minWidth: 120, marginTop: "8px" }}>
        <FormControl fullWidth>
          <InputLabel id="player-select-label" sx={{ color: "black" }}>
            Player
          </InputLabel>
          <Select
            labelId="player-select-label"
            id="player-select"
            value={toPlayerId}
            onChange={(e) => setToPlayerId(e.target.value)}
            label="Player"
          >
            {players?.filter((player) => player.id !== loggedInPlayer.id)
              .map((playerDetail) => (
                <MenuItem key={playerDetail.id} value={playerDetail.id}>
                  {playerDetail.player}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120, marginTop: "8px" }}>
        <FormControl fullWidth>
          <InputLabel id="player-select-label" sx={{ color: "black" }}>
            Resources
          </InputLabel>
          <Select
            labelId="resource-type-select-label"
            id="resource-type-select"
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            label="Resource Type"
            sx={{ marginTop: "6px", color: "black" }}
          >
            <MenuItem value="wool">Wool</MenuItem>
            <MenuItem value="sheep">Sheep</MenuItem>
            <MenuItem value="wolves">Wolves</MenuItem>
            <MenuItem value="grass">Grass</MenuItem>
            <MenuItem value="farmer">Farmer</MenuItem>
            <MenuItem value="land">Land</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TextField
        id="outlined-basic"
        label="Quantity"
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ width: "100%", marginTop: "12px" }}
        type="number"
      />

      <Button
        onClick={handleShare}
        style={{
          width: "100%",

          backgroundColor: "#B11D18",
          color: "white",
          fontSize: "18px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontFamily: "'Press Start 2P', system-ui",
          fontWeight: "bold",
          marginTop: "10px",
          marginBottom: "8px",
        }}
      >
        Share Resources
      </Button>
    </Box>
  );
}

export default ResourceSharing;
