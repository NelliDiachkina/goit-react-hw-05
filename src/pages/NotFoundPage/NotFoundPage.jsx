import { ImSad2 } from 'react-icons/im';
import { HiHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <Link to="/" className={css.link}>
        <HiHome size="24px" />
        Go to homepage
      </Link>
      <p>Oops! Not found! </p>
      <p>
        <ImSad2 size="50px" />
      </p>
    </div>
  );
}
