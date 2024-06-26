import { useEffect, useState } from 'react';
import { FeatureGroup, Popup, Marker } from 'react-leaflet';

// eslint-disable-next-line
export const GeojsonLayer = ({ url }) => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    let request = fetch(url);

    request
      .then((r) => r.json())
      .then(
        (data) => {
          setData(data.features);
        },
        (error) => {
          console.error(error);
        }
      );
  };

  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url]);

  return (
    <FeatureGroup>
      {/* {data &&
        data.map((f) => {
          return (
            <GeoJSON key={f.properties.id} data={f}>
              <Popup>{f.properties.id}</Popup>
            </GeoJSON>
          );
        })} */}
      {data &&
        data?.map((f) => (
          <Marker
            key={JSON.stringify(f.properties)}
            position={f.geometry.coordinates.reverse()}
          >
            <Popup minWidth={200} closeButton={false}>
              <div style={{ backgroundColor: 'red', color: 'white' }}>
                <b>Hello</b>
                <p>I am {f.properties.name}</p>
              </div>
            </Popup>
          </Marker>
        ))}
    </FeatureGroup>
  );
};
