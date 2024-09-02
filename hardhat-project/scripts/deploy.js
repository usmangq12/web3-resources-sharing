async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);
  
    const ResourceSharingGame = await ethers.getContractFactory("ResourceSharingGame");
    const resourceSharingGame = await ResourceSharingGame.deploy();
  
    console.log("Contract deployed to address:", resourceSharingGame.address);

    
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

