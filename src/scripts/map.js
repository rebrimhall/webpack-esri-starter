import { loadModules } from 'esri-loader';
import { loadCss } from 'esri-loader';

// if the API hasn't already been loaded (i.e. the frist time this is run)
// loadModules() will call loadScript() and pass these options, which,
// in this case are only needed b/c we're using v3.x instead of the latest 4.x
const options = {}; //{ version: '3.28' };
loadCss(); //('3.28');

loadModules(
  [
    'esri/views/MapView',
    'esri/views/SceneView',
    'esri/WebMap',
    'esri/layers/TileLayer',
    'esri/geometry/Extent'
  ],
  options
)
  .then(([MapView, SceneView, WebMap, TileLayer, Extent]) => {
    const wkid = 3857;

    const USExtent = new Extent({
      xmin: -15670101.409658078,

      xmax: -6277519.373978118,

      ymin: 3119053.269508996,

      ymax: 6563000.015924982,

      spatialReference: {
        wkid: wkid
      }
    });

    var transportationLayer = new TileLayer({
      url:
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
      id: 'streets',
      opacity: 0.7
    });

    // create map with the given options at a DOM node w/ id 'mapNode'
    let map = new WebMap({
      basemap: 'oceans',
      // ground: 'world-elevation',
      layers: [transportationLayer]
    });

    let view = new MapView({
      container: 'mapNode',
      map: map,
      center: [-98.579416, 39.828328], // longitude, latitude
      zoom: 4
    });

    /*let view = new SceneView({
      container: 'mapNode',
      map: map,
      center: [-98.579416, 39.828328], // longitude, latitude
      zoom: 5
    });*/

    view.ui._removeComponents(['attribution']);

    /*fetch(
      'urlhere'
    )
      .then(response => response.json())
      .then(data => console.log(data));*/
  })
  .catch(err => {
    // handle any script or module loading errors
    console.error(err);
  });
