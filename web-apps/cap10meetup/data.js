// data.js: handles event data encryption/decryption & storage.

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
    console.error("Decryption failed:", e);
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
  return stored ? JSON.parse(stored) : {};
}


// data.js: Add helper to read current owner settings

export function getCurrentOwnerSettings() {
  // Read the current owner info from localStorage (set by meetup.js)
  return JSON.parse(localStorage.getItem('cap10meetup_owner_info')) || {};
}
