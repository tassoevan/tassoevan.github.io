import { useEffect, useReducer } from 'react';
import Button from './components/Button';
import PodiumScreen from './components/PodiumScreen';
import QuestionScreen from './components/QuestionScreen';
import ScoreboardScreen from './components/ScoreboardScreen';
import SetupScreen from './components/SetupScreen';
import type { GameAction, Phase } from './game';
import { createGameReducer, createInitialState } from './game';
import type { Quiz } from './quiz';

// Action triggered by presentation clickers (which send PageDown or ArrowRight) in each phase.
const PRIMARY_ACTIONS: Record<Phase, GameAction | undefined> = {
  setup: undefined,
  question: { type: 'reveal' },
  reveal: { type: 'score' },
  scoreboard: { type: 'next' },
  podium: undefined,
};

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen();
  else void document.documentElement.requestFullscreen();
}

type GameProps = Readonly<{ quiz: Quiz }>;

export default function Game({ quiz }: GameProps) {
  const [state, dispatch] = useReducer(
    createGameReducer(quiz.questions.length),
    undefined,
    createInitialState,
  );

  useEffect(() => {
    const action = PRIMARY_ACTIONS[state.phase];
    if (!action) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'PageDown' && event.key !== 'ArrowRight') return;
      if (event.target instanceof HTMLInputElement) return;
      event.preventDefault();
      dispatch(action);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.phase]);

  const question = quiz.questions[state.questionIndex];

  return (
    <div className='mx-auto flex min-h-screen max-w-6xl flex-col gap-6 p-4 sm:p-8'>
      <header className='flex items-center justify-between gap-4'>
        <p className='text-primary text-lg font-bold'>{quiz.title}</p>
        <Button variant='secondary' onClick={toggleFullscreen}>
          Tela cheia
        </Button>
      </header>

      {quiz.draft && state.phase === 'setup' && (
        <p role='note' className='border-secundary text-secundary rounded-lg border-2 p-3'>
          Este é um quiz de exemplo, provisório. As perguntas da aula ainda precisam ser
          cadastradas.
        </p>
      )}

      <main className='flex flex-1 flex-col'>
        {state.phase === 'setup' && <SetupScreen state={state} dispatch={dispatch} />}
        {(state.phase === 'question' || state.phase === 'reveal') && (
          <QuestionScreen
            key={state.questionIndex}
            state={state}
            dispatch={dispatch}
            question={question}
            questionCount={quiz.questions.length}
          />
        )}
        {state.phase === 'scoreboard' && (
          <ScoreboardScreen
            state={state}
            dispatch={dispatch}
            isLastQuestion={state.questionIndex + 1 >= quiz.questions.length}
          />
        )}
        {state.phase === 'podium' && <PodiumScreen state={state} dispatch={dispatch} />}
      </main>
    </div>
  );
}
