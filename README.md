# Staff Vault

Staff Vault is a full-stack staff management website built using the MERN stack (MongoDB, Express, React, Node.js), TypeScript, and Tailwind CSS. It provides an efficient platform for managing staff data, including role-based access control, CRUD operations, and file management.

## Features

- **Staff Management**: Easily manage staff records, including personal details and job roles.
- **Role-Based Access Control**: Different levels of access for administrators, managers, and staff members, ensuring secure data management.
- **CRUD Operations**: Create, Read, Update, and Delete staff records through a user-friendly interface.
- **File Management**: Upload and manage staff-related files (e.g., resumes, certifications).
- **Responsive Design**: Built with Tailwind CSS for a clean, responsive, and modern UI.

## Technologies Used

- **MongoDB**: NoSQL database for storing staff data and related information.
- **Express**: Backend framework to handle API requests and server-side logic.
- **React**: Frontend library for building interactive user interfaces.
- **Node.js**: JavaScript runtime for the backend server.
- **TypeScript**: Superset of JavaScript for type safety and improved development experience.
- **Tailwind CSS**: Utility-first CSS framework for responsive and modern UI design.
- **Redux Toolkit**: State management library used to manage application state, including staff data.
- **MVC Architecture**: Organized backend architecture (Model-View-Controller) for maintainable and scalable code.

## Features and Learnings

- **Role-Based Access Control**: Implemented role-based access to restrict specific actions based on the user's role (Admin, Manager, Staff).
- **CRUD Operations**: Developed API endpoints for managing staff records and handling file uploads.
- **Redux Toolkit**: Learned and implemented Redux Toolkit to manage state efficiently across the application.
- **File Handling**: Handled file uploads (e.g., resumes, employee records) and associated them with staff profiles.
- **Full-Stack Development**: Gained experience in integrating the frontend (React) with the backend (Node.js/Express), using Redux Toolit and MongoDB for data storage.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ThembaMtshelwane/staff-vault.git

2. Install backend dependencies:
   ```bash
   cd staff-vault/
   npm install

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   
4. Set up your environment variables:
Create a .env file in both the backend and frontend directories with the necessary configurations (e.g. PORT, ADMIN_PASSWORD, USER_PASSWORD, MONGO_URI, JWT_SECRET). 

5. Run the project:
   ```bash
   cd staff-vault
   npm install


  ## Development
  1. Backend
-    The backend follows the MVC (Model-View-Controller) architecture to maintain a clean and scalable codebase.
-    Controllers handle the logic for CRUD operations and interact with the models.
-    Routes define the API endpoints for staff management and authentication.
-    The backend uses JWT tokens for authentication and role-based access control.

2. Frontend
-    The frontend is built with React and TypeScript, with Redux Toolkit used to manage the application state.
-    Tailwind CSS is used for building the UI with a focus on responsiveness.
-    Role-based access is implemented by conditionally rendering components based on the user's role.


## Learning Highlights
   1. Redux Toolkit: I gained hands-on experience with Redux Toolkit for efficient state management and asynchronous actions.
   2. Role-Based Access Control: Learned how to implement and manage different access levels within the application.
   3. File Management: Implemented the functionality to upload, store, and associate files with staff members.    
   4. MVC Architecture: Used the MVC pattern to structure the backend, improving scalability and code organization.
