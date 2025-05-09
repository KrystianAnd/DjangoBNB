# 🏡 DjangoBnB – Airbnb Clone

**DjangoBnB** is a full-featured Airbnb clone built with **Django + Django REST Framework** for the backend and **Next.js (React 19)** for the frontend. The entire project is containerized with **Docker** to ensure easy setup, development, and deployment.

---

## 🚀 Tech Stack

### 🔧 Backend (API)
- Django 5.2
- Django REST Framework
- PostgreSQL (`psycopg2-binary`)
- dj-rest-auth + django-allauth – user authentication and registration
- SimpleJWT – token-based authentication
- Django Channels + Daphne – real-time features (WebSockets)
- Pillow – image handling
- django-cors-headers – CORS support

### 💻 Frontend
- Next.js 15.3.1
- React 19
- TailwindCSS 4
- TypeScript
- Zustand – state management
- react-date-range – date picker
- react-select – advanced select inputs
- react-use-websocket + socket.io – real-time messaging
- world-countries – country/location data

### 🐳 Dev & Deployment
- Docker
- Docker Compose

---

## 📦 Installation

### Prerequisites
- Docker

### 1. Clone the repository
```bash
git clone https://github.com/KrystianAnd/DjangoBNB
cd djangobnb

```

### 2. Run with Docker
```bash
cd backend
cd djangobnb_backend
docker-compose up --build
```

### 3. Run frontend manually (optional)

To run frontend you neet do go back into the main forlder DjangoBNB

```bash
cd frontend
cd djangobnb
npm install
npm run dev
```

## 🧩 Features

* 🔐 Authentication with JWT (register, login, logout, password reset)
* 🏠 Create and manage property listings
* 📍 Search properties by location and date
* 📸 Upload and view images
* 📅 Make and manage reservations
* 💬 Real-time messaging with WebSockets
* ⭐ Mark property as a favorite
* 🌐 Country and region selector
* 💻 Real time conversation between users

## 📁 Project Structure

```
djangobnb/
├── backend/           # Django backend
├── frontend/          # Next.js frontend
├── docker-compose.yml
├── .env.dev
└── README.md
```


## 🧪 Development Tips

Use hot-reloading during development for both frontend and backend.

To rebuild the backend:

```bash
docker-compose up --build backend
```
To run the backend:

You must be in djangobnb_backend folder !!!

```bash
docker-compose up 
```

To run in the background the backend:

You must be in djangobnb_backend folder !!!

```bash
docker-compose up -d
```

To run the frontend:

```bash
npm run dev
```


## 📄 License

Licensed under the **MIT License** – free to use, modify, and distribute.


