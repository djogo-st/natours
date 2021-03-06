/*eslint-disable*/
export const displayMap = (locations) => {

  mapboxgl.accessToken = 'pk.eyJ1IjoiZGpvZ28iLCJhIjoiY2tuaHQ3dDRpMDBzYTJ1bWc5M25vaXNvdCJ9.1TpbOTWykUue0Y4DyBp1YQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/djogo/cknhvcp3j026n17ldf4zvnpxv',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 6,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    //  Add marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    }).setLngLat(loc.coordinates)
      .addTo(map);

    //  Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //  Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
