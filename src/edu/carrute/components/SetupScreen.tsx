import type { ActionDispatch } from 'react';
import type { GameAction, GameState } from '../game';
import { MAX_TEAMS } from '../game';
import Button from './Button';

type SetupScreenProps = Readonly<{
  state: GameState;
  dispatch: ActionDispatch<[GameAction]>;
}>;

export default function SetupScreen({ state, dispatch }: SetupScreenProps) {
  return (
    <section className='mx-auto flex w-full max-w-xl flex-col gap-6'>
      <h1 className='text-primary text-3xl font-bold'>Equipes</h1>
      <p>
        Cada equipe precisa de cartões com as letras A, B, C e D. A cada pergunta, as equipes
        levantam o cartão da resposta escolhida, e quem conduz o jogo marca as que acertaram.
      </p>
      <p className='text-muted text-sm'>
        Use nomes de equipe, não nomes de estudantes. Nada do que é digitado aqui sai deste
        navegador.
      </p>

      <ul className='flex flex-col gap-2'>
        {state.teams.map((team) => (
          <li key={team.id} className='flex items-center gap-2'>
            <input
              aria-label='Nome da equipe'
              value={team.name}
              maxLength={30}
              onChange={(event) =>
                dispatch({ type: 'rename-team', id: team.id, name: event.target.value })
              }
              className='bg-surface focus-visible:outline-primary flex-1 rounded-lg border px-3 py-2 focus-visible:outline-2'
            />
            <Button
              variant='secondary'
              aria-label={`Remover ${team.name}`}
              disabled={state.teams.length <= 1}
              onClick={() => dispatch({ type: 'remove-team', id: team.id })}
            >
              Remover
            </Button>
          </li>
        ))}
      </ul>

      <div className='flex flex-wrap items-center justify-between gap-3'>
        <Button
          variant='secondary'
          disabled={state.teams.length >= MAX_TEAMS}
          onClick={() => dispatch({ type: 'add-team' })}
        >
          Adicionar equipe
        </Button>
        <Button onClick={() => dispatch({ type: 'start' })}>Começar</Button>
      </div>
    </section>
  );
}
