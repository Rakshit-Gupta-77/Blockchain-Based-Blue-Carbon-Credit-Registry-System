# Blockchain Integration Setup Guide

This guide will help you set up the blockchain integration for the Carbon Credits Platform.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MetaMask** browser extension
3. **Hardhat** or **Ganache** for local blockchain development
4. **Git** (optional, for version control)

## Step 1: Install Dependencies

### Frontend Dependencies
```bash
cd "SIH PROJECT"
npm install
```

### Backend Dependencies
```bash
cd backend
npm install
```

## Step 2: Set Up Local Blockchain

### Option A: Using Hardhat (Recommended)

1. Install Hardhat globally:
```bash
npm install -g hardhat
```

2. Create a new Hardhat project:
```bash
mkdir blockchain
cd blockchain
npx hardhat init
```

3. Replace the default contract with our CarbonCredits.sol:
```bash
# Copy the contract from contracts/CarbonCredits.sol to blockchain/contracts/
```

4. Update hardhat.config.js:
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  }
};
```

5. Compile and deploy the contract:
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

### Option B: Using Ganache

1. Download and install Ganache from https://trufflesuite.com/ganache/
2. Create a new workspace
3. Note the RPC URL (usually http://127.0.0.1:7545)
4. Deploy the contract using Remix IDE or Truffle

## Step 3: Configure MetaMask

1. Open MetaMask
2. Click on the network dropdown
3. Select "Add Network" or "Custom RPC"
4. Add the local network:
   - Network Name: Localhost 8545
   - RPC URL: http://127.0.0.1:8545 (or 7545 for Ganache)
   - Chain ID: 31337 (or 1337 for Ganache)
   - Currency Symbol: ETH

5. Import one of the test accounts from Hardhat/Ganache
6. Make sure you have some test ETH in the account

## Step 4: Update Contract Configuration

1. After deploying the contract, copy the contract address
2. Update the contract address in `src/services/web3Service.js`:
```javascript
const CONTRACT_CONFIG = {
  CONTRACT_ADDRESS: "0xYourDeployedContractAddress", // Replace with actual address
  NETWORK: {
    chainId: 31337, // or 1337 for Ganache
    name: "localhost"
  },
  RPC_URL: "http://localhost:8545" // or 7545 for Ganache
};
```

## Step 5: Start the Application

### Start the Backend Server
```bash
cd backend
npm run dev
```

### Start the Frontend
```bash
cd "SIH PROJECT"
npm run dev
```

## Step 6: Test the Integration

1. Open the application in your browser
2. Connect your MetaMask wallet
3. Create a test account or use an existing one
4. Submit a project as a community user
5. Switch to admin account and approve the project
6. Check that tokens are allocated correctly

## Smart Contract Functions

### For Community Users:
- `submitProject()` - Submit a new environmental project
- `getUserProjects()` - Get all projects submitted by the user
- `getUserTokenBalance()` - Get the user's carbon credit token balance

### For Admin Users:
- `approveProject()` - Approve a submitted project
- `rejectProject()` - Reject a submitted project
- `getAllProjects()` - Get all projects in the system
- `getPendingProjects()` - Get all pending projects
- `getProjectStats()` - Get system statistics

## Token Allocation

- **Rate**: 1 token per ton of carbon capture
- **Automatic**: Tokens are automatically allocated when a project is approved
- **Immutable**: Token allocation is recorded on the blockchain and cannot be changed

## Troubleshooting

### Common Issues:

1. **"Contract not initialized" error**
   - Make sure the contract is deployed and the address is correct
   - Check that you're connected to the right network

2. **"Insufficient funds" error**
   - Make sure your MetaMask account has enough ETH for gas fees
   - Check that you're using a test account with test ETH

3. **"User rejected transaction" error**
   - Make sure to approve transactions in MetaMask
   - Check that the gas limit is sufficient

4. **"Network mismatch" error**
   - Make sure MetaMask is connected to the local network
   - Verify the chain ID matches your configuration

### Getting Help:

1. Check the browser console for error messages
2. Check MetaMask for transaction details
3. Verify the contract is deployed correctly
4. Make sure all dependencies are installed

## Production Deployment

For production deployment, you'll need to:

1. Deploy the contract to a mainnet (Ethereum, Polygon, etc.)
2. Update the contract address and network configuration
3. Set up proper authentication and authorization
4. Use a production database instead of localStorage
5. Implement proper error handling and logging
6. Set up monitoring and analytics

## Security Considerations

1. **Private Keys**: Never commit private keys to version control
2. **Contract Verification**: Verify your contract on block explorers
3. **Access Control**: Implement proper admin access controls
4. **Input Validation**: Validate all inputs before processing
5. **Gas Limits**: Set appropriate gas limits for transactions

## Next Steps

1. Add more sophisticated project validation
2. Implement project categories and types
3. Add project milestones and progress tracking
4. Implement token trading/marketplace features
5. Add analytics and reporting features
6. Integrate with external carbon credit markets
