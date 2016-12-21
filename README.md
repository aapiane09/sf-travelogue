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
* ```GET /api/neighborhoods``` get all neighborhoods as JSON
* ```GET /api/neighborhoods/:hoodId``` get one specific neighborhood as JSON
* ```GET /api/neighborhoods/:hoodId/places``` get all places from a neighborhood
* ```GET /api/neighborhoods/:hoodId/places/:placeId``` get one specific place from a neighborhood
* ```POST /api/neighborhoods/:hoodId/places``` create a new place for a neighborhood
* ```PUT /api/neighborhoods/:hoodId/places/:placeId``` Updates one place attributes
* ```PATCH /api/neighborhoods/:hoodId/places/:placeId``` Updates one place attributes (research?)
* ```DELETE /api/neighborhoods/:hoodId/places/:placeId``` Delete one specific place from a neighborhood
