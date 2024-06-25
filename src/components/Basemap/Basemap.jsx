import s from './Basemap.module.css';

// eslint-disable-next-line
export const Basemap = ({ basemap, onBMChange }) => {
  const onChange = (e) => {
    onBMChange(e.currentTarget.value);
  };

  return (
    <div className={s.container}>
      <select value={basemap} onChange={onChange}>
        <option value="osm">OSM</option>
        <option value="hot">OSM HOT</option>
        <option value="dark">DARK</option>
      </select>
    </div>
  );
};
