import { useEffect, useState } from 'react';
import css from './TypewriterEffect.module.css';

export default function TypewriterEffect({ text, speed = 100 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      const timer = setInterval(() => {
        setDisplayedText(prev => {
          const nextCharIndex = prev.length;
          if (nextCharIndex < text.length) {
            return text.slice(0, nextCharIndex + 1);
          } else {
            clearInterval(timer);
            setIsTyping(false);
            return text;
          }
        });
      }, speed);

      return () => clearInterval(timer);
    }
  }, [isTyping, text, speed]);

  return (
    <div className={css.container}>
      <p>{displayedText}</p>
    </div>
  );
}
