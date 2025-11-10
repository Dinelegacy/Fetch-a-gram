# 📸 Fetch-a-gram

A collaborative mini web app inspired by Instagram — built by our team as part of a group project.  
It fetches images from a public API, displays them as a responsive gallery, and allows users to **like photos**, **add comments**, and **switch themes**.

---

## 🚀 Features

✅ Dynamic photo feed fetched from the [Image Feed API](https://image-feed-api.vercel.app/)  
✅ Interactive popup with photo details  
✅ Like system with real-time UI updates  
✅ Add and view comments per photo  
✅ Dark / Light / Auto theme toggle  
✅ Preloader animation when fetching images  
✅ Responsive layout for all screen sizes  
✅ Automatic GitHub Pages deployment on push / PR to `develop`

---

## 🧭 Branching Strategy

- **`main`** — Simulated production branch  
  → Used for the final project version

- **`develop`** — Default branch for ongoing development  
  → All feature branches are created off `develop`  
  → Submit Pull Requests (PRs) from your feature branch into `develop`  
  → Direct commits to `develop` are **not recommended**

---

## 🔗 API Documentation

You can explore the project’s API here:  
👉 [https://image-feed-api.vercel.app/](https://image-feed-api.vercel.app/)

---

## 🚀 Running the Project

To run the project on your local machine:

## 🚀 Running the Project

To run the project on your local machine:

```bash
# 1. Clone the repository
git clone git@github.com:Dinelegacy/Fetch-a-gram.git

# 2. Navigate into the folder
cd Fetch-a-gram

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open the project in your browser
# (Vite will usually start on http://localhost:5173)
```


# 🏗️ Project Structure : TODO - change structure: keep icons inside /images folder; put js files in "scripts" folder 

Fetch-a-gram/
│
├── .github/workflows/ # GitHub Actions for automatic deployment
├── node_modules/ # Dependencies
├── public/ # Public assets
├── src/
│ ├── fonts/ # Custom fonts
│ ├── icons/ # SVG icons (move to images/)
│ ├── images/ # Static images
│ ├── comments.js # Comment system logic
│ ├── counter.js # Optional helper scripts
│ ├── feed.js # Fetch and render photo feed
│ ├── header.js # Header behavior (theme toggle)
│ ├── main.js # Entry point for app initialization
│ ├── popup.js # Popup window (likes + comments)
│ └── style.css # Global and component styles
│
├── index.html # Main HTML entry file
├── vite.config.js # Vite build configuration
├── package.json # Dependencies and scripts
├── .gitignore
└── README.md

## ⚙️ Deployment

The project uses **GitHub Actions** for continuous deployment:

- Every **push** or **pull request** to the `develop` branch triggers an automatic build and deploy.  
- The app is hosted via **GitHub Pages** — built directly from the `develop` branch.  

---

### Part Anna TODO-update

### Part Jalal TODO-update

### Part Saheena TODO-update

### 🌸 Part Yordanos TODO-update

I worked on the **Header section**.  
Here is what I did:

- Added a **sticky header** that stays on top when you scroll.
- Added a **logo** and the **Fetch-a-gram** name.
- Added a **Dark Mode / Light Mode toggle** that changes the color of the whole page.
- Made the header **responsive** (works on small and big screens).
- Wrote **simple CSS and JavaScript** so everyone on the team can understand it.

---

## 🧠 How the Dark Mode Works

- The toggle button adds or removes a class called `dark-mode` on the `<body>`.
- When `dark-mode` is active, the background turns dark navy and the text turns white.
- When you click again, it goes back to light mode.

---

## 🧩 Files I Worked On

- `index.html` → Header structure  
- `style.css` → Header style + dark/light mode  
- `main.js` → Toggle button JavaScript
