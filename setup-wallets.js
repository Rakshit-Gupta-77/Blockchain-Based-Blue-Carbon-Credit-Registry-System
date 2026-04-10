// Setup script for specific wallet addresses
// Run this in browser console to create users with specific wallet addresses

// Admin user with specific wallet address
const adminUser = {
  id: "admin-001",
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
  role: "admin",
  walletAddress: "0x3179903B01C562FC48D0b8423FA424FcF4DaF997",
  createdAt: new Date().toISOString()
};

// Community user with specific wallet address
const communityUser = {
  id: "community-001",
  name: "Community User",
  email: "community@example.com",
  password: "community123",
  role: "user_ngo",
  walletAddress: "0x2812AB84F58FA32e9DB3D380EAF04161867E4e05",
  createdAt: new Date().toISOString()
};

// Get existing users
const users = JSON.parse(localStorage.getItem('users') || '[]');

// Remove existing admin and community users if they exist
const filteredUsers = users.filter(u => 
  u.role !== 'admin' && 
  u.role !== 'user_ngo' && 
  u.email !== 'admin@example.com' && 
  u.email !== 'community@example.com'
);

// Add new users with specific wallet addresses
filteredUsers.push(adminUser);
filteredUsers.push(communityUser);

// Save to localStorage
localStorage.setItem('users', JSON.stringify(filteredUsers));

console.log('✅ Users created with specific wallet addresses:');
console.log('👑 Admin:', adminUser);
console.log('🏘️ Community:', communityUser);
console.log('📋 All users:', filteredUsers);
