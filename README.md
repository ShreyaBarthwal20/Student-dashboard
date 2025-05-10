# Student Dashboard - React App

This is a responsive Student Dashboard web application built with *React* and integrated with *Firebase Authentication*. The app allows users to log in, sign up, view a list of students, and manage student data with add and remove functionality.

## Features

- *Firebase Authentication*
  - User Sign Up
  - User Login & Logout

- *Student Dashboard*
  - View all students with fields like Name, Email, Enrollment No, Department, and Subject
  - Add new student details via form
  - Remove student from the list
  - Filter students by course/department
  - Responsive and interactive UI

## Technologies Used

- React
- Firebase (Authentication)
- CSS (Responsive Styling)
- React Router
- useState, useEffect (React Hooks)
- Mock Data (JSON)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Firebase project (for auth)

### Installation

1. *Clone the repository:*

```bash
git clone https://github.com/yourusername/student-dashboard-reactapp.git
cd student-dashboard-reactapp
2. Install dependencies:
npm install

3. Configure Firebase:
Create a Firebase project and copy your Firebase config to firebase.js in the project:

// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export default app;

4. Start the app:
npm start

-Folder Structure:

src/
├── components/
│   ├── Login.js
│   ├── Signup.js
│   ├── Dashboard.js
│   ├── AddStudentForm.js
│   └── StudentTable.js
├── firebase.js
├── App.js
├── index.js
└── styles.css
