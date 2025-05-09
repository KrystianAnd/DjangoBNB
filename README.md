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

### 2. Run with Docker
```bash
docker-compose up --build
