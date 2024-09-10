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
- [Interacting with the Smart Contract](#interacting-with-the-smart-contract)
- [License](#license)

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
