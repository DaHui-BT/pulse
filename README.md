# Pulse — Front-End Blog Application

This is a front-end-only blog application that allows users to create, view, and manage blog articles written in Markdown format. It integrates various features like dynamic image uploads, Vue.js routing, and real-time updates for users.

## Features

- **Markdown-based Blog**: Write and display blog articles using Markdown syntax.
- **Image Upload**: Upload images directly to the MongoDB database.
- **Dynamic Routing**: Vue Router is used for navigating between different blog articles and other pages.
- **User Authentication**: The system uses email/password authentication to manage user sessions.
- **Interactive UI**: A clean, user-friendly interface with Ant Design Vue components.
- **Responsive**: Fully responsive design for both desktop and mobile users.

## Technologies Used

- **Vue.js**: The core JavaScript framework used to build the application.
- **Vue Router**: For handling dynamic routes and navigation.
- **v-md-editor**: A Markdown editor for writing and rendering blog content.
- **MongoDB Atlas**: The backend database used to store articles, user information, and uploaded images.
- **Ant Design Vue**: A UI component library used for building the user interface.
- **Realm Web SDK**: Used for connecting to MongoDB Atlas, handling user authentication, and making API calls.
- **Axios**: For making HTTP requests, such as uploading files and interacting with the API.
- **CSS3 & SCSS**: For styling the application.

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version >= 14.x)
- **npm**

### Steps to Run the Project Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/dahui-bt/pulse.git
    cd pulse
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Change your own database
    ```ts
    // in your service directory change the following code to your configuration
    const config = {
      appId: 'xxx-appId',
      cluster: 'xxx-cluster',
      database: 'xxx-database',
      collection: 'xxx-collection'
    }
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:5173` to see the application.

## File Structure

```bash
├── public                 # Public assets
├── src
│   ├── assets             # Image and other static assets
│   ├── components         # Reusable Vue components
│   ├── services           # MongoDB Realm and utility services
│   ├── pages              # Page components for routes
│   ├── router             # Vue Router configuration
│   ├── tools              # Utility functions (e.g., message utilities)
│   ├── App.vue            # Root Vue component
│   ├── main.ts            # Entry point for the Vue application
└── README.md
```
