// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResourceSharingGame {
    struct Player {
        uint256 wool;
        uint256 sheep;
        uint256 wolves;
        uint256 grass;
        uint256 farmer;
        uint256 land;
        bool isLoggedIn;
    }

    mapping(address => Player) public players;
    address[] public playerAddresses;

    event ResourceShared(address indexed from, address indexed to, string resourceType, uint256 amount);

    function registerPlayer() public {
        require(players[msg.sender].wool == 0, "Player already registered");
        players[msg.sender] = Player(100, 10, 5, 50, 1, 20, false);
        playerAddresses.push(msg.sender);
    }

    function login() public {
        require(players[msg.sender].wool > 0, "Player not registered");
        players[msg.sender].isLoggedIn = true;
    }

    function logout() public {
        players[msg.sender].isLoggedIn = false;
    }

    function shareResources(address to, string memory resourceType, uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        require(to != address(0), "Invalid recipient address");
        require(keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("wool")) ||
                keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("sheep")) ||
                keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("wolves")) ||
                keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("grass")) ||
                keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("farmer")) ||
                keccak256(abi.encodePacked(resourceType)) == keccak256(abi.encodePacked("land")),
                "Invalid resource type");

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
        }

        emit ResourceShared(msg.sender, to, resourceType, amount);
    }
}
