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

## ⚙️ Deployment

The project uses **GitHub Actions** for continuous deployment:

- Every **push** or **pull request** to the `develop` branch triggers an automatic build and deploy.  
- The app is hosted via **GitHub Pages** — built directly from the `develop` branch.  

---

### Part Anna 

I worked on the **Comments feature** and **deployment setup**.

Here is what I did:
- Implemented the comments functionality — users can view and add comments for each image in the popup.
- Ensured that the comment count is displayed correctly on both the popup and the feed thumbnails.
- Fixed the like and comment counters to always show the latest data after user interaction.
- Structured the code.
- Configured and tested the deployment setup, ensuring the app builds and runs correctly in the production environment (GitHub Pages / Vite).
- Worked with HTML and CSS where needed to adjust layout, improve responsiveness, and maintain visual consistency across the app.


### Part Jalal TODO-update

### Part Saheena 

I worked on the **Footer section**.  
Here is what I did:

- Added a **Project Repo link** with the GitHub logo for easy access to the repository.
- Added team member **LinkedIn profiles** with logos for attribution.
- Made the footer **responsive** so it adapts to both small and large screens.
- Designed a clean and simple layout that aligns with the overall app theme.
- Used simple **HTML and CSS** so the team can easily maintain it.


I worked on the **Like functionality**.
Here is what I did:

- Users can **like an image from the popup**.
- Updates **like count in the popup instantly**.
- Syncs the **like count with feed cards** on the main page.
- Tracks **changed likes** to refresh feed images when the popup is closed.
- Modular and reusable functions (**likeImage**, **refreshSingleImage**,                  **updateLikeCountInFeed**) for easy maintenance.

 **likeImage**: Sends a POST request to the API to like an image, updates the heart icon and like count in the popup.

 **refreshSingleImage**: Fetches the latest like count for a single image and updates the feed.

 **updateLikeCountInFeed**: Updates the like count on the feed cards and updates local data.


### 🌸 Part Yordanos

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


