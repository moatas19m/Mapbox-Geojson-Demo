import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'YOUR-MAPBOX-PUBLIC-ACCESS-TOKEN';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11', // Change style if needed
        center: [0, 0], // Default center (Longitude, Latitude)
        zoom: 2
    });

    map.on('load', () => {
        fetch('data.geojson') // S3 public URL OR perhaps Presigned URL with a longer time-frame
            .then(response => response.json())
            .then(geojson => {
                map.addSource('geojson-source', {
                    type: 'geojson',
                    data: geojson
                });

                map.addLayer({
                    id: 'geojson-layer',
                    type: 'fill',
                    source: 'geojson-source',
                    paint: {
                        'fill-color': '#40E0D0',  // Red color
                        'fill-opacity': 0.5
                    }
                });

                map.addLayer({
                    id: 'geojson-outline',
                    type: 'line',
                    source: 'geojson-source',
                    paint: {
                        'line-color': '#ffffff', // Black outline
                        'line-width': 2
                    }
                });
                
                map.addLayer({
		    id: 'geojson-text',
		    type: 'symbol',
		    source: 'geojson-source',
		    filter: ['!=', ['get', 'Text'], ''], // Exclude empty text values
		    layout: {
			'text-field': ['get', 'Text'],
			'text-size': 16,
			'text-anchor': 'center',
			'text-offset': [0, 1]
		    },
		    paint: {
			'text-color': '#FFFFFF',
			'text-halo-color': '#FFFFFF',
			'text-halo-width': 1
		    }
		});


                map.fitBounds(getGeoJSONBounds(geojson), { padding: 20 });
            })
            .catch(error => console.error('Error loading GeoJSON:', error));
    });

    function getGeoJSONBounds(geojson) {
        const bounds = new mapboxgl.LngLatBounds();
        geojson.features.forEach(feature => {
            if (feature.geometry.type === 'Point') {
                bounds.extend(feature.geometry.coordinates);
            } else if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                feature.geometry.coordinates.flat(Infinity).forEach(coord => bounds.extend(coord));
            }
        });
        return bounds;
    }
