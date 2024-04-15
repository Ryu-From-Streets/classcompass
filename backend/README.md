# Welcome to the backend of the project! Here you will find the code that powers the API and the database

## Structure and Setup

The backend is structured as follows:

- `controllers`: Contains the controllers for the API
- `models`: Contains the models for the database
- `routes`: Contains the routes for the API
- `tests`: Contains the tests for the backend
- `connection.js`: Contains the connection to the database
- `index.js`: The entry point for the backend
- `package.json`: Contains the dependencies and scripts for the backend
- `.env`: Contains the environment variables for the backend

To run the backend, you will need to have Node.js installed. You can install the dependencies by running `npm install` in the root directory of the backend. You can then run the backend by running `npm start`. The backend will run on port `3000` by default.

## API Documentation

The API has the following routes:

- `GET /students`: Returns a list of all the student users
- `GET /students/:id`: Returns the student user with the specified ID
- `POST /students`: Creates a new student user in the database
- `PUT /students/:id`: Updates the student user with the specified ID

- `GET /courses`: Returns a list of all the courses
- `GET /courses/:id`: Returns the course with the specified ID
- `POST /courses`: Creates a new course in the database
- `PUT /courses/:id`: Updates the course with the specified ID

- `GET /advisors`: Returns a list of all the advisor users
- `GET /advisors/:id`: Returns the advisor user with the specified ID
- `POST /advisors`: Creates a new advisor user in the database
- `PUT /advisors/:id`: Updates the advisor user with the specified ID

## Database

The backend uses a MongoDB database to store the data. The database connection string can be configured in the `.env` file in the root directory of the backend. The database schema is defined in the `models` directory.

## Testing

You can run the tests for the backend by running `npm test` in the root directory of the backend. The tests are located in the `tests` directory.

## Web Scraping
