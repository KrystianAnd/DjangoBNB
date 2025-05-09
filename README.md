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
- Node.js (only if running frontend manually)

### 1. Clone the repository
```bash
git clone https://github.com/KrystianAnd/DjangoBNB
cd djangobnb
cd backend
cd djangobnb_backend
```

### 2. Run with Docker
```bash
docker-compose up --build
```

### 3. Run frontend manually (optional)



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
* ⭐ Leave and view reviews
* 🌐 Country and region selector

## 📁 Project Structure

```
djangobnb/
├── backend/           # Django backend
├── frontend/          # Next.js frontend
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## ⚙️ Environment Variables

You should create `.env` files for both backend and frontend with all necessary secrets and configuration. Example:

### `.env` (Backend)

```
DEBUG=True
SECRET_KEY=your-django-secret-key
POSTGRES_DB=your-db-name
POSTGRES_USER=your-db-user
POSTGRES_PASSWORD=your-db-password
```

### `.env.local` (Frontend)

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🧪 Development Tips

Use hot-reloading during development for both frontend and backend.

To rebuild the backend:

```bash
docker-compose up --build backend
```

To rebuild the frontend:

```bash
docker-compose up --build frontend
```

## 🌐 Deployment

### Backend

Can be deployed to:

* Render
* Railway
* Heroku
* DigitalOcean
* AWS EC2 or Lightsail

### Frontend

Optimized for:

* Vercel
* Netlify
* Cloudflare Pages

## 👤 Author

**Krystian Andrzejak**
🌐 [webbykrystian.com](https://webbykrystian.com)

## 📄 License

Licensed under the **MIT License** – free to use, modify, and distribute.

```

Gotowe do wklejenia ✨ Potrzebujesz też pliku `docker-compose.yml` albo `.env` do backendu?
```
