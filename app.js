//inserer un fond de carte OSM
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
});

var satellite = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '© Google'
});

var CartoDB_DarkMatter = L.tileLayer('https://a.basemaps.cartocdn.com/dark_all/%7Bz%7D/%7Bx%7D/%7By%7D.png', {
    maxZoom: 20,
    attribution: '© CartoDbDark'
});

//Inserer etendue centre de la carte
var map = L.map('map', {
    center: [14.370834, -14.831543],
    zoom: 7,
    layers: [osm]
});

//Inserer les fonds de carte dans le controle de couche
var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "Satellite": satellite,
    "CartoDB_DarkMatter": CartoDB_DarkMatter
};

// Ajout de la couche WMS
var Departement = L.tileLayer.wms("http://localhost:8080/geoserver/UAM/wms", {
    layers: 'Departement',
    format: 'image/png',
    transparent: true
}).addTo(map)

// Ajout de la couche WMS
var Hydrographie = L.tileLayer.wms("http://localhost:8080/geoserver/UAM/wms", {
    layers: 'Hydrographie',
    format: 'image/png',
    transparent: true
}).addTo(map)


// Ajout de la couche geojson
var Hydrographie1 = L.geoJson(Hydrographie1).addTo(map);
var Routes = L.geoJson(Routes).addTo(map);
var Arrondissement = L.geoJson(Arrondissement).addTo(map);
var Departements = L.geoJson(Departements).addTo(map);
var Regions = L.geoJson(Regions).addTo(map);



//Inserer les fonds de carte dans le controle de couche
var OverLayerMaps = {
    "Departement": Departement,
    "Hydrographie": Hydrographie,
    "ArrondissementJS": Arrondissement,
    "Hydrographiejs": Hydrographie1,
    "Routesjs": Routes,
    "Departementjs": Departements,
    "Regionjs": Regions,


};

//Inserer le controle des couches
L.control.layers(baseMaps, OverLayerMaps).addTo(map);

// Ajouter l'impression des cartes
L.control.browserPrint({ position: 'topleft' }).addTo(map);

// Ajout d'un contrôle d'échelle à la carte 
L.control.scale({
    position: 'bottomleft',
    metric: true,
    imperial: false
}).addTo(map);
