module.exports = {
    grantList: [
      // Admin grant list
      { role: 'admin', resource: 'users', action: 'create:any', attributes: '*' },
      { role: 'admin', resource: 'users', action: 'read:any', attributes: '*' },
      { role: 'admin', resource: 'users', action: 'update:any', attributes: '*,' },
      { role: 'admin', resource: 'users', action: 'delete:any', attributes: '*' },
  
      { role: 'admin', resource: 'projects', action: 'create:any', attributes: '*' },
      { role: 'admin', resource: 'projects', action: 'read:any', attributes: '*' },
      { role: 'admin', resource: 'projects', action: 'update:any', attributes: '*,' },
      { role: 'admin', resource: 'project_approve', action: 'update:any', attributes: '*,' },
      { role: 'admin', resource: 'project_reject', action: 'update:any', attributes: '*,' },
      { role: 'admin', resource: 'projects', action: 'delete:any', attributes: '*' },
      { role: 'admin', resource: 'members', action: 'update:any', attributes: '*' },
  
  
      { role: 'admin', resource: 'clubs', action: 'create:any', attributes: '*' },
      { role: 'admin', resource: 'clubs', action: 'read:any', attributes: '*' },
      { role: 'admin', resource: 'clubs', action: 'update:any', attributes: '*,' },
      { role: 'admin', resource: 'clubs', action: 'delete:any', attributes: '*' },
      { role: 'admin', resource: 'club_approve', action: 'update:any', attributes: '*,' },
      { role: 'admin', resource: 'club_reject', action: 'update:any', attributes: '*,' },
      { role: 'admin', resource: 'projectOwners', action: 'update:any', attributes: '*' },
  
       // Investor grant list
       { role: 'investor', resource: 'users', action: 'read:any', attributes: '*' },
       { role: 'investor', resource: 'projects', action: 'read:any', attributes: '*' },
       { role: 'investor', resource: 'clubs', action: 'read:any', attributes: '*' },
  
       // Student grant list
       { role: 'student', resource: 'users', action: 'create:any', attributes: '*' },
       { role: 'student', resource: 'users', action: 'read:any', attributes: '*' },
       { role: 'student', resource: 'users', action: 'update:any', attributes: '*,' },
   
       { role: 'student', resource: 'projects', action: 'create:any', attributes: '*' },
       { role: 'student', resource: 'projects', action: 'read:any', attributes: '*' },
       { role: 'student', resource: 'projects', action: 'update:any', attributes: '*,' },
   
       { role: 'student', resource: 'clubs', action: 'create:any', attributes: '*' },
       { role: 'student', resource: 'clubs', action: 'read:any', attributes: '*' },
       { role: 'student', resource: 'clubs', action: 'update:any', attributes: '*,' },
  
       { role: 'student', resource: 'projectOwners', action: 'update:any', attributes: '*' },
       // Visitor grant list 
       { role: 'visitor', resource: 'projects', action: 'read:any', attributes: '*' },
       { role: 'visitor', resource: 'clubs', action: 'read:any', attributes: '*' },
       { role: 'visitor', resource: 'clubs', action: 'create:any', attributes: '*' },
       { role: 'visitor', resource: 'users', action: 'read:any', attributes: '*' },
  
  
    ]
  }