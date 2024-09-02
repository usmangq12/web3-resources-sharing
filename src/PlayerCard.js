import React from "react";
import Texture from "./images/texture.jpg";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";

function PlayerCard({ player }) {
  return (
    <Box className="player-card">
      <Box
        className="background-texture"
        style={{ backgroundImage: `url(${Texture})` }}
      ></Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          marginBottom: "12px",
          color: "#b11d18",
          fontSize: "24px",
          textAlign: "center",
          fontFamily: "'Press Start 2P', 'system-ui'",
        }}
      >
        Usmangq
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <Grid container spacing={3}>
          {Object.entries(player.resources).map(([resource, data]) => (
            <Grid key={resource} size={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "cener",
                  alignItems: "center",
                }}
              >
                <data.icon sx={{ width: "30px", height: "30px" }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    fontFamily: "Press Start 2P, system-ui !important",
                  }}
                >
                  {resource}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    fontFamily: "Press Start 2P, system-ui !important",
                    marginLeft:"auto"
                  }}
                >
                  {data.amount}
                </Typography>
              </Box>
             </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default PlayerCard;
