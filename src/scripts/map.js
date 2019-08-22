import { loadModules } from 'esri-loader';
import { loadCss } from 'esri-loader';

// if the API hasn't already been loaded (i.e. the frist time this is run)
// loadModules() will call loadScript() and pass these options, which,
// in this case are only needed b/c we're using v3.x instead of the latest 4.x
const options = { version: '3.28' };
loadCss('3.28');

loadModules(['esri/map', 'esri/geometry/Extent'], options)
  .then(([Map, Extent]) => {
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
    // create map with the given options at a DOM node w/ id 'mapNode'
    let map = new Map('mapNode', {
      sliderPosition: 'top-right',
      basemap: 'streets',
      center: [-98.579416, 39.828328],
      zoom: 5,
      scrollWheelZoom: true,
      sliderPosition: 'top-right',
      logo: false,
      isKeyboardNavigation: false,
      navigationMode: 'css-transforms',
      extent: USExtent
    });

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
