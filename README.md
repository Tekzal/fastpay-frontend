# FastPay Frontend

A modern, role-based school payments and admin dashboard built with React, Tailwind CSS, and Vite.

## Overview

FastPay Frontend is a multi-role web application for managing school payments, users, and reports. It features:
- **Admin Dashboard**: Manage users, students, departments, classes, fees, and payments.
- **Student Payments Interface**: For students/cashiers to view and make payments.
- **Reports**: For managers/admins to view and export payment and fee reports.
- **Role-based access**: Only authorized users can access specific sections.

## Features
- JWT authentication (login/logout)
- Role-based route protection (admin, manager, cashier, etc.)
- Modern UI with Tailwind CSS
- PDF/Excel/CSV export for reports
- Responsive design

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)

### Installation
```bash
git clone <repo-url>
cd fastpay-frontend
npm install
```

### Running the App
```bash
npm run dev
```
The app will be available at `http://localhost:5173` by default.

### Environment Variables
- The frontend expects the backend API at `http://localhost:8000/api/v1` by default. To change this, edit `src/services/api.js`.

## Authentication & Roles
- **Login**: `/login` (username & password, JWT-based)
- **Admin Dashboard**: `/admin` (admin only)
- **Student Payments**: `/` or `/student` (all authenticated users)
- **Reports**: `/reports` (admin & manager only)
- User info and role are fetched from the backend (`/auth/me` endpoint expected).

## Project Structure
```
fastpay-frontend/
  ├── src/
  │   ├── admin/         # Admin dashboard components, hooks, utils
  │   ├── user/          # Student/cashier UI components
  │   ├── reports/       # Reports UI components
  │   ├── pages/         # Main app pages (AdminDashboard, Login, etc.)
  │   ├── services/      # API service layer
  │   └── App.jsx        # Main app entry
  ├── public/
  ├── package.json
  └── ...
```

## API Endpoints (Backend)
- **Login:** `POST /api/v1/auth/login` (form data)
- **Current User:** `GET /api/v1/auth/me` (returns user info & role)
- **Users CRUD:** `/api/v1/users/`
- **Departments, Classes, Students, Fees, Payments, Reports:** See backend docs

## Customization
- To change roles or add new ones, update role checks in `src/App.jsx` and backend.
- To change API base URL, edit `src/services/api.js`.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Contact
For support or questions, contact the maintainer at clement.quoda@gmail.com. 
