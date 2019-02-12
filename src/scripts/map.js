import { map } from 'leaflet';

import { basemapLayer, featureLayer } from 'esri-leaflet';

import {
  geosearch,
  arcgisOnlineProvider,
  featureLayerProvider
} from 'esri-leaflet-geocoder';

// create map
const ourMap = map('map').setView([35.12, -89.98], 6);

// add basemap
basemapLayer('Oceans').addTo(ourMap);

// add layer
featureLayer({
  url: 'https://services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/gisday/FeatureServer/0/'
}).addTo(ourMap);

// add search control
geosearch({
  providers: [
    arcgisOnlineProvider(),
    featureLayerProvider({
      url: 'https://services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/gisday/FeatureServer/0/',
      searchFields: ['Name', 'Organization'],
      label: 'GIS Day Events',
      bufferRadius: 20000,
      formatSuggestion: function (feature) {
        return feature.properties.Name + ' - ' + feature.properties.Organization;
      }
    })
  ]
}).addTo(ourMap);