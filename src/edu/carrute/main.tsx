import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Game from './Game.tsx';
import { QUIZ } from './quiz.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Game quiz={QUIZ} />
  </StrictMode>,
);
