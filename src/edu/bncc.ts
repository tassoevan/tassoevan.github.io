/**
 * Structure of the Base Nacional Comum Curricular (BNCC) used to organize the natural sciences
 * contents. Official source: https://basenacionalcomum.mec.gov.br/
 *
 * This module only describes the BNCC *structure* (stages, grades, thematic units, specific
 * competencies and the skill code format). Skill texts are not transcribed here: each content
 * references skills by their official code.
 */

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

/** Elementary school grades in which the Ciências subject is taught (1st to 9th). */
export type ElementaryGrade = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09';

/**
 * Skill code of the Ciências subject in elementary school (Ensino Fundamental).
 * Format: EF + grade (2 digits) + CI + sequence (2 digits). E.g. `EF06CI01`.
 */
export type ElementarySkill = `EF${ElementaryGrade}CI${Digit}${Digit}`;

/** Specific competencies of the natural sciences area in high school (Ensino Médio). */
export type HighSchoolCompetency = '1' | '2' | '3';

/**
 * Skill code of the natural sciences area in high school (Ensino Médio).
 * Format: EM13 (1st to 3rd year) + CNT + specific competency (1 digit) + sequence (2 digits).
 * E.g. `EM13CNT101`.
 */
export type HighSchoolSkill = `EM13CNT${HighSchoolCompetency}${Digit}${Digit}`;

export type Skill = ElementarySkill | HighSchoolSkill;

export type Stage = 'EF' | 'EM';

export const STAGE_LABELS: Record<Stage, string> = {
  EF: 'Ensino Fundamental',
  EM: 'Ensino Médio',
};

/** Thematic units of the Ciências subject in elementary school. */
export type ThematicUnit = 'matter-and-energy' | 'life-and-evolution' | 'earth-and-universe';

export const THEMATIC_UNIT_LABELS: Record<ThematicUnit, string> = {
  'matter-and-energy': 'Matéria e Energia',
  'life-and-evolution': 'Vida e Evolução',
  'earth-and-universe': 'Terra e Universo',
};

/** Short labels for the high school specific competencies (not a replacement for the official text). */
export const HIGH_SCHOOL_COMPETENCY_LABELS: Record<HighSchoolCompetency, string> = {
  '1': 'Competência específica 1 — Matéria e energia',
  '2': 'Competência específica 2 — Vida, Terra e Cosmos',
  '3': 'Competência específica 3 — Investigação e aplicações da ciência e tecnologia',
};

export function getStage(skill: Skill): Stage {
  return skill.startsWith('EM') ? 'EM' : 'EF';
}

/** Elementary school grade of a skill (e.g. `EF06CI01` → `'06'`). */
export function getGrade(skill: ElementarySkill): ElementaryGrade {
  return skill.slice(2, 4) as ElementaryGrade;
}

/** Specific competency of a high school skill (e.g. `EM13CNT204` → `'2'`). */
export function getCompetency(skill: HighSchoolSkill): HighSchoolCompetency {
  return skill.charAt(7) as HighSchoolCompetency;
}

export function getGradeLabel(grade: ElementaryGrade): string {
  return `${Number(grade)}º ano`;
}
