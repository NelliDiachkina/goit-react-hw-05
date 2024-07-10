import { useEffect, useState } from 'react';
import css from './BtnScrollToTop.module.css';
import { PiArrowFatUpFill } from 'react-icons/pi';

export default function BtnScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button className={css.btn} onClick={handleScrollToTop}>
          <PiArrowFatUpFill size="28px" />
        </button>
      )}
    </>
  );
}
