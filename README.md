# Vue Front-End Only Project with Markdown Editor, Image Display, and Dynamic Routing

This project is a front-end-only application built with Vue 3 and Vite, designed as a blogging platform. It includes features like Markdown file uploads, image display via dynamic URLs, and interactive components using Vue Router and Ant Design Vue.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
  - [Markdown Editor](#markdown-editor)
  - [Image Display](#image-display)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)

## Features

- **Markdown Editing and Previewing**: Users can upload and edit Markdown files, with real-time previews of the content using `v-md-editor`.
- **Dynamic Routing and Image Display**: Enables viewing of dynamic content and images through URL parameters.
- **Component-Based Design**: Uses Vue Router, with custom components for reusability and scalability.
- **Alerts and Notifications**: Centralized user notifications for actions like successful uploads, errors, etc.

## Technologies

- **Vue 3**: Core framework for building reactive UI components.
- **Vite**: Fast development environment for Vue 3.
- **Vue Router**: Enables client-side routing, including dynamic routing for displaying images and Markdown content.
- **Ant Design Vue**: UI library for styled components and interactive elements.
- **v-md-editor**: Markdown editor with preview capabilities.
- **Realm Web SDK (MongoDB Atlas)**: Used for database interactions, authentication, and data fetching without a backend server.

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/DaHui-BT/pulse.git
cd pulse
```