import React from "react";
import ResourceSharing from "./ResourceSharing";
import { Box } from "@mui/material";
import BorderImage from "./images/border.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width:{xs:300,sm:400,md:472},
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderWidth: "30px",
  borderImage: `url(${BorderImage}) 30 / 1 / 0 stretch`,
};

function ResourceSharingModal({ onClose, players, loggedInPlayer, onShare }) {
  return (
    <Box sx={style}>
      <ResourceSharing
        onClose={onClose}
        players={players}
        loggedInPlayer={loggedInPlayer}
        onShare={onShare}
      />
    </Box>
  );
}

export default ResourceSharingModal;
