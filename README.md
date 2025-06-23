# 🏡 DjangoBnB – Airbnb Clone

**DjangoBnB** is a full-featured Airbnb clone built with **Django + Django REST Framework** for the backend and **Next.js (React 19)** for the frontend. The entire project is containerized with **Docker** to ensure easy setup, development, and deployment.

<img width="1690" alt="Zrzut ekranu 2025-06-23 o 22 43 17" src="https://github.com/user-attachments/assets/1966e97d-c146-45cb-9155-feb5fb229c52" />

## 🧩 Features

- 🔐 **Secure Authentication System**  
  - User registration, login, logout, and password reset  
  - Token-based authentication using JWT (`dj-rest-auth` + `SimpleJWT`)

- 🏘️ **Property Listings Management**  
  - Create, edit, and delete property listings  
  - Dynamic property cards with responsive images  
  - Multi-step listing form with validation

- 🧭 **Advanced Property Search**  
  - Filter properties by location, date, guests, bedrooms, bathrooms, and category  
  - Integrated with `world-countries` and `react-select`  
  - Dynamic search results with real-time feedback

- 📆 **Reservation System**  
  - Book and manage reservations  
  - Conflict-free date validation using `react-date-range`  
  - Prevent overlapping or invalid bookings

- 💬 **Real-Time Messaging**  
  - One-to-one messaging between users via WebSockets  
  - Responsive, chat-like conversation UI  
  - Powered by Django Channels + Zustand + `react-use-websocket`

- 🌍 **Globalization**  
  - Country and region picker with autocomplete  
  - Internationalized support and formatting

- 📸 **Media Management**  
  - Upload and view property images  
  - Server-side image validation with Pillow  
  - Optimized images using `next/image` with LCP awareness

- ⭐ **Favorites System**  
  - Mark and unmark properties as favorites  
  - Real-time UI updates with optimistic rendering


- ⚙️ **Developer-Friendly Architecture**  
  - Fully typed frontend with TypeScript  
  - Zustand for global state management  
  - Modular, scalable folder structure  
  - Dockerized backend and frontend for seamless local development and deployment




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
- Next.js 15.3.4
- React 19.1
- TailwindCSS 4.1.10
- TypeScript 5.8.3
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
docker-compose up --build backend db
```

### 3. Run frontend manually 

To run frontend you neet do go back into the main forlder DjangoBNB

```bash
cd frontend
cd djangobnb
npm install
npm run dev
```


## 📁 Project Structure

```
djangobnb/
├── backend/           # Django backend
├── frontend/          # Next.js frontend
├── docker-compose.yml
├── .env.dev
├── pyproject.toml
└── README.md
```


## 🧪 Development Tips

Use hot-reloading during development for both frontend and backend.

To rebuild the backend:

```bash
docker-compose up --build backend db
```
To run the backend:


```bash
docker-compose up backend db
```

To run in the background the backend:

```bash
docker-compose up backend db -d
```

To run the frontend:

```bash
npm run dev
```


## 📄 License

Licensed under the **MIT License** – free to use, modify, and distribute.


