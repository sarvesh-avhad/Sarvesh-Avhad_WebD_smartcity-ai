# UrbanEye (CrowdSourced Problem Reporting Platform)

## 📌 Problem Statement
As urban populations grow, tracking and resolving civic issues such as potholes, broken streetlights, water logging, and sanitation problems becomes increasingly difficult for city administrators. Citizens often lack a transparent, centralized system to report these issues efficiently, track their resolution status, and highlight the most urgent problems affecting their community. This leads to delays in public services and lower civic engagement.

## 💡 Solution Overview
**UrbanEye** is a dynamic, crowdsourced smart city platform designed to narrow the communication gap between citizens and city administration. The application empowers users to:
- **Report Civic Issues:** Geotag locations using an integrated map interface and upload photos to provide visual evidence.
- **Community Engagement:** Upvote existing issues to bring urgent matters to the forefront for administrators, reducing duplicate reports.
- **Participate in Discussions:** Comment on and provide feedback to nearby open issues.
- **Admin Dashboard:** Administrators can view aggregated real-time data, update issue statuses (Pending, In Progress, Resolved), and broadcast public announcements back to the citizen dashboard.

## 🛠 Tech Stack Used
- **Frontend:**
  - React.js + Vite
  - React Router DOM (Navigation)
  - Leaflet / React-Leaflet (Map integration & Geotagging)
  - Vanilla CSS (Styling)
  - Lucide React (Icons)
- **Backend:**
  - Node.js & Express.js
  - MongoDB & Mongoose (NoSQL Database)
  - JSON Web Tokens (JWT) & bcryptjs (Authentication & Security)
  - Multer & Cloudinary (Image uploads)
- **Other Tools/Libraries:**
  - `cors` & `dotenv` for environment management

## 🚀 Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine
- A MongoDB cluster or local MongoDB instance
- A [Cloudinary](https://cloudinary.com/) account for image uploads

### 1. Clone the Repository
```bash
git clone https://github.com/sarvesh-avhad/Sarvesh-Avhad_WebD_smartcity-ai.git
cd CrowdSourced
```

### 2. Backend Setup
```bash
# Navigate to the backend directory
cd Backend

# Install dependencies
npm install

# Create a .env file and add your environment variables
touch .env
```
Add the following to your `Backend/.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

```bash
# (Optional) Seed the database with the default Admin user
node seedAdmin.js

# Start the background server
node server.js
```

### 3. Frontend Setup
Open a new terminal session and navigate back to the root of the project.
```bash
# Navigate to the frontend directory
cd Frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend should now be running locally at `http://localhost:5173`, proxying all `/api` requests to your backend at `http://localhost:5000`.

## 👥 Team Members
- **Sumit Kapse**  
- **Sarvesh Avhad**  
- **Advait Dahitule** 
- **Soumya Juwatkar** 
- **Ashish Chavan** 
<<<<<<< HEAD

=======
>>>>>>> 603d14ae9636dbd9f8b5c542feca509374fce50f
