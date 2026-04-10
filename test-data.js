// Test data script - run this in browser console to add sample projects
// Copy and paste this into your browser's developer console

const sampleProjects = [
  {
    id: "1",
    name: "Urban Tree Plantation Initiative",
    type: "Tree Plantation",
    location: "Mumbai, Maharashtra",
    carbonCapture: 150.5,
    description: "Large-scale tree plantation project in urban areas to increase green cover and capture carbon emissions from the city.",
    ngoName: "Green Earth Foundation",
    ngoEmail: "ngo1@example.com",
    status: "Pending Approval",
    submittedAt: "2024-01-15T10:30:00.000Z",
    files: [
      { name: "project_proposal.pdf", size: 2048000 },
      { name: "site_photos.jpg", size: 1536000 }
    ]
  },
  {
    id: "2",
    name: "Solar Farm Development",
    type: "Renewable Energy",
    location: "Rajasthan Desert",
    carbonCapture: 500.0,
    description: "Development of a 100MW solar farm to replace coal-based power generation and reduce carbon footprint.",
    ngoName: "Renewable Energy Corp",
    ngoEmail: "ngo2@example.com",
    status: "Approved",
    submittedAt: "2024-01-10T14:20:00.000Z",
    files: [
      { name: "technical_specs.pdf", size: 3072000 },
      { name: "environmental_assessment.pdf", size: 2560000 }
    ]
  },
  {
    id: "3",
    name: "Mangrove Restoration Project",
    type: "Mangrove Restoration",
    location: "Sundarbans, West Bengal",
    carbonCapture: 75.2,
    description: "Restoration of mangrove forests to protect coastal areas and enhance carbon sequestration.",
    ngoName: "Coastal Conservation Trust",
    ngoEmail: "ngo3@example.com",
    status: "Pending Approval",
    submittedAt: "2024-01-20T09:15:00.000Z",
    files: [
      { name: "restoration_plan.pdf", size: 1792000 },
      { name: "before_after_photos.zip", size: 5120000 }
    ]
  }
];

// Add to localStorage
localStorage.setItem('projects', JSON.stringify(sampleProjects));
console.log('Sample projects added successfully!');
console.log('You can now test the admin dashboard with these projects.');
