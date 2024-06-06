import { NavLink } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { MdLocalMovies } from 'react-icons/md';
import clsx from 'clsx';
import css from './Navigation.module.css';

const makeLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.isActive);
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.navList}>
          <li>
            <NavLink to="/" className={makeLinkClass}>
              <HiHome size="24px" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={makeLinkClass}>
              <MdLocalMovies size="24px" /> Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
