// Create Admin and Company User Accounts
// Run this in browser console to create users with login credentials

// Clear existing users
localStorage.removeItem('users');

// Admin User Account
const adminUser = {
  id: "admin-001",
  name: "Admin User",
  email: "admin@carboncredits.com",
  password: "Admin123!",
  role: "admin",
  walletAddress: "0x3179903B01C562FC48D0b8423FA424FcF4DaF997",
  createdAt: new Date().toISOString()
};

// Company/Community User Account
const companyUser = {
  id: "company-001",
  name: "Company User",
  email: "company@carboncredits.com",
  password: "Company123!",
  role: "user_ngo",
  walletAddress: "0x2812AB84F58FA32e9DB3D380EAF04161867E4e05",
  createdAt: new Date().toISOString()
};

// Create users array
const users = [adminUser, companyUser];

// Save to localStorage
localStorage.setItem('users', JSON.stringify(users));

console.log('✅ User accounts created successfully!');
console.log('');
console.log('👑 ADMIN ACCOUNT:');
console.log('   Email: admin@carboncredits.com');
console.log('   Password: Admin123!');
console.log('   Wallet: 0x3179903B01C562FC48D0b8423FA424FcF4DaF997');
console.log('   Role: Admin (can approve/reject projects)');
console.log('');
console.log('🏢 COMPANY ACCOUNT:');
console.log('   Email: company@carboncredits.com');
console.log('   Password: Company123!');
console.log('   Wallet: 0x2812AB84F58FA32e9DB3D380EAF04161867E4e05');
console.log('   Role: Company (can submit projects)');
console.log('');
console.log('📋 All users:', users);
