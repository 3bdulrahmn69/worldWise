import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo';

const links = ['Pricing', 'Product', 'Login'];

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {links.map((link) => (
          <li key={link}>
            <NavLink
              to={'/' + link.toLowerCase()}
              className={link === 'Login' ? styles.ctaLink : ''}
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PageNav;
