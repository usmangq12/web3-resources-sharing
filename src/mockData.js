import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import GrassIcon from "@mui/icons-material/Grass";
import LandscapeIcon from "@mui/icons-material/Landscape";
import { Wool, Sheep, Wolf } from "./svg/index";
const mockData = [
  {
    id: 1,
    player: "PlayerOne",
    isLoggedIn: true,
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
