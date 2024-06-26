import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import s from './MapComponent.module.css';
import { Basemap } from '../Basemap/Basemap';
import { useState } from 'react';
import { GeojsonLayer } from '../GeojsonLayer/GeojsonLayer';

export const MapComponent = () => {
  const [bm, setBM] = useState('osm');
  const [geojsonVisible, setGeojsonVisible] = useState(false);

  const state = {
    lat: 35.682839,
    lng: 139.759455,
    zoom: 11,
  };

  const basemapDict = {
    osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    hot: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    dark: 'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png',
  };

  const onBMChange = (bm) => {
    setBM(bm);
  };

  const onGeojsonToggle = (e) => {
    setGeojsonVisible(e.currentTarget.checked);
  };

  return (
    <div className={s.mapWrapper}>
      <MapContainer
        className={s.container}
        center={[state.lat, state.lng]}
        zoom={state.zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          key={bm}
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={basemapDict[bm]}
        />
        <Basemap basemap={bm} onBMChange={onBMChange} />
        <div className={s.geojsonToggle}>
          <label htmlFor="layertoggle">Toggle Geojson</label>
          <input
            type="checkbox"
            name="layertoggle"
            id="layertoggle"
            value={geojsonVisible}
            onChange={onGeojsonToggle}
          />
        </div>
        {
          geojsonVisible && <GeojsonLayer url="geojson.json"/>
        }
        <Marker position={[state.lat, state.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
