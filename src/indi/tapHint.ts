// Remembers, in the browser, that she has already discovered she can tap the characters.

const STORAGE_KEY = 'indi:tapped';

export function hasTapped() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'yes';
  } catch {
    return false;
  }
}

export function rememberTap() {
  try {
    localStorage.setItem(STORAGE_KEY, 'yes');
  } catch {
    // Without storage, the hints come back on the next visit, which is harmless.
  }
}
