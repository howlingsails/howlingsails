// File: web-apps/cap10meetup/data.js
export function encryptEventData(data, password) {
  const plaintext = JSON.stringify(data);
  return CryptoJS.AES.encrypt(plaintext, password).toString();
}

export function decryptEventData(ciphertext, password) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) return null;
    return JSON.parse(decryptedText);
  } catch (e) {
    return null;
  }
}

export function saveEvents(events) {
  const encryptedEvents = {};
  for (let key in events) {
    const ev = events[key];
    encryptedEvents[key] = encryptEventData(ev, ev.password);
  }
  localStorage.setItem('cap10meetup_events', JSON.stringify(encryptedEvents));
  return encryptedEvents;
}

export function loadEncryptedEvents() {
  const stored = localStorage.getItem('cap10meetup_events');
  if (stored) {
    return JSON.parse(stored);
  }
  return {};
}
