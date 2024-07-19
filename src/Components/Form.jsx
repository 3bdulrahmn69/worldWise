// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from 'react';
import { useUrlPosition } from '../Hooks/useUrlPosition';
import Button from './Button';
import BackButton from './BackButton';
import Message from './Message';
import Spinner from './Spinner';
import DatePicker from 'react-datepicker';
import { createCustomId } from '../Utils/createCustomId';
import { useCities } from '../Contexts/CitiesContext';
import { convertToClassName } from '../Utils/convertToClassName';

import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [geolocationError, setGeolocationError] = useState(null);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [flag, setFlag] = useState('');

  const navigate = useNavigate();

  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeolocation(true);
        setGeolocationError(null);
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryCode)
          throw new Error("it's not a city please click on a city 😊");

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName.split('(')[0]);
        setFlag(convertToClassName(data.countryCode));
      } catch (error) {
        setGeolocationError(error.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      id: createCustomId(date, cityName),
      cityName,
      country,
      flag,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate('/app/cities');
  }

  if (isLoadingGeolocation) return <Spinner />;

  if (!lat || !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geolocationError) return <Message message={geolocationError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <div className={styles.flex}>
          <label htmlFor="cityName">City name</label>
          <span className={styles.countryName}>{country}</span>
        </div>
        <span className={styles.flag}>
          <span label={country} className={flag}></span>
        </span>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
