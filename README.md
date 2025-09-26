🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built using Node.js, React, and MongoDB, following Test-Driven Development (TDD) practices.
This project demonstrates authentication, CRUD operations, inventory management, and a modern SPA frontend.
📌 Features
🔹 Backend (Node.js + Express + MongoDB)

User Authentication (Register & Login using JWT).

Sweet Management:

Add, update, and delete sweets (Admin only).

View all sweets.

Search sweets by name, category, or price.

Inventory Management:

Purchase sweets (decrease quantity).

Restock sweets (Admin only).

🔹 Frontend (React)

User registration and login forms.

Dashboard showing all available sweets.

Search and filter sweets.

Purchase button (disabled when stock is zero).

Admin panel for adding, updating, and deleting sweets.

🛠️ Tech Stack

Frontend: React, Axios, CSS/Tailwind/Bootstrap

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT (JSON Web Token)

Testing: Jest / Supertest

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/sweet-shop-management.git
cd sweet-shop-management

2️⃣ Setup Backend
cd backend
npm install


Create a .env file in backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run backend:

npm run dev

3️⃣ Setup Frontend
cd frontend
npm install
npm start

4️⃣ Running Tests
cd backend
npm test

📷 Screenshots
<img width="1919" height="945" alt="image" src="https://github.com/user-attachments/assets/c5c0681c-cf57-4ce9-95b7-079cc4976cfe" />

