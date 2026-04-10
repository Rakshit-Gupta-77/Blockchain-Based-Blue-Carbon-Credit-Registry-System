const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow PDF, DOC, DOCX, and image files
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, and image files are allowed'));
    }
  }
});

// In-memory storage (replace with database in production)
let users = [];
let projects = [];
let ngoRequests = [];

// Authentication endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  
  // Simple authentication (replace with proper auth in production)
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  
  if (user) {
    const token = 'mock-jwt-token-' + Date.now();
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const userData = req.body;
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  const token = 'mock-jwt-token-' + Date.now();
  res.json({
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    },
    token
  });
});

// Project endpoints
app.post('/api/projects', (req, res) => {
  const projectData = req.body;
  
  const newProject = {
    id: Date.now().toString(),
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  projects.push(newProject);
  
  res.json({
    success: true,
    project: newProject
  });
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/user', (req, res) => {
  // In a real app, you'd get the user from the JWT token
  const userEmail = req.headers.authorization ? 'user@example.com' : null;
  
  if (userEmail) {
    const userProjects = projects.filter(p => p.ngoEmail === userEmail || p.userEmail === userEmail);
    res.json(userProjects);
  } else {
    res.json([]);
  }
});

app.get('/api/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(p => p.id === projectId);
  
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }
});

app.put('/api/projects/:id/approve', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(p => p.id === projectId);
  
  if (project) {
    project.status = 'Approved';
    project.approvedAt = new Date().toISOString();
    project.approvedBy = 'admin';
    project.transactionHash = req.body.transactionHash;
    project.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      project
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }
});

app.put('/api/projects/:id/reject', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(p => p.id === projectId);
  
  if (project) {
    project.status = 'Rejected';
    project.rejectedAt = new Date().toISOString();
    project.rejectedBy = 'admin';
    project.transactionHash = req.body.transactionHash;
    project.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      project
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }
});

// File upload endpoint
app.post('/api/files/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }
  
  res.json({
    success: true,
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    }
  });
});

// NGO endpoints
app.post('/api/ngo/register', (req, res) => {
  const ngoData = req.body;
  
  // Check if NGO already exists
  const existingNgo = ngoRequests.find(n => n.email === ngoData.email);
  if (existingNgo) {
    return res.status(400).json({
      success: false,
      message: 'NGO registration already exists'
    });
  }
  
  const newNgoRequest = {
    id: Date.now().toString(),
    ...ngoData,
    status: 'pending',
    submittedAt: new Date().toISOString()
  };
  
  ngoRequests.push(newNgoRequest);
  
  res.json({
    success: true,
    ngoRequest: newNgoRequest
  });
});

app.get('/api/ngo/requests', (req, res) => {
  res.json(ngoRequests);
});

app.put('/api/ngo/requests/:id/approve', (req, res) => {
  const requestId = req.params.id;
  const ngoRequest = ngoRequests.find(n => n.id === requestId);
  
  if (ngoRequest) {
    ngoRequest.status = 'approved';
    ngoRequest.approvedAt = new Date().toISOString();
    ngoRequest.approvedBy = 'admin';
    
    // Create user account for approved NGO
    const newUser = {
      id: ngoRequest.id,
      name: ngoRequest.name,
      email: ngoRequest.email,
      password: ngoRequest.password,
      role: 'ngo',
      organisationName: ngoRequest.organisationName,
      officialEmail: ngoRequest.officialEmail,
      registrationNumber: ngoRequest.registrationNumber,
      panTaxId: ngoRequest.panTaxId,
      registrationCertificate: ngoRequest.registrationCertificate,
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'admin'
    };
    
    users.push(newUser);
    
    res.json({
      success: true,
      ngoRequest,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'NGO request not found'
    });
  }
});

app.put('/api/ngo/requests/:id/reject', (req, res) => {
  const requestId = req.params.id;
  const ngoRequest = ngoRequests.find(n => n.id === requestId);
  
  if (ngoRequest) {
    ngoRequest.status = 'rejected';
    ngoRequest.rejectedAt = new Date().toISOString();
    ngoRequest.rejectedBy = 'admin';
    
    res.json({
      success: true,
      ngoRequest
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'NGO request not found'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
