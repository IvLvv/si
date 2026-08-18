const USED_KEY = 'si-game-used-v2'
const SCORE_KEY = 'si-game-score-v1'

export function loadUsed() {
  try {
    const parsed = JSON.parse(localStorage.getItem(USED_KEY))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveUsed(used) {
  try {
    localStorage.setItem(USED_KEY, JSON.stringify(used))
  } catch {
    /* приватный режим — просто не сохраняем */
  }
}

export function loadScore() {
  const n = Number(localStorage.getItem(SCORE_KEY))
  return Number.isFinite(n) ? n : 0
}

export function saveScore(score) {
  try {
    localStorage.setItem(SCORE_KEY, String(score))
  } catch {
    /* no-op */
  }
}
