import React, { useState, useEffect } from "react";
import mockData from "./mockData";
import ResourceSharingModal from "./ResourceSharingModal";
import PlayerCard from "./PlayerCard";
import { Box, Button, Modal } from "@mui/material";
import BorderImage from "./images/border.jpg";
import "./App.css";
import { ethers } from "ethers";
import ResourceSharingGameABI from "./artifacts/contracts/ResourceSharingGame.sol/ResourceSharingGame.json";
import contractAddressData from "./contract-address.json";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [players, setPlayers] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const initialize = async () => {
      // Use Hardhat's local network URL
      const localProvider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );
      // setProvider(localProvider);

      try {
        const accounts = await localProvider.listAccounts();
        if (accounts.length === 0) {
          console.log("No accounts found on the local Hardhat network.");
        }
        // } else {
        //   setAccount(accounts[0]);
        // }

        const signer = localProvider.getSigner();
        const contractInstance = new ethers.Contract(
          contractAddressData.contractAddress,
          ResourceSharingGameABI.abi,
          signer
        );
        setContract(contractInstance);
        console.log("Contract instance created:", contractInstance);
        console.log("Connected as:", accounts[0]);
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };

    initialize();
  }, []);

  const loggedInPlayer = players.find((player) => player.isLoggedIn);

  const handleResourceShare = async (toPlayerId, resourceType, amount) => {
    if (!contract) {
      alert("Please connect account");
    }

    // setLoading(true);

    try {
      const toPlayer = players.find((player) => player.id === toPlayerId);
      if (!toPlayer || !toPlayer.address) {
        throw new Error("Invalid recipient player or address");
      }

      const gasLimit = 1000000;

      // Call the smart contract function to share resources
      const tx = await contract.shareResources(
        toPlayer.address,
        resourceType,
        amount,
        {
          gasLimit: gasLimit,
        }
      );

      await tx.wait(); // Wait for the transaction to be confirmed

      // Update the players' resources after successful transaction

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
      alert(
        `Successfully gave ${amount} ${resourceType} to ${toPlayer.player}`
      );
    } catch (error) {
      console.error("Error sharing resources:", error);
      // setTransactions((prevTransactions) => [
      //   ...prevTransactions,
      //   `Failed Transactions`,
      // ]);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <Box className="app-container">
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 24px",
          position: "relative",
          borderImage: `url(${BorderImage}) 30 / 1 / 0 stretch `,
          borderWidth: "30px ",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            color: "transparent",
            fontSize: { xs: "26px", lg: "40px" },
            backgroundClip: "text",
            fontWeight: "800",
            color: "rgb(177, 29, 24)",
          }}
        >
          Sheep Game
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: { sm: "60%", md: "50%" },
          margin: "auto",
          marginTop: "12px",
        }}
      >
        <PlayerCard player={loggedInPlayer} />
        <Box className="button-container">
          <Button
            onClick={handleOpen}
            style={{
              backgroundColor: "#B11D18",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "'Press Start 2P', system-ui",
              fontWeight: "bold",
              marginTop: "10px",
              marginBottom: "8px",
            }}
          >
            Send Resources
          </Button>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <ResourceSharingModal
          players={players}
          onClose={handleClose}
          loggedInPlayer={loggedInPlayer}
          onShare={handleResourceShare}
        />
      </Modal>
    </Box>
  );
}

export default App;
