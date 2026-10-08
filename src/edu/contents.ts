import type { ElementarySkill, HighSchoolSkill, ThematicUnit } from './bncc';

export type ContentType = 'slides' | 'activity' | 'experiment' | 'lesson-plan' | 'text' | 'video';

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  slides: 'Apresentação',
  activity: 'Atividade',
  experiment: 'Experimento',
  'lesson-plan': 'Plano de aula',
  text: 'Texto',
  video: 'Vídeo',
};

type BaseContent = {
  /** Unique identifier, in kebab-case and without accents. */
  slug: string;
  title: string;
  /** One or two sentences, in Portuguese, about what students will learn or do. */
  summary: string;
  type: ContentType;
  /** Link to the material (slides, document, video etc.). */
  url: string;
  /** Publication date in the YYYY-MM-DD format. */
  publishedAt: string;
};

export type ElementaryContent = BaseContent & {
  stage: 'EF';
  thematicUnit: ThematicUnit;
  /** At least one BNCC skill, all from the same grade. */
  skills: readonly [ElementarySkill, ...ElementarySkill[]];
};

export type HighSchoolContent = BaseContent & {
  stage: 'EM';
  /** At least one BNCC skill. */
  skills: readonly [HighSchoolSkill, ...HighSchoolSkill[]];
};

export type Content = ElementaryContent | HighSchoolContent;

/**
 * Catalog of contents published at /edu/.
 *
 * To add a content, append an object to this array. Example:
 *
 * {
 *   slug: 'misturas-homogeneas-e-heterogeneas',
 *   title: 'Misturas homogêneas e heterogêneas',
 *   summary: 'Classificar misturas do cotidiano a partir de observações em sala.',
 *   type: 'experiment',
 *   url: 'https://…',
 *   publishedAt: '2026-10-08',
 *   stage: 'EF',
 *   thematicUnit: 'matter-and-energy',
 *   skills: ['EF06CI01'],
 * }
 */
export const CONTENTS: readonly Content[] = [];
