import { clsx } from 'clsx';
import type { ActionDispatch } from 'react';
import type { GameAction, GameState } from '../game';
import type { Question } from '../quiz';
import { CHOICE_LETTERS, DEFAULT_TIME_LIMIT_SECONDS } from '../quiz';
import Button from './Button';
import Countdown from './Countdown';

const CHOICE_COLORS = ['bg-choice-a', 'bg-choice-b', 'bg-choice-c', 'bg-choice-d'] as const;

type QuestionScreenProps = Readonly<{
  state: GameState;
  dispatch: ActionDispatch<[GameAction]>;
  question: Question;
  questionCount: number;
}>;

export default function QuestionScreen({
  state,
  dispatch,
  question,
  questionCount,
}: QuestionScreenProps) {
  const revealed = state.phase === 'reveal';

  return (
    <section className='flex flex-1 flex-col gap-6'>
      <div className='flex items-center justify-between gap-4'>
        <p className='text-muted text-lg'>
          Pergunta {state.questionIndex + 1} de {questionCount}
        </p>
        {!revealed && (
          <Countdown
            seconds={question.timeLimitSeconds ?? DEFAULT_TIME_LIMIT_SECONDS}
            onExpire={() => dispatch({ type: 'reveal' })}
          />
        )}
      </div>

      <h1 className='text-center text-3xl font-bold text-balance sm:text-5xl'>{question.prompt}</h1>

      <ol className='grid flex-1 gap-3 sm:grid-cols-2'>
        {question.choices.map((choice, index) => {
          const correct = index === question.answer;
          return (
            <li
              key={CHOICE_LETTERS[index]}
              className={clsx(
                'flex min-h-20 items-center gap-4 rounded-lg p-4 text-2xl font-semibold text-white transition-opacity sm:text-3xl',
                CHOICE_COLORS[index],
                revealed && !correct && 'opacity-30',
                revealed && correct && 'outline-foreground outline-4 outline-offset-4',
              )}
            >
              <span className='flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20'>
                {CHOICE_LETTERS[index]}
              </span>
              <span className='flex-1'>{choice}</span>
              {revealed && correct && <span className='sr-only'>(resposta correta)</span>}
            </li>
          );
        })}
      </ol>

      {revealed ? (
        <div className='flex flex-col gap-3'>
          <p className='text-lg font-semibold' id='correct-teams-label'>
            Quais equipes acertaram?
          </p>
          <div className='flex flex-wrap gap-2' role='group' aria-labelledby='correct-teams-label'>
            {state.teams.map((team) => {
              const pressed = state.correctTeamIds.includes(team.id);
              return (
                <Button
                  key={team.id}
                  variant='secondary'
                  aria-pressed={pressed}
                  onClick={() => dispatch({ type: 'toggle-team', id: team.id })}
                >
                  {pressed && '✓ '}
                  {team.name}
                </Button>
              );
            })}
          </div>
          <Button className='self-end' onClick={() => dispatch({ type: 'score' })}>
            Ver placar
          </Button>
        </div>
      ) : (
        <Button className='self-end' onClick={() => dispatch({ type: 'reveal' })}>
          Revelar resposta
        </Button>
      )}
    </section>
  );
}
