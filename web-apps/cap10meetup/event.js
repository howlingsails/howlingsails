// File: web-apps/cap10meetup/event.js
import { saveEvents, loadEncryptedEvents } from "./data.js";
import { AppState, setCurrentEvent } from "./state.js";
import { eventTemplates } from "./tech-meetup-data.js";

// Initialize events from storage
AppState.events = loadEncryptedEvents();

export function renderEventList() {
  const existingEventsDiv = document.getElementById('existing-events');
  existingEventsDiv.innerHTML = "";
  if (Object.keys(AppState.events).length === 0) {
    existingEventsDiv.innerHTML = "<p>No events available.</p>";
    return;
  }
  const ul = document.createElement('ul');
  for (let eventName in AppState.events) {
    const li = document.createElement('li');
    li.textContent = eventName;

    const joinBtn = document.createElement('button');
    joinBtn.textContent = "Join";
    joinBtn.className = "submit-button";
    joinBtn.style.marginLeft = "10px";
    joinBtn.onclick = () => setCurrentEventForLogin(eventName);
    li.appendChild(joinBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "submit-button";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = () => deleteEventFromList(eventName);
    li.appendChild(deleteBtn);

    ul.appendChild(li);
  }
  existingEventsDiv.appendChild(ul);
}

function setCurrentEventForLogin(eventName) {
  AppState.currentEventName = eventName;
  document.getElementById('event-list-section').style.display = "none";
  document.getElementById('event-login-section').style.display = "block";
  document.getElementById('login-event-name').textContent = eventName;
}

function deleteEventFromList(eventName) {
  if (!AppState.events[eventName]) {
    alert("Event does not exist.");
    return;
  }
  if (!confirm(`Delete "${eventName}"? This cannot be undone.`)) {
    return;
  }
  delete AppState.events[eventName];
  saveEvents(AppState.events);
  alert(`Event "${eventName}" deleted.`);
  renderEventList();
}


export function attachNewEventHandler() {
  const form = document.getElementById('create-event-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('new-event-name').value.trim();
    const password = document.getElementById('new-event-password').value;
    if (!name || !password) {
      alert("Event name and password are required.");
      return;
    }

    if (AppState.events[name]) {
      alert("An event with this name already exists.");
      return;
    }

    // Deep-copy the default event template
    const newEvent = JSON.parse(JSON.stringify(eventTemplates.defaultTechEvent));
    newEvent.password = password;

    AppState.events[name] = newEvent;
    AppState.events = saveEvents(AppState.events);

    form.reset();
    renderEventList();
  });
}

export function initEventModule() {
  attachNewEventHandler();
  renderEventList();
}
