# SF-Travelogue
SF-Travelogue allows users to search for interesting places in San Francisco neighborhoods.

## Motivation
The motivation for this project is to allow newcomers to San Francisco to have an easy way to explore the neighborhoods and for residents to discover new, interesting places in the city.

## Technologies

* Materialize
* Node.js
* Express
* MongoDB
* Mongoose
* Google Maps API (stretch goal)
* Weather Underground API(stretch goal)

## RESTful Routes(Endpoints)

SF-Travelogue API provides the following JSON endpoints:
* ```GET /api ``` Describes all available endpoints
* ```GET /api/neighborhoods``` Sends all neighborhoods as JSON
* ```GET /api/neighborhoods/:name``` Sends one specific neighborhood as JSON
* ```GET /api/neighborhoods/place/:id``` Sends one specific place
* ```POST /api/neighborhood/place``` creates a new place to a neighborhood
* ```PUT/api/neighborhood/place/:id``` Updates place attributes
* ```PATCH /api/neighborhood/place/:id``` Updates place attributes (research?)
* ```DELETE /api/neighborhood/place/:id``` Deletes one specific place
