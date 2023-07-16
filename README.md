# SEACINEMA - Movie Ticket Booking App

Welcome to SEACINEMA, a movie ticket booking app developed by Imanuel Sebastian Girsang as part of the SEA Academy of COMPFEST 2023. This app is built using Next.js framework and is primarily written in TypeScript. We hope you enjoy using the website!

## Features

### 1. Login and Register
SEACINEMA provides a seamless authentication process with NextAuth. Users can create an account and log in securely. This opens up access to various features such as ticket booking and cancellation.

### 2. Balance Control
Users have control over their balance within the app. They can top up their balance and withdraw funds when logged in. The balance is used to purchase movie tickets conveniently.

### 3. Ticket Booking
SEACINEMA offers a wide selection of 31 movies to choose from. Users can browse through the available movies and book tickets for their preferred showtime on the same day.

### 4. Ticket Cancellation
After purchasing a ticket, users have the option to cancel it if the showtime has not yet passed. This feature provides flexibility and convenience for users who may need to make changes to their plans.

## Frontend Tools

- **Tailwind CSS**: A utility-first CSS framework used for styling the SEACINEMA app, providing a responsive and visually appealing design.
- **React Hook Form**: A library used for form validation and handling user input during login, registration, and other form-related interactions.
- **React Hot Toast**: A toast notification library used to display user-friendly notifications for actions like successful ticket purchase or error messages.
- **Axios**: A popular HTTP client library used for making API requests to the backend and handling responses.
- **Zustand**: A state management library that helps manage and share global states between components in a more efficient manner.

## Backend Tools

- **Prisma ORM**: An Object-Relational Mapping (ORM) tool used to interact with the CockroachDB database and perform database operations using a convenient and type-safe approach.
- **CockroachDB**: A distributed SQL database used to store and manage data for the SEACINEMA app. It offers scalability, reliability, and strong consistency.
- **NextAuth**: A flexible authentication library used to handle user authentication and session management in SEACINEMA, providing secure login and registration functionality.
- **bcrypt**: A library used for password hashing to ensure secure storage of user passwords.

## Setup Instructions

To set up and run the SEACINEMA app locally, please follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/seacinema.git`
2. Navigate to the project directory: `cd seacinema`
3. Install dependencies: `npm install`
4. Configure the environment variables:
   - Create a `.env` file in the root of the project.
   - Set the necessary environment variables, such as database connection details.
5. Set up the database:
   - Ensure you have a CockroachDB instance running or set up a connection to a hosted CockroachDB database.
   - Modify the database connection details in the Prisma configuration file (`prisma/schema.prisma`) to match your database setup.
   - Run the database migrations: `npx prisma migrate dev`
6. Start the development server: `npm run dev`
7. Open your browser and visit `http://localhost:3000` to access the SEACINEMA app locally.

Feel free to explore and use the features of SEACINEMA. If you encounter any issues or have any suggestions, please don't hesitate to reach out.

Enjoy your movie ticket booking experience with SEACINEMA!
