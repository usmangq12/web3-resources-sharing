// import React, { useState, useEffect } from "react";
// import mockData from "./mockData";
// import ResourceSharingModal from "./ResourceSharingModal";
// import Switch from "@mui/material/Switch";
// import PlayerCard from "./PlayerCard";
// import PersonIcon from "@mui/icons-material/Person";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   Grid2,
//   Modal,
//   Typography,
// } from "@mui/material";
// import BorderImage from "./images/border.jpg";
// import Texture from "./images/texture.jpg";
// import "./App.css";
// import { ethers } from "ethers";
// import ResourceSharingGameABI from "./artifacts/contracts/ResourceSharingGame.sol/ResourceSharingGame.json";

// function App() {
//   const [players, setPlayers] = useState(mockData);
//   const [open, setOpen] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

// const [provider, setProvider] = useState(null);
// const [account, setAccount] = useState('');
// const [contract, setContract] = useState(null);

// useEffect(() => {
//   const initialize = async () => {
//     if (typeof window !== 'undefined') {
//       if (window.ethereum) {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         setProvider(provider);

//         try {
//           const accounts = await provider.send("eth_requestAccounts", []);
//           setAccount(accounts[0]);

//           const signer = provider.getSigner();
//           const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//           const contractInstance = new ethers.Contract(
//             contractAddress,
//             ResourceSharingGameABI.abi,
//             signer
//           );
//           setContract(contractInstance);
//         } catch (error) {
//           console.error('Error connecting to Ethereum:', error);
//         }
//       } else {
//         console.error('Ethereum provider not found');
//       }
//     } else {
//       console.error('window is not defined');
//     }
//   };

//   initialize();
// }, []);

//   const loggedInPlayer = players.find((player) => player.isLoggedIn);

//   const handleResourceShare = (toPlayerId, resourceType, amount) => {
//     setPlayers((prevPlayers) => {
//       const updatedPlayers = prevPlayers.map((player) => {
//         if (player.id === loggedInPlayer.id) {
//           return {
//             ...player,
//             resources: {
//               ...player.resources,
//               [resourceType]: {
//                 ...player.resources[resourceType],
//                 amount: player.resources[resourceType].amount - amount,
//               },
//             },
//           };
//         } else if (player.id === toPlayerId) {
//           return {
//             ...player,
//             resources: {
//               ...player.resources,
//               [resourceType]: {
//                 ...player.resources[resourceType],
//                 amount: player.resources[resourceType].amount + amount,
//               },
//             },
//           };
//         }
//         return player;
//       });
//       return updatedPlayers;
//     });
//     const toPlayer = players.find((player) => player.id === toPlayerId);
//     setTransactions((prevTransactions) => [
//       ...prevTransactions,
//       `You gave ${amount} ${resourceType} to ${toPlayer.player}`,
//     ]);
//   };

//   return (
//     <Box className="app-container">
//       <Box
//         sx={{
//           widht: "100%",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "0 24px",

//           position: "relative",
//           borderImage: `url(${BorderImage}) 30 / 1 / 0 stretch `,
//           borderWidth: "30px ",
//           backgroundColor: "rgba(237, 227, 207, 0.7)",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             opacity: "0.2",
//             width: "100%",
//             height: "100%",
//             top: "0",
//             left: "0",

//             backgroundImage: `url(${Texture})`,
//           }}
//         />
//         <PersonIcon
//           sx={{
//             width: { sm: "46px", md: "46px" },
//             height: "46px",
//             color: "#B11D18",
//           }}
//         />
//         <Box
//           sx={{
//             display: "flex",
//             gap: "12px",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h5" className="share_resource_text">
//             Wool {loggedInPlayer.resources.wool.amount}
//           </Typography>

//           <Box className="button-container">
//             <Button
//               onClick={handleOpen}
//               className="send-resources-button"
//               sx={{
//                 border: " 2px solid black",
//                 backgroundColor: "transparent",
//                 borderRadius: "8px",
//                 fontFamily: "'Press Start 2P', 'system-ui'",
//                 color: "#862227",
//                 borderImage: `url(${BorderImage}) 30/ 1 /0 stretch`,
//                 borderWidth: "4px",
//               }}
//             >
//               Send Resources
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//       <Box className="header-container">
//         <Box
//           sx={{
//             textAlign: "center",
//             color: "transparent",
//             fontSize: "40px",
//             background: `linear-gradient(180deg, #b11d18 0%, #862227 65%, #862227 100%)`,
//             backgroundClip: "text",
//             fontWeight: "800",
//             lineHeight: "1.6",
//           }}
//         >
//           Sheep Game
//         </Box>
//       </Box>
//       <Box sx={{ display: "flex", gap: "8px", width: {sm:"80%",md:"50%" }, margin: "auto" }}>
//         <PlayerCard player={loggedInPlayer} />
//       </Box>

//       <Box
//   className="text-container"
//   sx={{
//     width:{ sm: "60%" , md: "30%" },
//     margin: "auto",
//     marginTop: "16px",
//     height: "300px", // Fixed height for the parent container

//     position: "relative", // Position relative for background positioning
//     backgroundImage: `url(${Texture})`, // Apply the background directly to the parent
//     backgroundSize: "cover", // Make the background cover the container
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center",
//     overflow: "hidden", // Hide overflow for parent container
//   }}
// >
// <Box
//           sx={{
//             position: "absolute",
//             opacity: "0.2",
//             width: "100%",
//             height: "100%",
//             top: "0",
//             left: "0",

