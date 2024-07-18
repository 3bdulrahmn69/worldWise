import PropTypes from 'prop-types';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../Contexts/CitiesContext';

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );

  const countries = cities.reduce((accumulator, current) => {
    if (!accumulator.map((el) => el.country).includes(current.country))
      return [
        ...accumulator,
        { country: current.country, emoji: current.emoji },
      ];
    else return accumulator;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries &&
        countries.map((country, idx) => (
          <CountryItem key={idx} country={country} />
        ))}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CountryList;
