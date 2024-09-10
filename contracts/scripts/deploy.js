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


