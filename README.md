# 🎬 Movie App

A modern movie browsing web application built with **React.js**, powered by **Appwrite** as the backend and integrated with **TMDB API** for movie data.  
The app allows users to browse trending films, search for specific titles, and view the most searched movies.

---

## 🚀 Features

- 🔍 **Search movies** by title using TMDB API  
- 🎥 **List all movies** with posters, titles, and ratings  
- 📈 **Most searched** section to display trending or frequently searched movies  
- 💾 **Appwrite backend** for managing user data and app logic  
- ⚡ **Responsive design** optimized for all screen sizes  

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React.js (Vite) |
| Backend | Appwrite |
| API | TMDB (The Movie Database) |
| Styling | CSS / Tailwind CSS |


---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movie-app.git
   cd movie-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add:

   ```bash
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   ```

4. **Run the app locally**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:your_port_number
   ```

---


## 🎥 Preview

![Movie App Demo](./demo/demo.gif)


---

## 📚 API Reference

This project uses [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started).

Example endpoint:
```bash
https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=Inception
```

---

