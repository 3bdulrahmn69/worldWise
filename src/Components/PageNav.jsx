import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import styles from './PageNav.module.css';

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
