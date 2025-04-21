'use client'
import { useEffect, useState } from 'react';

type TypewriterTextProps = {
  texts: string[];
  speed?: number;
  pause?: number;
};

export default function TypewriterText({
  texts,
  speed = 50,
  pause = 1500, // pause between words
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentTextIndex >= texts.length) return;

    const currentText = texts[currentTextIndex];

    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setCharIndex(0);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentTextIndex, texts, speed, pause]);

  return <p className="min-h-10 text-blue-600 font-semibold" >{displayedText}</p>;
}