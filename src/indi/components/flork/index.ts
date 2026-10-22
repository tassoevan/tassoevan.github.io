// The family, drawn in the Flork style. Each character is its own component on top of a shared
// body (Flork.tsx), with faces in face.tsx and the things they hold in items.tsx.

export type Kid = 'jojo' | 'nana' | 'lolo';
export type Character = 'tasso' | 'indi' | Kid;

export type { Outfit } from './clothes';
export type { Eyes, Mouth } from './face';
export type { Arms, Pose } from './Flork';
export type { Item } from './items';

export { default as Indi } from './Indi';
export { default as Jojo } from './Jojo';
export { default as Lolo } from './Lolo';
export { default as Nana } from './Nana';
export { default as Tasso } from './Tasso';
