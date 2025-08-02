📄 EV Charger Management Application – Full Stack Project Documentation
🔧 Tech Stack
Frontend: Vue.js, Axios, SweetAlert2, Leaflet.js

Backend: Node.js, Express.js, MySQL

Authentication: JWT-based login

Deployment: https://mapcharge.netlify.app/

📁 Project Structure
evfrontend/
│
├── src/
│   ├── assets/                  # Static assets
│   │   └── icons/
│   │
│   ├── components/              # Reusable Vue components
│   │   ├── ChargerList.vue
│   │   ├── ChargerPage.vue
│   │   ├── LoginForm.vue
│   │   ├── MapView.vue
│   │   └── Navbar.vue
│   │
│   ├── componentscss/           # CSS files for components
│   │   └── NavBar.css
│   │
│   ├── componentslogic/         # JS logic for components
│   │   ├── ChargerList.js
│   │   ├── ChargerPage.js
│   │   ├── MapView.js
│   │   └── NavBar.js
│   │
│   ├── css/                     # Page-specific styles
│   │   ├── ChargerForm.css
│   │   ├── ChargerListPage.css
│   │   ├── HomePage.css
│   │   ├── LoginForm.css
│   │   ├── MapPage.css
│   │   └── RegisterForm.css
│   │
│   ├── logic/                   # Page-level logic scripts
│   │   ├── ChargerForm.js
│   │   ├── ChargerListPage.js
│   │   ├── HomePage.js
│   │   ├── LoginForm.js
│   │   ├── MapPage.js
│   │   └── RegisterForm.js
│   │
│   ├── router/                  # Vue Router
│   │   └── index.js
│   │
│   ├── views/                   # Pages (Vue components)
│   │   ├── ChargerForm.vue
│   │   ├── ChargerListPage.vue
│   │   ├── HomePage.vue
│   │   ├── LoginPage.vue
│   │   ├── MapPage.vue
│   │   └── RegisterPage.vue
│   │
│   ├── App.vue                  # Root component
│   ├── axios.js                 # Axios instance
│   ├── main.js                  # Entry point
│   └── index.html
│
├── package.json
├── vite.config.js
└── jsconfig.json


evbackend/
│
├── config/                 # Database connection setup
│   └── db.js
│
├── middleware/             # JWT validation middleware
│   └── auth.js
│
├── models/                 # Database models & SQL schema
│   └── User.js
│
├── routes/                 # Route definitions
│   ├── auth.js             # Authentication routes (login, register)
│   └── chargers.js         # Charger CRUD routes
│
├── .env                    # Environment variables (DB, JWT secret)
├── package.json
└── server.js               # Express app entry point

✅ Features Implemented
1. 🔐 Authentication
Login page built in Vue.js

Backend /api/login endpoint verifies credentials and issues a JWT.

JWT is stored and used for authenticated requests.

2. ⚡ Charger Management
CRUD operations implemented:

POST /api/chargers: Add a new charger

GET /api/chargers: Fetch all chargers

PUT /api/chargers/:id: Update charger details

DELETE /api/chargers/:id: Remove a charger

Filters implemented for name, status, and location.

Frontend uses a dynamic form (ChargerForm.vue) to create or update chargers.

3. 🗺️ Map Integration
Used Leaflet.js to display chargers on a map.

Each charger appears as a marker.

Clickable markers show charger details.

Which is active or inactive show charger

4. 🧪 API Documentation
You can optionally include Swagger docs, or keep it simple with README.md. Example structure:

Sample API Docs:
POST /api/login

json

Request:
{
  "email": "user@example.com",
  "password": "password123"
}
Response:
{
  "token": "JWT_TOKEN"
}
GET /api/chargers

Headers: Authorization: Bearer <JWT>

Returns a list of charger objects.

POST /api/chargers

Headers: Authorization: Bearer <JWT>

Request Body:

json

{
  "name": "EV Charger 1",
  "status": "active",
  "latitude": 19.123,
  "longitude": 73.123
}
🗃️ Database Schema (MySQL)
Table: chargers

id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255),
status VARCHAR(50),
latitude FLOAT,
longitude FLOAT
Table: users


id INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(255) UNIQUE,
password VARCHAR(255) -- Hashed

🚀 Deployment 
Backend & DB : Railway

Frontend: Netlify

📌 Extra Features (Value Additions)
JWT Authentication

SweetAlert2 for user feedback

Axios instance with auth token handling

Map filters

Responsive layout
