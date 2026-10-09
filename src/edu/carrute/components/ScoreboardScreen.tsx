import type { ActionDispatch } from 'react';
import type { GameAction, GameState } from '../game';
import { POINTS_PER_CORRECT_ANSWER, rankTeams } from '../game';
import Button from './Button';

type ScoreboardScreenProps = Readonly<{
  state: GameState;
  dispatch: ActionDispatch<[GameAction]>;
  isLastQuestion: boolean;
}>;

export default function ScoreboardScreen({
  state,
  dispatch,
  isLastQuestion,
}: ScoreboardScreenProps) {
  return (
    <section className='mx-auto flex w-full max-w-2xl flex-col gap-6'>
      <h1 className='text-primary text-center text-4xl font-bold'>Placar</h1>
      <ol className='flex flex-col gap-2'>
        {rankTeams(state.teams).map((team) => (
          <li
            key={team.id}
            className='bg-surface flex items-center gap-4 rounded-lg px-4 py-3 text-2xl'
          >
            <span className='text-muted w-8 font-bold'>{team.position}º</span>
            <span className='flex-1 font-semibold'>{team.name}</span>
            {state.correctTeamIds.includes(team.id) && (
              <span className='text-accent text-lg font-semibold'>
                +{POINTS_PER_CORRECT_ANSWER}
              </span>
            )}
            <span className='font-bold tabular-nums'>{team.score}</span>
          </li>
        ))}
      </ol>
      <Button className='self-end' onClick={() => dispatch({ type: 'next' })}>
        {isLastQuestion ? 'Ver pódio' : 'Próxima pergunta'}
      </Button>
    </section>
  );
}
