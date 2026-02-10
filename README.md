# 🎬 YouTube Clone (MERN Stack)

A Full Stack **YouTube Clone** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
This project replicates core YouTube features like authentication, video browsing, channel creation, comments, and video watching.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- Protected Routes
- Local Storage Session Handling

### 🏠 Home Page
- Video Feed Grid Layout
- Category Filter Bar
- Responsive UI
- Sidebar Navigation

### 📺 Watch Page
- Video Player
- Video Details Section
- Comments Section
- Related Videos Section

### 📡 Channel Features
- Create Channel
- My Channel Page
- Channel Banner Support
- Channel Video Listing

### 💬 Comments System
- Add Comment
- View Comments Per Video

### 🎨 UI Features
- YouTube Inspired Dark Theme
- Fully Responsive Design
- Collapsible Sidebar
- Hamburger Menu Support

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- CSS (Custom Responsive Styling)

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Other Tools
- UUID
- Dotenv
- Git & GitHub

---

## 📂 Complete Project Folder Structure

```
YOUTUBE-CLONE
│
├── youtube-clone
│
├── server
│   ├── models
│   │   ├── Channel.js
│   │   ├── Comment.js
│   │   └── Video.js
│   │
│   ├── routes
│   │   ├── channelRoutes.js
│   │   ├── commentRoutes.js
│   │   └── videoRoutes.js
│   │
│   ├── node_modules
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── src
│   ├── assets
│   │   ├── avatars
│   │   ├── channelbar
│   │   ├── thumbnails
│   │   └── videos
│   │
│   ├── components
│   │   ├── CommentsSection.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Header.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RelatedVideos.jsx
│   │   ├── Sidebar.jsx
│   │   └── VideoCard.jsx
│   │
│   ├── data
│   │   └── videos.js
│   │
│   ├── pages
│   │   ├── CreateChannel.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyChannel.jsx
│   │   └── Watch.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── public
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Tanuj-2531/YouTube-Clone
cd youtube-clone
```

---

### 2️⃣ Install Frontend Dependencies
```bash
npm install
```

---

### 3️⃣ Install Backend Dependencies
```bash
cd server
npm install
```

---

### 4️⃣ Setup Environment Variables (server/.env)

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

### 5️⃣ Run Backend Server
```bash
cd server
node server.js
```

---

### 6️⃣ Run Frontend
```bash
npm run dev
```

---

### 🌐 Open In Browser
```
http://localhost:5173
```

---

## 🧠 How The Application Works

- User registers and logs in
- User session stored in LocalStorage
- Each user can create only one channel
- Channels are linked using username as owner
- Videos linked using channelId
- Comments linked using videoId
- Sidebar and layout fully responsive

---

## 📱 Responsive Support

✔ Desktop View  
✔ Tablet View  
✔ Mobile View  
✔ Sidebar Collapse Mode  
✔ Hamburger Menu Toggle  

---

## 🔮 Future Improvements

- JWT Authentication
- Video Upload Feature
- Like / Subscribe System
- Notification System
- Cloud Storage Integration
- Live Streaming

---

## 👨‍💻 Author

**Tanuj Agarwal**

---

## 📄 License

This project is created for **learning and educational purposes only**.