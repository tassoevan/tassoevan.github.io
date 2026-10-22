// Deals the notes like a shuffled deck: every note shows up once before any of them repeats.
// The notes already read are remembered in the browser, by text, so adding or editing notes
// later simply puts the new ones in the deck.

const STORAGE_KEY = 'indi:seen-notes';

function readSeen(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function writeSeen(seen: readonly string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seen));
  } catch {
    // Without storage, the deck only lasts for this visit.
  }
}

let sessionSeen = readSeen();

export function drawNote(notes: readonly string[], current?: string): string {
  let seen = sessionSeen.filter((note) => notes.includes(note));
  let unseen = notes.filter((note) => !seen.includes(note));

  // Every note has been read: reshuffle, without repeating the one on screen.
  if (unseen.length === 0) {
    seen = [];
    unseen = notes.length > 1 ? notes.filter((note) => note !== current) : [...notes];
  }

  const note = unseen[Math.floor(Math.random() * unseen.length)];
  sessionSeen = [...seen, note];
  writeSeen(sessionSeen);
  return note;
}
