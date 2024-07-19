import Map from '../Components/Map';
import SideBar from '../Components/SideBar';
import User from '../Components/User';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <main className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </main>
  );
}

export default AppLayout;
