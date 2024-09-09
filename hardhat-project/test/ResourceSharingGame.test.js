const { expect } = require("chai");

describe("ResourceSharingGame", function () {
  let ResourceSharingGame;
  let resourceSharingGame;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    ResourceSharingGame = await ethers.getContractFactory("ResourceSharingGame");
    [owner, addr1, addr2, _] = await ethers.getSigners();

    // Deploy a new ResourceSharingGame contract for each test
    resourceSharingGame = await ResourceSharingGame.deploy();
    await resourceSharingGame.deployed();
  });

  describe("Registration", function () {
    it("Should register a new player", async function () {
      await resourceSharingGame.registerPlayer();
      const player = await resourceSharingGame.players(owner.address);
      expect(player.wool).to.equal(100);
      expect(player.sheep).to.equal(10);
      expect(player.wolves).to.equal(5);
      expect(player.grass).to.equal(50);
      expect(player.farmer).to.equal(1);
      expect(player.land).to.equal(20);
      expect(player.isLoggedIn).to.be.false;
    });

    it("Should not register the same player twice", async function () {
      await resourceSharingGame.registerPlayer();
      await expect(resourceSharingGame.registerPlayer()).to.be.revertedWith("Player already registered");
    });
  });

  describe("Login/Logout", function () {
    it("Should allow a registered player to log in", async function () {
      await resourceSharingGame.registerPlayer();
      await resourceSharingGame.login();
      const player = await resourceSharingGame.players(owner.address);
      expect(player.isLoggedIn).to.be.true;
    });

    it("Should allow a logged-in player to log out", async function () {
      await resourceSharingGame.registerPlayer();
      await resourceSharingGame.login();
      await resourceSharingGame.logout();
      const player = await resourceSharingGame.players(owner.address);
      expect(player.isLoggedIn).to.be.false;
    });

    it("Should not allow a non-registered player to log in", async function () {
      await expect(resourceSharingGame.connect(addr1).login()).to.be.revertedWith("Player not registered");
    });
  });

  describe("Resource Sharing", function () {
    beforeEach(async function () {
      await resourceSharingGame.registerPlayer();
      await resourceSharingGame.connect(addr1).registerPlayer();
    });

    it("Should share resources between players", async function () {
      // Register and login the players
      await resourceSharingGame.login();
      await resourceSharingGame.connect(addr1).login();

      await resourceSharingGame.shareResources(addr1.address, "wool", 10);
      const ownerPlayer = await resourceSharingGame.players(owner.address);
      const addr1Player = await resourceSharingGame.players(addr1.address);

      expect(ownerPlayer.wool).to.equal(90);
      expect(addr1Player.wool).to.equal(110);
    });

    it("Should not allow sharing more resources than available", async function () {
      await resourceSharingGame.login();
      await expect(resourceSharingGame.shareResources(addr1.address, "wool", 200)).to.be.revertedWith("Not enough wool");
    });

    it("Should not allow sharing invalid resource types", async function () {
      await resourceSharingGame.login();
      await expect(resourceSharingGame.shareResources(addr1.address, "invalidResource", 10)).to.be.revertedWith("Invalid resource type");
    });
  });
});
