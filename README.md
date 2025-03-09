# Weather Dashboard

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

The Weather Dashboard is a web application that allows users to search for current and future weather conditions for multiple cities. Users can view the city name, date, weather conditions, temperature, humidity, and wind speed. The application also maintains a search history, allowing users to quickly access previously searched cities.

## Table of Contents
- [Installation](#installation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Deployed Page](#deployed-page)
- [Questions](#questions)

## Installation

To install the necessary dependencies, follow these steps:

1. Clone the repository:
    ```bash
    git clone [https://github.com/mohsinansare/Weatherinquirych9]
    ```
2. Navigate to the project directory:
    ```bash
    cd weather-dashboard
    ```
3. Install the dependencies for both the client and server:
    ```bash
    npm run install
    ```
4. Building on local  :
    ```bash
    npm run build
    ```
5. Running the Server
    ```bash
    npm run server
    ```

## User Story

AS A traveler

I WANT to see the weather outlook for multiple cities

SO THAT I can plan a trip accordingly

## Acceptance Criteria

GIVEN a weather dashboard with form inputs

WHEN I search for a city

THEN I am presented with current and future conditions for that city, and that city is added to the search history

WHEN I view current weather conditions for that city

THEN I am presented with the city name, the date, an icon representation of weather conditions, a description of the weather for the icon's `alt` tag, the temperature, the humidity, and the wind speed

WHEN I view future weather conditions for that city

THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history

THEN I am again presented with current and future conditions for that city

## Deployment

To deploy the application to Render, follow these steps:

1. Create a new web service on Render for the server:
    - Connect your GitHub repository.
    - Set the build command to `npm run build`.
    - Set the start command to `npm start`.
    - Add the following environment variables:
        - `API_BASE_URL=https://api.openweathermap.org`
        - `API_KEY=your_openweather_api_key`

## Contributing

Base files were provided by © 2024 edX Boot Camps

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit).

## Deployed Page
![deployed page](img/deployed_page.PNG)

On the command prompt when it says Listening on PORT: 3001. If the website doesn't deploy then type in chrome localhost:3001.
The website will be deployed.


## Questions
For any questions, don't hesitate to get in touch with me with the information below:

GitHub repository: https://github.com/mohsinansare/Weatherinquirych9

Email: mohsinansare@gmail.com

____________________________________
© 2024 Pink727. All Rights Reserved.
