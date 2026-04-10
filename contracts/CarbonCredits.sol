// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CarbonCredits {
    address public admin;
    uint256 public totalProjects;
    uint256 public totalTokensAllocated;
    
    // Token allocation rate: 1 token per ton of carbon capture
    uint256 public constant TOKENS_PER_TON = 1;
    
    struct Project {
        uint256 id;
        string name;
        string projectType;
        string location;
        uint256 carbonCapture; // in tonnes
        string description;
        address submitter;
        ProjectStatus status;
        uint256 tokensAllocated;
        uint256 submittedAt;
        uint256 approvedAt;
    }
    
    enum ProjectStatus {
        Pending,
        Approved,
        Rejected
    }
    
    mapping(uint256 => Project) public projects;
    mapping(address => uint256) public userTokenBalance;
    mapping(address => uint256[]) public userProjects;
    
    event ProjectSubmitted(uint256 indexed projectId, address indexed submitter, string name);
    event ProjectApproved(uint256 indexed projectId, address indexed submitter, uint256 tokensAllocated);
    event ProjectRejected(uint256 indexed projectId, address indexed submitter);
    event TokensAllocated(address indexed user, uint256 amount, uint256 projectId);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier validProject(uint256 _projectId) {
        require(_projectId > 0 && _projectId <= totalProjects, "Invalid project ID");
        _;
    }
    
    constructor() {
        // Set the deployer as admin
        admin = msg.sender;
    }
    
    function submitProject(
        string memory _name,
        string memory _projectType,
        string memory _location,
        uint256 _carbonCapture,
        string memory _description
    ) external returns (uint256) {
        require(_carbonCapture > 0, "Carbon capture must be greater than 0");
        require(bytes(_name).length > 0, "Project name cannot be empty");
        
        totalProjects++;
        
        projects[totalProjects] = Project({
            id: totalProjects,
            name: _name,
            projectType: _projectType,
            location: _location,
            carbonCapture: _carbonCapture,
            description: _description,
            submitter: msg.sender,
            status: ProjectStatus.Pending,
            tokensAllocated: 0,
            submittedAt: block.timestamp,
            approvedAt: 0
        });
        
        userProjects[msg.sender].push(totalProjects);
        
        emit ProjectSubmitted(totalProjects, msg.sender, _name);
        
        return totalProjects;
    }
    
    function approveProject(uint256 _projectId) external onlyAdmin validProject(_projectId) {
        Project storage project = projects[_projectId];
        require(project.status == ProjectStatus.Pending, "Project is not pending");
        
        project.status = ProjectStatus.Approved;
        project.approvedAt = block.timestamp;
        
        // Calculate tokens to allocate (1 token per ton)
        uint256 tokensToAllocate = project.carbonCapture * TOKENS_PER_TON;
        project.tokensAllocated = tokensToAllocate;
        
        // Allocate tokens to the user
        userTokenBalance[project.submitter] += tokensToAllocate;
        totalTokensAllocated += tokensToAllocate;
        
        emit ProjectApproved(_projectId, project.submitter, tokensToAllocate);
        emit TokensAllocated(project.submitter, tokensToAllocate, _projectId);
    }
    
    function rejectProject(uint256 _projectId) external onlyAdmin validProject(_projectId) {
        Project storage project = projects[_projectId];
        require(project.status == ProjectStatus.Pending, "Project is not pending");
        
        project.status = ProjectStatus.Rejected;
        
        emit ProjectRejected(_projectId, project.submitter);
    }
    
    function getUserProjects(address _user) external view returns (uint256[] memory) {
        return userProjects[_user];
    }
    
    function getUserTokenBalance(address _user) external view returns (uint256) {
        return userTokenBalance[_user];
    }
    
    function getProject(uint256 _projectId) external view validProject(_projectId) returns (
        uint256 id,
        string memory name,
        string memory projectType,
        string memory location,
        uint256 carbonCapture,
        string memory description,
        address submitter,
        ProjectStatus status,
        uint256 tokensAllocated,
        uint256 submittedAt,
        uint256 approvedAt
    ) {
        Project memory project = projects[_projectId];
        return (
            project.id,
            project.name,
            project.projectType,
            project.location,
            project.carbonCapture,
            project.description,
            project.submitter,
            project.status,
            project.tokensAllocated,
            project.submittedAt,
            project.approvedAt
        );
    }
    
    function getAllProjects() external view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](totalProjects);
        for (uint256 i = 1; i <= totalProjects; i++) {
            allProjects[i - 1] = projects[i];
        }
        return allProjects;
    }
    
    function getPendingProjects() external view returns (Project[] memory) {
        uint256 pendingCount = 0;
        
        // Count pending projects
        for (uint256 i = 1; i <= totalProjects; i++) {
            if (projects[i].status == ProjectStatus.Pending) {
                pendingCount++;
            }
        }
        
        // Create array with exact size
        Project[] memory pendingProjects = new Project[](pendingCount);
        uint256 index = 0;
        
        // Fill the array
        for (uint256 i = 1; i <= totalProjects; i++) {
            if (projects[i].status == ProjectStatus.Pending) {
                pendingProjects[index] = projects[i];
                index++;
            }
        }
        
        return pendingProjects;
    }
    
    function getProjectStats() external view returns (
        uint256 total,
        uint256 pending,
        uint256 approved,
        uint256 rejected,
        uint256 totalTokens
    ) {
        uint256 pendingCount = 0;
        uint256 approvedCount = 0;
        uint256 rejectedCount = 0;
        
        for (uint256 i = 1; i <= totalProjects; i++) {
            if (projects[i].status == ProjectStatus.Pending) {
                pendingCount++;
            } else if (projects[i].status == ProjectStatus.Approved) {
                approvedCount++;
            } else if (projects[i].status == ProjectStatus.Rejected) {
                rejectedCount++;
            }
        }
        
        return (totalProjects, pendingCount, approvedCount, rejectedCount, totalTokensAllocated);
    }
}
