# Role-Based Access Control (RBAC) System

## Overview

The FastPay frontend implements a comprehensive role-based access control system that aligns with the backend API permissions. The system supports three user roles: **admin**, **manager**, and **cashier**.

## User Roles

### 1. Administrator (admin)
- **Full system access** - Can perform all operations
- **User management** - Create, read, update, delete users
- **System configuration** - Manage departments, classes, academic years/periods
- **Fee management** - Manage all types of fees (school fees, exam fees, other bills)
- **Payment management** - Full payment operations including deletion
- **Reports access** - View all reports
- **Student management** - Full student CRUD operations

### 2. Manager (manager)
- **Limited administrative access** - Cannot manage users or system configuration
- **Fee management** - Can only manage other bills (not school fees or exam fees)
- **Payment management** - Can create, read, update payments (cannot delete)
- **Reports access** - Can view reports
- **Student interface access** - Can access student payment interface

### 3. Cashier (cashier)
- **Payment operations** - Can create, read, update payments (cannot delete)
- **Other bills management** - Can manage other bills
- **Student interface access** - Can access student payment interface
- **No reports access** - Cannot view reports
- **No administrative functions** - Cannot manage users, departments, classes, etc.

## Frontend Routes and Access

| Route | Admin | Manager | Cashier | Description |
|-------|-------|---------|---------|-------------|
| `/admin` | ✅ | ❌ | ❌ | Admin dashboard with full system management |
| `/student` | ✅ | ✅ | ✅ | Student payment interface |
| `/reports` | ✅ | ✅ | ❌ | Reports and analytics |
| `/login` | ✅ | ✅ | ✅ | Authentication page |

## API Endpoint Access by Role

### User/Auth Endpoints
- `POST /auth/login` - All roles (authentication)
- `GET /auth/users/me` - All authenticated users
- `POST /auth/users/` - Admin only
- `GET /auth/users/` - Admin only
- `GET /auth/users/{user_id}` - Admin only
- `PUT /auth/users/{user_id}` - Admin only
- `DELETE /auth/users/{user_id}` - Admin only

### Department Endpoints
- `POST /departments/` - Admin only
- `GET /departments/` - Admin, Manager, Cashier
- `GET /departments/{department_id}` - Admin, Manager, Cashier
- `PUT /departments/{department_id}` - Admin only
- `DELETE /departments/{department_id}` - Admin only

### Class Endpoints
- `POST /classes/` - Admin only
- `GET /classes/` - Admin, Manager, Cashier
- `GET /classes/{class_id}` - Admin, Manager, Cashier
- `PUT /classes/{class_id}` - Admin only
- `DELETE /classes/{class_id}` - Admin only

### Student Endpoints
- `POST /students/` - Admin only
- `GET /students/` - Admin only
- `GET /students/{student_id}` - Admin only
- `PUT /students/{student_id}` - Admin only
- `DELETE /students/{student_id}` - Admin only

### Academic Year/Period Endpoints
- `POST /academic/years/` - Admin only
- `GET /academic/years/` - Admin, Manager, Cashier
- `GET /academic/years/{year_id}` - Admin, Manager, Cashier
- `PUT /academic/years/{year_id}` - Admin only
- `DELETE /academic/years/{year_id}` - Admin only
- `POST /academic/periods/` - Admin only
- `GET /academic/periods/` - Admin, Manager, Cashier
- `GET /academic/periods/{period_id}` - Admin, Manager, Cashier
- `PUT /academic/periods/{period_id}` - Admin only
- `DELETE /academic/periods/{period_id}` - Admin only

### Fees Endpoints

#### School Fees
- `POST /fees/schoolfees/` - Admin only
- `GET /fees/schoolfees/` - Admin, Manager, Cashier
- `GET /fees/schoolfees/{fee_id}` - Admin, Manager, Cashier
- `PUT /fees/schoolfees/{fee_id}` - Admin only
- `DELETE /fees/schoolfees/{fee_id}` - Admin only

#### Exam Fees
- `POST /fees/examfees/` - Admin only
- `GET /fees/examfees/` - Admin, Manager, Cashier
- `GET /fees/examfees/{fee_id}` - Admin, Manager, Cashier
- `PUT /fees/examfees/{fee_id}` - Admin only
- `DELETE /fees/examfees/{fee_id}` - Admin only

#### Other Bills
- `POST /fees/otherbills/` - Admin, Manager, Cashier
- `GET /fees/otherbills/` - Admin, Manager, Cashier
- `GET /fees/otherbills/{bill_id}` - Admin, Manager, Cashier
- `PUT /fees/otherbills/{bill_id}` - Admin, Manager, Cashier
- `DELETE /fees/otherbills/{bill_id}` - Admin, Manager, Cashier

### Payment Endpoints
- `POST /payments/` - Admin, Manager, Cashier
- `GET /payments/` - Admin, Manager, Cashier
- `GET /payments/{payment_id}` - Admin, Manager, Cashier
- `PUT /payments/{payment_id}` - Admin, Manager, Cashier
- `DELETE /payments/{payment_id}` - Admin only

## Implementation Details

### Authentication Flow
1. User submits credentials via `/auth/login` endpoint
2. Backend returns JWT token on successful authentication
3. Frontend stores token in localStorage
4. Token is automatically included in all subsequent API requests
5. User role is fetched from `/auth/users/me` endpoint

### Permission Checking
The frontend uses a centralized permission system in `src/utils/permissions.js`:

```javascript
import { hasPermission, ROLES } from './utils/permissions';

// Check if user can perform an action
if (hasPermission(user.role, 'MANAGE_USERS')) {
  // Show user management interface
}
```

### Route Protection
Routes are protected using the `RequireAuth` component:

```javascript
<Route path="/admin" element={
  <RequireAuth allowedRoles={[ROLES.ADMIN]}>
    <AdminDashboard user={user} />
  </RequireAuth>
} />
```

### Navigation
The top navigation bar dynamically shows/hides navigation items based on user permissions:

```javascript
const canAccessAdmin = canAccessRoute(user?.role, '/admin');
const canAccessReports = canAccessRoute(user?.role, '/reports');
```

## Security Considerations

1. **Frontend-only protection is not sufficient** - All permission checks must also be implemented on the backend
2. **JWT token expiration** - Tokens should have appropriate expiration times
3. **Secure token storage** - Consider using httpOnly cookies for production
4. **Role validation** - Backend should validate user roles on every request
5. **API endpoint protection** - All sensitive endpoints must be protected with proper authentication and authorization

## Usage Examples

### Checking Permissions in Components
```javascript
import { hasPermission, PERMISSIONS } from '../utils/permissions';

function MyComponent({ user }) {
  const canManageUsers = hasPermission(user.role, PERMISSIONS.MANAGE_USERS);
  
  return (
    <div>
      {canManageUsers && (
        <button>Manage Users</button>
      )}
    </div>
  );
}
```

### Conditional Rendering
```javascript
import { hasAnyPermission } from '../utils/permissions';

function PaymentActions({ user }) {
  const canManagePayments = hasAnyPermission(user.role, [
    PERMISSIONS.MANAGE_PAYMENTS,
    PERMISSIONS.DELETE_PAYMENTS
  ]);
  
  return (
    <div>
      {canManagePayments && (
        <div className="payment-actions">
          <button>Edit Payment</button>
          {hasPermission(user.role, PERMISSIONS.DELETE_PAYMENTS) && (
            <button>Delete Payment</button>
          )}
        </div>
      )}
    </div>
  );
}
``` 