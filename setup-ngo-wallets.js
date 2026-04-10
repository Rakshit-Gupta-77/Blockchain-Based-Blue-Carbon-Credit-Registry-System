// Setup script to add approved NGO wallets
// Run this to pre-approve specific wallets for NGO registration

const walletManager = require('./src/services/walletManager.js')

// Pre-approved NGO wallets (Hardhat accounts)
const approvedNgoWallets = [
  {
    address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // Hardhat account #0 (deployer/admin)
    ngoName: 'Green Earth Foundation (Admin)'
  },
  {
    address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', // Hardhat account #1 (NGO)
    ngoName: 'Climate Action Network'
  },
  {
    address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // Hardhat account #2 (NGO)
    ngoName: 'Environmental Protection Society'
  }
]

// Company wallets (can submit projects)
const companyWallets = [
  {
    address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', // Hardhat account #1
    companyName: 'EcoTech Solutions'
  },
  {
    address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // Hardhat account #2
    companyName: 'Green Future Corp'
  },
  {
    address: '0x90F79bf6EB2c4f870365E785982E1f101E9b2c2', // Hardhat account #3
    companyName: 'Sustainable Ventures'
  }
]

console.log('Setting up approved NGO wallets...')

try {
  // Clear existing wallets
  localStorage.setItem('approved_ngo_wallets', '[]')
  localStorage.setItem('registered_companies', '[]')
  
  // Add approved NGO wallets
  console.log('Setting up NGO wallets...')
  approvedNgoWallets.forEach(wallet => {
    try {
      walletManager.addApprovedNgoWallet(wallet.address, wallet.ngoName)
      console.log(`✅ Added NGO wallet: ${wallet.address} (${wallet.ngoName})`)
    } catch (error) {
      console.log(`❌ Failed to add NGO wallet ${wallet.address}: ${error.message}`)
    }
  })
  
  // Add company wallets
  console.log('\nSetting up company wallets...')
  companyWallets.forEach(wallet => {
    try {
      walletManager.registerCompanyWallet(wallet.address, wallet.companyName)
      console.log(`✅ Added company wallet: ${wallet.address} (${wallet.companyName})`)
    } catch (error) {
      console.log(`❌ Failed to add company wallet ${wallet.address}: ${error.message}`)
    }
  })
  
  console.log('\n🎉 Wallet setup completed!')
  console.log('\nApproved NGO wallets:')
  const ngoWallets = walletManager.getApprovedNgoWallets()
  ngoWallets.forEach(wallet => {
    console.log(`- ${wallet.address} (${wallet.ngoName})`)
  })
  
  console.log('\nRegistered company wallets:')
  const companyWalletsList = walletManager.getRegisteredCompanies()
  companyWalletsList.forEach(wallet => {
    console.log(`- ${wallet.address} (${wallet.companyName})`)
  })
  
} catch (error) {
  console.error('❌ Setup failed:', error.message)
}

// Export for use in browser
if (typeof window !== 'undefined') {
  window.setupNgoWallets = () => {
    approvedNgoWallets.forEach(wallet => {
      try {
        walletManager.addApprovedNgoWallet(wallet.address, wallet.ngoName)
        console.log(`✅ Added NGO wallet: ${wallet.address} (${wallet.ngoName})`)
      } catch (error) {
        console.log(`❌ Failed to add wallet ${wallet.address}: ${error.message}`)
      }
    })
  }
}
