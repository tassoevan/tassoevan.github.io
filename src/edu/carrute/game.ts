export const POINTS_PER_CORRECT_ANSWER = 1000;
export const MAX_TEAMS = 8;

export type Team = { id: number; name: string; score: number };

export type Phase = 'setup' | 'question' | 'reveal' | 'scoreboard' | 'podium';

export type GameState = {
  phase: Phase;
  teams: readonly Team[];
  questionIndex: number;
  /** Teams marked as correct for the current question. */
  correctTeamIds: readonly number[];
};

export type GameAction =
  | { type: 'add-team' }
  | { type: 'remove-team'; id: number }
  | { type: 'rename-team'; id: number; name: string }
  | { type: 'start' }
  | { type: 'reveal' }
  | { type: 'toggle-team'; id: number }
  | { type: 'score' }
  | { type: 'next' }
  | { type: 'restart' };

export function createInitialState(): GameState {
  return {
    phase: 'setup',
    teams: [1, 2, 3, 4].map((id) => ({ id, name: `Equipe ${id}`, score: 0 })),
    questionIndex: 0,
    correctTeamIds: [],
  };
}

export function createGameReducer(questionCount: number) {
  return function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
      case 'add-team': {
        if (state.phase !== 'setup' || state.teams.length >= MAX_TEAMS) return state;
        const id = Math.max(0, ...state.teams.map((team) => team.id)) + 1;
        return { ...state, teams: [...state.teams, { id, name: `Equipe ${id}`, score: 0 }] };
      }

      case 'remove-team':
        if (state.phase !== 'setup' || state.teams.length <= 1) return state;
        return { ...state, teams: state.teams.filter((team) => team.id !== action.id) };

      case 'rename-team':
        if (state.phase !== 'setup') return state;
        return {
          ...state,
          teams: state.teams.map((team) =>
            team.id === action.id ? { ...team, name: action.name } : team,
          ),
        };

      case 'start':
        if (state.phase !== 'setup') return state;
        return {
          ...state,
          phase: 'question',
          teams: state.teams.map((team, index) => ({
            ...team,
            name: team.name.trim() || `Equipe ${index + 1}`,
            score: 0,
          })),
          questionIndex: 0,
          correctTeamIds: [],
        };

      case 'reveal':
        if (state.phase !== 'question') return state;
        return { ...state, phase: 'reveal' };

      case 'toggle-team':
        if (state.phase !== 'reveal') return state;
        return {
          ...state,
          correctTeamIds: state.correctTeamIds.includes(action.id)
            ? state.correctTeamIds.filter((id) => id !== action.id)
            : [...state.correctTeamIds, action.id],
        };

      case 'score':
        if (state.phase !== 'reveal') return state;
        return {
          ...state,
          phase: 'scoreboard',
          teams: state.teams.map((team) =>
            state.correctTeamIds.includes(team.id)
              ? { ...team, score: team.score + POINTS_PER_CORRECT_ANSWER }
              : team,
          ),
        };

      case 'next':
        if (state.phase !== 'scoreboard') return state;
        if (state.questionIndex + 1 >= questionCount) return { ...state, phase: 'podium' };
        return {
          ...state,
          phase: 'question',
          questionIndex: state.questionIndex + 1,
          correctTeamIds: [],
        };

      case 'restart':
        if (state.phase !== 'podium') return state;
        return { ...state, phase: 'setup', questionIndex: 0, correctTeamIds: [] };
    }
  };
}

export type RankedTeam = Team & { position: number };

/** Teams sorted by score, keeping the setup order on ties. Tied teams share the same position. */
export function rankTeams(teams: readonly Team[]): RankedTeam[] {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  return sorted.map((team) => ({
    ...team,
    position: sorted.findIndex((other) => other.score === team.score) + 1,
  }));
}