//             backgroundImage: `url(${Texture})`,
//           }}
//         />
//   {/* Inner scrollable container */}
//   <Box
//     sx={{
//       backgroundColor: `rgba(237, 227, 207, 0.7) ` ,
//       zIndex: "10",
//       padding: "12px",
//       height: "100%", // Full height of parent container to use all space
//       overflowY: "auto", // Enable vertical scrolling for inner container
//     }}
//   >
//      <h1>Account: {account}</h1>
//     {transactions &&
//       transactions.map((transaction, index) => (
//         <Card key={index} sx={{ marginBottom: "8px" }}>
//           <CardContent>
//             <Typography variant="body2">{transaction}</Typography>
//           </CardContent>
//         </Card>
//       ))}
//   </Box>
// </Box>

//       <Modal open={open} onClose={handleClose}>
//         <ResourceSharingModal
//           onClose={handleClose}
//           players={players}
//           loggedInPlayer={loggedInPlayer}
//           onShare={handleResourceShare}
//         />
//       </Modal>
//     </Box>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import mockData from "./mockData";
import ResourceSharingModal from "./ResourceSharingModal";
import Switch from "@mui/material/Switch";
import PlayerCard from "./PlayerCard";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Grid2,
  Modal,
  Typography,
} from "@mui/material";
import BorderImage from "./images/border.jpg";
import Texture from "./images/texture.jpg";
import "./App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { ethers } from "ethers";
import ResourceSharingGameABI from "./artifacts/contracts/ResourceSharingGame.sol/ResourceSharingGame.json";

function App() {
  const [players, setPlayers] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [providerError, setProviderError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const initialize = async () => {
      if (typeof window !== "undefined") {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);

          try {
            const accounts = await provider.listAccounts();
            if (accounts.length === 0) {
              // No accounts available, request permission
              const requestedAccounts = await provider.send(
                "eth_requestAccounts",
                []
              );
              setAccount(requestedAccounts[0]);
            } else {
              // Accounts already available
              setAccount(accounts[0]);
            }

            const signer = provider.getSigner();
            const contractAddress =
              "0x03d67431E1d73e513ff5604FA67f18c281fDE48f";
            const contractInstance = new ethers.Contract(
              contractAddress,
              ResourceSharingGameABI.abi,
              signer
            );
            setContract(contractInstance);
          } catch (error) {
            console.error("Error connecting to Ethereum:", error);
            setProviderError(
              "Failed to connect to Ethereum. Please check your wallet."
            );
          }
        } else {
          setProviderError(
            "Ethereum provider not found. Please install MetaMask or another Ethereum wallet."
          );
        }
      } else {
        setProviderError(
          "Unable to detect the window object. Please ensure you are running in a supported environment."
        );
      }
    };

    initialize();
  }, []);

  const loggedInPlayer = players.find((player) => player.isLoggedIn);

  const handleResourceShare = async (toPlayerId, resourceType, amount) => {
    if (!contract) return;

    setLoading(true);

    try {
      const toPlayer = players.find((player) => player.id === toPlayerId);
      const tx = await contract.shareResources(
        toPlayer.address,
        resourceType,
        amount
      );
      await tx.wait();

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

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        `Successfully gave ${amount} ${resourceType} to ${toPlayer.name}`,
      ]);
    } catch (error) {
      console.error("Error sharing resources:", error);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        `Failed to give ${amount} ${resourceType} `,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="app-container">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          position: "relative",
          borderImage: `url(${BorderImage}) 30 / 1 / 0 stretch `,
          borderWidth: "30px ",
          backgroundColor: "rgba(237, 227, 207, 0.7)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            opacity: "0.2",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            backgroundImage: `url(${Texture})`,
          }}
        />
        <PersonIcon
          sx={{
            width: { sm: "46px", md: "46px" },
            height: "46px",
            color: "#B11D18",
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" className="share_resource_text">
            Wool {loggedInPlayer?.resources.wool.amount}
          </Typography>
          <Box className="button-container">
            <Button
              onClick={handleOpen}
              className="send-resources-button"
              sx={{
                border: "2px solid black",
                backgroundColor: "transparent",
                borderRadius: "8px",
                fontFamily: "'Press Start 2P', 'system-ui'",
                color: "#862227",
                borderImage: `url(${BorderImage}) 30/ 1 /0 stretch`,
                borderWidth: "4px",
              }}
            >
              Send Resources
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="header-container">
        <Box
          sx={{
            textAlign: "center",
            color: "transparent",
            fontSize: "40px",
            background: `linear-gradient(180deg, #b11d18 0%, #862227 65%, #862227 100%)`,
            backgroundClip: "text",
            fontWeight: "800",
            lineHeight: "1.6",
          }}
        >
          Sheep Game
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          width: { sm: "80%", md: "50%" },
          margin: "auto",
        }}
      >
        <PlayerCard player={loggedInPlayer} />
      </Box>

      <Box
        className="text-container"
        sx={{
          width: { sm: "60%", md: "30%" },
          margin: "auto",
          marginTop: "16px",
          height: "300px",
          position: "relative",
          backgroundImage: `url(${Texture})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            opacity: "0.2",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            backgroundImage: `url(${Texture})`,
          }}
        />
        {/* Inner scrollable container */}
        <Box
          sx={{
            backgroundColor: `rgba(237, 227, 207, 0.7) `,
            zIndex: "10",
            padding: "12px",
            height: "100%", // Full height of parent container to use all space
            overflowY: "auto", // Enable vertical scrolling for inner container
          }}
        >
          <h1>Account: {account}</h1>
          {providerError && (
            <Typography variant="body2" color="error">
              {providerError}
            </Typography>
          )}
          {transactions &&
            transactions.map((transaction, index) => (
              <Card key={index} sx={{ marginBottom: "8px" }}>
                <CardContent>
                  <Typography variant="body2">{transaction}</Typography>
                </CardContent>
              </Card>
            ))}
          {loading && <Typography variant="body2">Processing...</Typography>}
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
