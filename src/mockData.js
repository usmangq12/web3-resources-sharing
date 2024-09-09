import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import GrassIcon from '@mui/icons-material/Grass';
import LandscapeIcon from "@mui/icons-material/Landscape";
import { Wool, Sheep, Wolf } from "./svg/index";
const mockData = [
  {
    id: 1,
    player: "PlayerOne",
    isLoggedIn: true,
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    resources: {
      wool: { icon: Wool, amount: 100 },
      sheep: { icon: Sheep, amount: 200 },
      wolves: { icon: Wolf, amount: 15 },
      grass: { icon: GrassIcon, amount: 50 },
      farmer: { icon: DirectionsWalkIcon, amount: 1 },
      land: { icon: LandscapeIcon, amount: 20 },
    },
  },
  {
    id: 2,
    player: "PlayerTwo",
    isLoggedIn: false,
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    resources: {
      wool: { icon: Wool, amount: 150 },
      sheep: { icon: Sheep, amount: 15 },
      wolves: { icon: Wolf, amount: 8 },
      grass: { icon: GrassIcon, amount: 70 },
      farmer: { icon: DirectionsWalkIcon, amount: 2 },
      land: { icon: LandscapeIcon, amount: 25 },
    },
  },
];

export default mockData;
