# Advanced To-Do Application

Live Link : https://todo-app-xi-neon-15.vercel.app/

## Overview
Enhance the basic To-Do application by integrating external API data, implementing advanced state management using Redux, and ensuring the application is responsive and user-friendly across different devices.

## Features

### React Components And Advanced State Management
- Develop the application using functional components and demonstrate the use of React hooks (e.g., `useState`, `useEffect`).
- The application should have at least two components:
  - **TaskInput**: A component for adding a new task.
  - **TaskList**: A component for displaying the list of tasks.
- Use Redux Thunk or Redux Saga for handling asynchronous actions (e.g., API calls).

### Responsive Design
- Ensure the application is fully responsive and provides an excellent user experience on mobile, tablet, and desktop devices.
- Use CSS Grid and Flexbox to achieve responsiveness.
- Implement a mobile-first design approach.

### Functionality
- **Add Task**: Users should be able to input a task into a text field and add it to the list by pressing a button or pressing Enter.
- **View Tasks**: Display all added tasks in a list format.
- **Delete Task**: Each task should have a delete button that, when clicked, removes the task from the list.
- **Task Prioritization**: Allow users to set priorities for tasks (e.g., High, Medium, Low) and display them accordingly.
- **Persistent Storage**: Use local storage or session storage to save tasks and authentication status, ensuring data persistence across browser sessions.

### User Authentication
- Add a simple user authentication feature (login/logout functionality) that simulates the process using Redux for state management.
- There's no need to integrate with a backend; you can mock the authentication process.
- Protect the To-Do list behind authentication, ensuring that tasks are only visible to logged-in users.

## Additional Instructions
- Follow best practices for organizing your project structure, especially as it grows in complexity with these new features.
- Prioritize clean code and maintainability, making sure your application is scalable.
- Deploy your application using a free hosting service (e.g., Netlify, Vercel, GitHub Pages) and provide the live site URL for immediate access and testing.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/advanced-todo-app.git
   cd advanced-todo-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Deployment
- Deploy your application using **Netlify, Vercel, or GitHub Pages**.
- Provide the live site URL in your repository.

## License
This project is open-source and available under the [MIT License](LICENSE).


