// Create admin account script
// Run this in browser console to create an admin account

const adminUser = {
  id: Date.now().toString(),
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
  role: "admin",
  createdAt: new Date().toISOString()
};

// Get existing users
const users = JSON.parse(localStorage.getItem('users') || '[]');

// Check if admin already exists
const existingAdmin = users.find(u => u.role === 'admin');
if (existingAdmin) {
  console.log('Admin account already exists:', existingAdmin);
} else {
  // Add admin user
  users.push(adminUser);
  localStorage.setItem('users', JSON.stringify(users));
  console.log('Admin account created successfully!');
  console.log('Email: admin@example.com');
  console.log('Password: admin123');
  console.log('Role: admin');
}

console.log('All users:', users);
