import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.wrapper}>
      <p>Loading ...</p>
      <InfinitySpin
        visible={true}
        width="200"
        color="#ffffffde"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}
