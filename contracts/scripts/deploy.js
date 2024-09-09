// async function main() {
//     // const [deployer] = await ethers.getSigners();
//     const [deployer, user1, user2] = await ethers.getSigners();
    
//     console.log("Deploying contracts with the account:", deployer.address);
  
//     const ResourceSharingGame = await ethers.getContractFactory("ResourceSharingGame");
//     const resourceSharingGame = await ResourceSharingGame.deploy();
  
//     console.log("Contract deployed to address:", resourceSharingGame.address);
//     console.log("User 1 address:", user1.address);
//   console.log("User 2 address:", user2.address);
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });

// deploy.js
// const fs = require('fs');
// const path = require('path');

// async function main() {
//     const [deployer] = await ethers.getSigners();

//     console.log("Deploying contracts with the account:", deployer.address);

//     const ResourceSharingGame = await ethers.getContractFactory("ResourceSharingGame");
//     const resourceSharingGame = await ResourceSharingGame.deploy();

//     console.log("Contract deployed to address:", resourceSharingGame.address);

//     // Use absolute path to the contract-address.json file in your React project
//     const reactProjectDir = path.resolve(process.cwd(), '../src');
//     const filePath = path.join(reactProjectDir, 'contract-address.json');

//     // Ensure the directory exists
//     if (!fs.existsSync(reactProjectDir)) {
//         fs.mkdirSync(reactProjectDir, { recursive: true });
//     }

//     // Save the contract address
//     const contractAddress = {
//         contractAddress: resourceSharingGame.address,
//     };

//     try {
//         fs.writeFileSync(filePath, JSON.stringify(contractAddress, null, 2), 'utf8');
//         console.log(`Contract address saved to ${filePath}`);
//     } catch (err) {
//         console.error(`Error saving contract address: ${err.message}`);
//     }
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

async function main() {
  const [deployer, user1, user2] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const ResourceSharingGame = await ethers.getContractFactory("ResourceSharingGame");
  const resourceSharingGame = await ResourceSharingGame.deploy();

  console.log("Contract deployed to address:", resourceSharingGame.address);
  console.log("User 1 address:", user1.address);
  console.log("User 2 address:", user2.address);

  await resourceSharingGame.connect(user1).registerPlayer();
  await resourceSharingGame.connect(user2).registerPlayer();

  // Interactions between users
  await resourceSharingGame.connect(user1).shareResources(user2.address, "wool", 10);

  console.log("Resource sharing done.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });


