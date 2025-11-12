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

# 🏗️ Project Structure : TODO - change structure: keep icons inside /images folder; put js files in "scripts" folder 

```

Fetch-a-gram/
│
├── .github/workflows/ # GitHub Actions for automatic deployment
├── node_modules/ # Dependencies
├── public/ # Public assets
├── src/
│ ├── fonts/ # Custom fonts
│ ├── icons/ # SVG icons
│ ├── images/ # Static images
│ ├── comments.js # Comment system logic
│ ├── counter.js # Optional helper scripts
│ ├── feed.helpers.js # API helper functions for fetching photos and likes
│ ├── feed.js # Renders the photo feed and connects with the helper file
│ ├── header.js # Header behavior (theme toggle)
│ ├── main.js # Entry point for app initialization
│ ├── popup.js # Popup window (likes + comments)
│ └── style.css # Global and component styles
├── index.html # Main HTML entry file
├── vite.config.js # Vite build configuration
├── package.json # Dependencies and scripts
├── .gitignore
└── README.md
```

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


### Part Jalal 

I worked on **Popup Image Viewer** & **UI Integration**

- I worked on the Popup Image Viewer and its UI integration, enhancing the user experience for viewing photos in detail.

- Implemented a clickable image popup modal that opens when a user selects a photo.

- The popup displays the selected image in a larger view for better visibility.

- Added navigation controls within the popup, allowing users to move forward and backward between images seamlessly.

- Designed the right-side UI panel in the popup to show comments and likes, providing a framework for interaction.

- While I focused on the layout and design, team members later expanded this section to handle posting comments, liking photos, and storing user interactions.

- Ensured the popup updates dynamically when navigating through images, maintaining the correct image and associated UI elements.

- Paid attention to responsive design, so the popup works well on different screen sizes, including small screens where the carousel hides appropriately.



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
- Modular and reusable functions (**likeImage**
 **refreshSingleImage**,**updateLikeCountInFeed**) for easy maintenance.

 **likeImage**: Sends a POST request to the API to like an image, updates the heart icon and like count in the popup.

 **refreshSingleImage**: Fetches the latest like count for a single image and updates the feed.

 **updateLikeCountInFeed**: Updates the like count on the feed cards and updates local data.


### 🌸 Part Yordanos



🌸 Part Yordanos

- I worked on both the Header section and the Feed system — including connecting to the API, displaying photos, and improving the overall responsive design.

- 🧭 Header

- Created a sticky header that stays at the top while scrolling.

- Implemented a Dark / Light / Auto theme toggle that automatically follows the user’s system theme (so it changes color based on the user’s device settings).

🖼️ Feed (API + Display)

- Connected the app to the Image Feed API to fetch photos dynamically.
   Cleaned and normalized the API data so each photo card always has:

- an id,

- an image source (src),

- a likes_count,

- and a list of comments.

- Rendered the fetched photos into the feed as image cards.
  Added a “Load More” button to fetch and display new photos from the next API pages.

- Ensured smooth responsive behavior across all devices.
