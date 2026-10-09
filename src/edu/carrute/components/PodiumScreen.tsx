import { clsx } from 'clsx';
import type { ActionDispatch } from 'react';
import type { GameAction, GameState } from '../game';
import { rankTeams } from '../game';
import Button from './Button';

// Podium steps in visual order (2nd, 1st, 3rd), as indexes into the ranking.
const PODIUM_STEPS = [
  { rank: 1, height: 'h-32' },
  { rank: 0, height: 'h-44' },
  { rank: 2, height: 'h-24' },
] as const;

type PodiumScreenProps = Readonly<{
  state: GameState;
  dispatch: ActionDispatch<[GameAction]>;
}>;

export default function PodiumScreen({ state, dispatch }: PodiumScreenProps) {
  const ranking = rankTeams(state.teams);

  return (
    <section className='mx-auto flex w-full max-w-3xl flex-col gap-8'>
      <h1 className='text-primary text-center text-4xl font-bold'>Pódio</h1>

      <ol className='flex items-end justify-center gap-3'>
        {PODIUM_STEPS.map(({ rank, height }) => {
          const team = ranking[rank];
          if (!team) return null;
          return (
            <li key={team.id} className='flex w-1/3 max-w-48 flex-col items-center gap-2'>
              <span className='text-center text-xl font-bold break-words sm:text-2xl'>
                {team.name}
              </span>
              <span className='tabular-nums'>{team.score} pontos</span>
              <span
                className={clsx(
                  'flex w-full items-start justify-center rounded-t-lg pt-2 text-4xl font-bold text-white',
                  height,
                  team.position === 1 ? 'bg-choice-a' : 'bg-choice-b',
                )}
              >
                {team.position}º
              </span>
            </li>
          );
        })}
      </ol>

      {ranking.length > 3 && (
        <ol className='text-muted flex flex-col gap-1 text-lg'>
          {ranking.slice(3).map((team) => (
            <li key={team.id} className='flex justify-between'>
              <span>
                {team.position}º {team.name}
              </span>
              <span className='tabular-nums'>{team.score}</span>
            </li>
          ))}
        </ol>
      )}

      <Button className='self-center' onClick={() => dispatch({ type: 'restart' })}>
        Jogar novamente
      </Button>
    </section>
  );
}
