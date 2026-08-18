const KEY = 'si-game-used-v2'

export function loadUsed() {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveUsed(used) {
  try {
    localStorage.setItem(KEY, JSON.stringify(used))
  } catch {
    /* приватный режим — просто не сохраняем */
  }
}
