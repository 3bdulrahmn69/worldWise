import Logo from './Logo';
import AppNav from './AppNav';
import { Outlet } from 'react-router-dom';
import styles from './Sidebar.module.css';

function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </aside>
  );
}

export default SideBar;
