import { useParams } from 'react-router-dom';
import styles from './City.module.css';
import { useCities } from '../Contexts/CitiesContext';
import { useEffect } from 'react';
import Spinner from './Spinner';
import BackButton from './BackButton';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  // // const { lat, lng } = Object.fromEntries(searchParams);
  // const lat = searchParams.get('lat');
  // const lng = searchParams.get('lng');
  const { getCityById, currentCity, isLoading } = useCities();

  useEffect(() => {
    getCityById(id);
  }, [id, getCityById]);

  const { cityName, flag, date, notes } = currentCity;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span className={flag}></span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
