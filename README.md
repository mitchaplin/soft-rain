# Soft Rain
This is my weather app built using React, Typescript, React Context, React Query, Firebase Realtime DB, Firebase Auth, React Charts, Mantine UI, React Tabler Icons, and Openweatherapi.

## Features
My weather app provides users with the following features:

- Search for weather information by city or postal code, or current browser location
- Display of current weather information including temperature, weather description, wind speed, and more metadata
- Display of a 3-day forecast, including temperature and weather description for each day
- Display of a chart showing the temperature trend for the selected city over the next 3 days
- User authentication using Firebase Auth
- Change units from Imperial to Metric
- Dark and Light modes
- Saving user cities as temperature units to Firebase Realtime DB
- Integration with Openweatherapi to fetch weather data

## How to Run the App
To run the app on your local machine, follow these steps:

> #### Clone the repository to your local machine.
> #### Install the dependencies using `npm install`.
> #### Create a .env file in the root directory of the project and add your Openweatherapi API key as REACT_APP_API_KEY=your_api_key.
> #### Start the app using `npm start`.
> #### Open your web browser and navigate to http://localhost:3000/.

## Dependencies
The app uses the following dependencies:

- React: a JavaScript library for building user interfaces
- Typescript: a statically-typed superset of JavaScript
- React Context: a feature of React that allows sharing of data without passing props down the component tree
- React Query: a library for managing remote data in React
- Firebase Realtime DB: a cloud-hosted database that supports real-time updates
- Firebase Auth: a service that provides user authentication
- React Charts: a library for creating charts and graphs with React
- Mantine UI: a modern React UI library
- React Tabler Icons: a library of open-source icons for use in web projects
- Openweatherapi: a service that provides weather data and forecasts
