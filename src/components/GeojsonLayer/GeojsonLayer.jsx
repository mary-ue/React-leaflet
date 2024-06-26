import { useEffect, useState } from 'react';
import { FeatureGroup, Popup, GeoJSON } from 'react-leaflet';

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
      {
        fetchData(url);
      }
    }
  }, [url]);

  return (
    <FeatureGroup>
      {data &&
        data.map((f) => {
          return (
            <GeoJSON key={f.properties.id} data={f}>
              <Popup>{f.properties.id}</Popup>
            </GeoJSON>
          );
        })}
    </FeatureGroup>
  );
};
