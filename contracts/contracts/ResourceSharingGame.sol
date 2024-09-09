// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResourceSharingGame {
    struct Player {
        uint256 id;
        uint256 wool;
        uint256 sheep;
        uint256 wolves;
        uint256 grass;
        uint256 farmer;
        uint256 land;
        bool isLoggedIn;
        bool isRegistered;
    }

    uint256 public playerCount;
    mapping(address => Player) public players;
    address[] public playerAddresses;

    event ResourceShared(address indexed from, address indexed to, string resourceType, uint256 amount);
    event PlayerRegistered(address indexed player);
    event PlayerLoggedIn(address indexed player);
    event PlayerLoggedOut(address indexed player);
    event ResourcesAdded(address indexed player, string resourceType, uint256 amount);

    // Register a new player with default resources
    function registerPlayer() public {
        require(!players[msg.sender].isRegistered, "Player already registered");
        playerCount++;
        players[msg.sender] = Player(playerCount, 100, 10, 5, 50, 1, 20, false, true);
        playerAddresses.push(msg.sender);
        emit PlayerRegistered(msg.sender);
    }

    // Login the player
    function login() public {
        require(players[msg.sender].isRegistered, "Player not registered");
        players[msg.sender].isLoggedIn = true;
        emit PlayerLoggedIn(msg.sender);
    }

    // Logout the player
    function logout() public {
        require(players[msg.sender].isRegistered, "Player not registered");
        players[msg.sender].isLoggedIn = false;
        emit PlayerLoggedOut(msg.sender);
    }

    // Add resources for testing or game purposes
    function addResources(string memory resourceType, uint256 amount) public {
        require(players[msg.sender].isRegistered, "Player not registered");
        require(amount > 0, "Amount must be greater than zero");
        Player storage player = players[msg.sender];

        if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("wool"))) {
            player.wool += amount;
        } else if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("sheep"))) {
            player.sheep += amount;
        } else if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("wolves"))) {
            player.wolves += amount;
        } else if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("grass"))) {
            player.grass += amount;
        } else if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("farmer"))) {
            player.farmer += amount;
        } else if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("land"))) {
            player.land += amount;
        } else {
            revert("Invalid resource type");
        }

        emit ResourcesAdded(msg.sender, resourceType, amount);
    }

    // Share resources with another player
    function shareResources(address to, string memory resourceType, uint256 amount) public {
        require(players[msg.sender].isRegistered, "Player not registered");
        require(players[to].isRegistered, "Recipient not registered");
        require(amount > 0, "Amount must be greater than zero");
        require(to != address(0), "Invalid recipient address");

        Player storage sender = players[msg.sender];
        Player storage recipient = players[to];

        if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("wool"))) {
            require(sender.wool >= amount, "Not enough wool");
            sender.wool -= amount;
            recipient.wool += amount;
        } else if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("sheep"))) {
            require(sender.sheep >= amount, "Not enough sheep");
            sender.sheep -= amount;
            recipient.sheep += amount;
        } else if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("wolves"))) {
            require(sender.wolves >= amount, "Not enough wolves");
            sender.wolves -= amount;
            recipient.wolves += amount;
        } else if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("grass"))) {
            require(sender.grass >= amount, "Not enough grass");
            sender.grass -= amount;
            recipient.grass += amount;
        } else if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("farmer"))) {
            require(sender.farmer >= amount, "Not enough farmers");
            sender.farmer -= amount;
            recipient.farmer += amount;
        } else if (keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("land"))) {
            require(sender.land >= amount, "Not enough land");
            sender.land -= amount;
            recipient.land += amount;
        } else {
            revert("Invalid resource type");
        }

        emit ResourceShared(msg.sender, to, resourceType, amount);
    }

    // Get player information
    function getPlayer(address playerAddress) public view returns (Player memory) {
        return players[playerAddress];
    }
}
