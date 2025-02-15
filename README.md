# BLOG APP

The **Blog App** is a modern and intuitive platform where users can create, publish, and manage blog posts effortlessly. Whether you're a writer, journalist, or casual blogger, this app provides a seamless experience to share your thoughts with the world.  

## Features  
✅ **User Authentication** – Secure sign-up and login system for authors.  
✅ **Create & Edit Posts** – Rich text editor to format content with ease.  
✅ **Image Uploads** – Enhance posts with featured images.  
✅ **Categories & Tags** – Organize blogs with relevant topics.  
✅ **User Profile** – Manage user profile.   
✅ **Responsive Design** – Optimized for desktops, tablets, and mobile devices.  

## Tech Stack  
- **Frontend:** React.js  
- **Backend:** Node.js / Express.js with MongoDB  
- **Authentication:** JWT-based user authentication


## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/blitzster/MERN-Blog

2. cd MERN Blog

3. npm install


## Usage

Run the following command to start the project:
```bash
npm start  #for the frontend(REACT)

npm run dev #for the backend(EXPRESS/NODE)

make sure to create .env for both frontend and backend
backend store the following
MONGO_URI = mongodb+srv://username:password@cluster0.eae0aap.mongodb.net/mern-blog

PORT = 5000

JWT_SECRET = randomkey


frontend .env
REACT_APP_BASE_URL="http://localhost:5000/api"
REACT_APP_ASSETS_URL="http://localhost:5000"
```


## SCREENSHOTS
![Homepage Screenshot](screenshots/home.png)
![Profile Screenshot](screenshots/profile.png)
![Create Post Screenshot](screenshots/createPost.png)
![Authors Screenshot](screenshots/authors.png)
![Signin Screenshot](screenshots/login.png)
![Signup Screenshot](screenshots/signup.png)
![Post Details Screenshot](screenshots/postdetails.png)
