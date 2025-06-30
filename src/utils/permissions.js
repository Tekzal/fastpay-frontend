// Role-based permission utilities for FastPay system

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager', 
  CASHIER: 'cashier'
};

export const ROLE_DISPLAY_NAMES = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.MANAGER]: 'Manager',
  [ROLES.CASHIER]: 'Cashier'
};

// Permission checks for different features
export const PERMISSIONS = {
  // User Management - Admin only
  MANAGE_USERS: [ROLES.ADMIN],
  
  // Department Management - Admin only
  MANAGE_DEPARTMENTS: [ROLES.ADMIN],
  
  // Class Management - Admin only  
  MANAGE_CLASSES: [ROLES.ADMIN],
  
  // Academic Year/Period Management - Admin only
  MANAGE_ACADEMIC_YEARS: [ROLES.ADMIN],
  MANAGE_ACADEMIC_PERIODS: [ROLES.ADMIN],
  
  // Fee Management
  MANAGE_SCHOOL_FEES: [ROLES.ADMIN],
  MANAGE_EXAM_FEES: [ROLES.ADMIN],
  MANAGE_OTHER_BILLS: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER],
  
  // Payment Management
  MANAGE_PAYMENTS: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER],
  DELETE_PAYMENTS: [ROLES.ADMIN],
  
  // Student Management - Admin only
  MANAGE_STUDENTS: [ROLES.ADMIN],
  
  // Reports - Admin and Manager only
  VIEW_REPORTS: [ROLES.ADMIN, ROLES.MANAGER],
  
  // Student Interface - All authenticated users
  ACCESS_STUDENT_INTERFACE: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER]
};

/**
 * Check if a user has permission for a specific action
 * @param {string} userRole - The user's role
 * @param {string} permission - The permission to check
 * @returns {boolean} - Whether the user has permission
 */
export const hasPermission = (userRole, permission) => {
  const allowedRoles = PERMISSIONS[permission];
  return allowedRoles ? allowedRoles.includes(userRole) : false;
};

/**
 * Check if a user has any of the specified permissions
 * @param {string} userRole - The user's role
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} - Whether the user has any of the permissions
 */
export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

/**
 * Check if a user has all of the specified permissions
 * @param {string} userRole - The user's role
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} - Whether the user has all of the permissions
 */
export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

/**
 * Get the display name for a role
 * @param {string} role - The role
 * @returns {string} - The display name
 */
export const getRoleDisplayName = (role) => {
  return ROLE_DISPLAY_NAMES[role] || role;
};

/**
 * Get all roles that have a specific permission
 * @param {string} permission - The permission to check
 * @returns {string[]} - Array of roles that have the permission
 */
export const getRolesWithPermission = (permission) => {
  return PERMISSIONS[permission] || [];
};

/**
 * Check if a user can access a specific route
 * @param {string} userRole - The user's role
 * @param {string} route - The route to check
 * @returns {boolean} - Whether the user can access the route
 */
export const canAccessRoute = (userRole, route) => {
  const routePermissions = {
    '/admin': [ROLES.ADMIN],
    '/student': [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER],
    '/reports': [ROLES.ADMIN, ROLES.MANAGER]
  };
  
  const allowedRoles = routePermissions[route];
  return allowedRoles ? allowedRoles.includes(userRole) : false;
}; 