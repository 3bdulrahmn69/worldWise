import Map from '../Components/Map';
import SideBar from '../Components/SideBar';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <main className={styles.app}>
      <SideBar />
      <Map />
    </main>
  );
}

export default AppLayout;
