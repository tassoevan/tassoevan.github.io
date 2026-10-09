import type { Skill } from '../bncc';

export type Question = {
  prompt: string;
  /** Two to four choices, shown with the letters A, B, C and D. */
  choices: readonly [string, string] | readonly [string, string, string, string];
  /** Index of the correct choice. */
  answer: 0 | 1 | 2 | 3;
  /** Defaults to `DEFAULT_TIME_LIMIT_SECONDS`. */
  timeLimitSeconds?: number;
  /** BNCC skills addressed by the question, only when confirmed by the teacher. */
  skills?: readonly Skill[];
};

export type Quiz = {
  title: string;
  /** Marks a placeholder quiz that must be replaced by the teacher's questions. */
  draft?: boolean;
  questions: readonly [Question, ...Question[]];
};

export const DEFAULT_TIME_LIMIT_SECONDS = 20;

export const CHOICE_LETTERS = ['A', 'B', 'C', 'D'] as const;

// Placeholder quiz: replace it with the teacher's questions.
export const QUIZ: Quiz = {
  title: 'Quiz de exemplo',
  draft: true,
  questions: [
    {
      prompt: 'Em qual organela da célula vegetal ocorre a fotossíntese?',
      choices: ['Mitocôndria', 'Cloroplasto', 'Ribossomo', 'Núcleo'],
      answer: 1,
    },
    {
      prompt: 'Qual é o planeta mais próximo do Sol?',
      choices: ['Vênus', 'Terra', 'Mercúrio', 'Marte'],
      answer: 2,
    },
    {
      prompt: 'Em que estado físico a água pura se encontra a 25 °C, ao nível do mar?',
      choices: ['Sólido', 'Líquido', 'Gasoso', 'Plasma'],
      answer: 1,
    },
    {
      prompt: 'O som se propaga no vácuo.',
      choices: ['Verdadeiro', 'Falso'],
      answer: 1,
    },
  ],
};
