# Carbon Credits Platform - Blockchain Integration

A comprehensive blockchain-integrated platform for carbon credit management with smart contract-based project approval and token allocation.

## 🌟 Features

### Blockchain Integration
- **Smart Contract Management**: Deploy and interact with carbon credit smart contracts
- **Token Allocation**: Automatic 1:1 token allocation (1 token per ton of carbon capture)
- **Project Approval**: Decentralized project approval system
- **Wallet Integration**: MetaMask integration for secure transactions
- **Real-time Updates**: Live blockchain data synchronization

### User Roles
- **Community/Panchayat**: Submit environmental projects, view token balance
- **NGO**: Submit projects after verification, track carbon credits
- **Admin**: Approve/reject projects, manage the platform

### Smart Contract Features
- Project submission and management
- Admin-only approval/rejection system
- Automatic token allocation
- User token balance tracking
- Project statistics and analytics

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MetaMask browser extension
- Git

### Installation

1. **Clone and Install Dependencies**
```bash
cd "SIH PROJECT"
npm install
cd backend
npm install
```

2. **Set Up Blockchain**
```bash
# Install Hardhat globally
npm install -g hardhat

# Compile contracts
npm run blockchain:compile

# Start local blockchain
npm run blockchain:node
```

3. **Deploy Smart Contract**
```bash
# In a new terminal
npm run blockchain:deploy
```

4. **Configure MetaMask**
- Add network: http://localhost:8545, Chain ID: 31337
- Import test account from Hardhat
- Update contract address in `src/services/web3Service.js`

5. **Start Application**
```bash
# Backend (Terminal 1)
npm run backend

# Frontend (Terminal 2)
npm run dev
```

## 📁 Project Structure

```
SIH PROJECT/
├── contracts/
│   └── CarbonCredits.sol          # Smart contract
├── scripts/
│   └── deploy.js                  # Deployment script
├── src/
│   ├── components/
│   │   ├── Web3Connection.jsx     # Wallet connection
│   │   ├── TokenDisplay.jsx       # Token balance display
│   │   └── Dashboard.jsx          # Updated with blockchain
│   ├── contexts/
│   │   └── Web3Context.jsx        # Web3 state management
│   ├── services/
│   │   ├── web3Service.js         # Blockchain interactions
│   │   └── apiService.js          # API service
│   └── App.jsx                    # Main app with Web3 provider
├── backend/
│   ├── server.js                  # Express API server
│   └── package.json               # Backend dependencies
├── hardhat.config.js              # Hardhat configuration
└── BLOCKCHAIN_SETUP.md            # Detailed setup guide
```

## 🔧 Smart Contract

### Contract: CarbonCredits.sol

**Key Functions:**
- `submitProject()` - Submit new environmental project
- `approveProject()` - Admin approval (allocates tokens)
- `rejectProject()` - Admin rejection
- `getUserTokenBalance()` - Get user's token balance
- `getAllProjects()` - Get all projects
- `getProjectStats()` - System statistics

**Token Allocation:**
- Rate: 1 token per ton of carbon capture
- Automatic allocation on project approval
- Immutable blockchain record

## 💻 Usage

### For Community Users
1. Connect MetaMask wallet
2. Submit environmental project
3. Wait for admin approval
4. View allocated tokens in dashboard

### For Admin Users
1. Connect admin wallet
2. Review pending projects
3. Approve/reject projects
4. Monitor system statistics

### Project Submission Flow
1. User fills project form
2. Transaction submitted to blockchain
3. Project stored with pending status
4. Admin reviews and approves/rejects
5. Tokens automatically allocated on approval

## 🔐 Security Features

- **Access Control**: Admin-only approval functions
- **Input Validation**: Smart contract validates all inputs
- **Immutable Records**: All transactions recorded on blockchain
- **Wallet Security**: MetaMask handles private key management

## 🌐 Network Configuration

### Local Development
- Network: Localhost
- RPC URL: http://localhost:8545
- Chain ID: 31337
- Currency: ETH

### Production (Example)
- Network: Ethereum Mainnet
- RPC URL: Your Infura/Alchemy URL
- Chain ID: 1
- Currency: ETH

## 📊 Token Economics

- **Allocation Rate**: 1 token per ton of carbon capture
- **Total Supply**: Unlimited (based on approved projects)
- **Distribution**: Automatic on project approval
- **Utility**: Track environmental impact, potential trading

## 🛠️ Development

### Adding New Features
1. Update smart contract
2. Recompile and redeploy
3. Update frontend integration
4. Test thoroughly

### Testing
```bash
# Run blockchain tests
npm run blockchain:test

# Test frontend
npm run dev
```

## 🚀 Deployment

### Smart Contract Deployment
1. Update network configuration
2. Deploy to target network
3. Verify contract on block explorer
4. Update contract address

### Frontend Deployment
1. Update contract address
2. Build for production
3. Deploy to hosting service
4. Configure environment variables

## 📈 Monitoring

### Blockchain Metrics
- Total projects submitted
- Projects approved/rejected
- Total tokens allocated
- User token balances

### System Health
- Contract deployment status
- Network connectivity
- Transaction success rates
- Gas usage optimization

## 🔧 Troubleshooting

### Common Issues
1. **Contract not found**: Check contract address
2. **Network mismatch**: Verify MetaMask network
3. **Insufficient funds**: Add test ETH to account
4. **Transaction failed**: Check gas limits

### Debug Steps
1. Check browser console
2. Verify MetaMask connection
3. Confirm contract deployment
4. Test with small transactions

## 📚 Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.io/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [Solidity Documentation](https://docs.soliditylang.org/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review the setup guide
- Open an issue on GitHub
- Contact the development team

---

**Note**: This is a development version. For production use, implement additional security measures, proper testing, and consider gas optimization.
