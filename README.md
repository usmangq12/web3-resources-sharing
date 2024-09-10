# Resource Sharing Game DApp

A decentralized application (DApp) where users can share resources (wool, sheep, wolves, grass, farmers, land) with each other on the Ethereum blockchain. The game is powered by smart contracts written in Solidity and deployed using Hardhat. The frontend interacts with these smart contracts via the `ethers.js` library, allowing players to log in, register, and share resources in a secure and decentralized manner.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Smart Contract Overview](#smart-contract-overview)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Deploying Contracts](#deploying-contracts)
- [Running the Application](#running-the-application)

## Features

- **User Registration**: Users can register with default resources.
- **Login/Logout**: Registered users can log in and log out.
- **Share Resources**: Players can share specific resources like wool, sheep, wolves, and more.
- **Resource Management**: Players can view and add resources through the DApp.
- **Smart Contract-Powered**: All interactions are powered by a Solidity smart contract.
- **Blockchain Transactions**: All transactions are recorded securely on the Ethereum blockchain.

## Technologies Used

### Frontend:
- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React component library for UI design.
- **ethers.js**: JavaScript library for interacting with the Ethereum blockchain.
- **MetaMask**: Browser extension for Ethereum account management.

### Backend:
- **Solidity**: Language used for writing Ethereum smart contracts.
- **Hardhat**: Development environment for Ethereum for deploying and testing smart contracts.
- **Ethereum**: The decentralized platform the DApp is built on.

## Smart Contract Overview

The `ResourceSharingGame` contract defines the core functionality of the game, including:
- **Player Registration**: Players are registered with a default set of resources like wool, sheep, etc.
- **Resource Sharing**: Players can share resources with other registered players.
- **Resource Management**: Players can add resources to their account.
- **Events**: Smart contract emits events such as `PlayerRegistered`, `ResourceShared`, and more for tracking actions.


## Setup and Commands

1. Install Dependencies
Before starting, install the project dependencies:

  ```
  npm install
  ```

2. Compile Contracts
Compile the smart contracts with:

  ```
  npx hardhat compile
  ```


3. Deploy Contracts
To deploy the smart contracts, you can use the Hardhat scripts. For example, to deploy on the local network:

 ```
 npx hardhat run scripts/deploy.js --network localhost
 ```


4. Run Tests
Write and execute tests to verify the contract functionality:

 ```
 npx hardhat test
 ```


5. Local Ethereum Network
For local development and testing, run a local Ethereum network

  ```
  npx hardhat node
  ```

Then deploy the contracts to this network:

  ```
  npx hardhat run scripts/deploy.js --network localhost
  ```


6. Interact with Contracts
You can interact with deployed contracts in the Hardhat console:

  ```
  npx hardhat console --network localhost
  ```


9. Clean Build Artifacts
If you want to remove the build files generated by Hardhat:

  ```
  npx hardhat clean
  ```
10. Introduction Loom Video Link
    https://www.loom.com/share/f0106ad9b9154b27b1b3695ff648e529?sid=5b9ab8ba-5066-443e-bf3f-f2507d55b871
