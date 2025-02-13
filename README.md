# Mapbox-Geojson-Demo
A simple frontend hosting a mapbox map and a locally served raw geojson file.


### Instructions

- Inside the main folder run ```npm install```
- Add your geojson source file as 'data.geojson' in the /public/ directory
- Add your mapbox public access token in /src/main.js
- Run ```npm run dev```

  #### LT - specifics

  - Add the smart objects geojson to /public/ as data.geojson,
  - Integrate this code in the frontend pages serving the map, change styling to whatever the projet's standard style is,
  - Add a comment/note for yourselves to change the source (see main.js -> map.on('load', () => {
        fetch('data.geojson')) to the public S3 URL later when the flow is finalized.
