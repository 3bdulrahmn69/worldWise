import PropTypes from 'prop-types';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CityItem from './CityItem';
import { useCities } from '../Contexts/CitiesContext';

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );

  return (
    <ul className={styles.cityList}>
      {cities && cities.map((city) => <CityItem key={city.id} city={city} />)}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CityList;
