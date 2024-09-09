// import { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import ResourceSharingGameABI from "./artifacts/contracts/ResourceSharingGame.sol/ResourceSharingGame.json";


// const useWeb3 = () => {
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     const initWeb3 = async () => {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       // Replace with your contract address and ABI
//       const contractAddress = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6';
//       const contractABI =ResourceSharingGameABI.abi; 
//       const contract = new ethers.Contract(contractAddress, contractABI, signer);

//       setProvider(provider);
//       setSigner(signer);
//       setContract(contract);
//     };

//     initWeb3();
//   }, []);

//   return { provider, signer, contract };
// };

// export default useWeb3;
