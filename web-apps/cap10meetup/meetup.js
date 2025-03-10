// meetup.js: Improved Initialization and Flow Handling
import { getCurrentOwnerSettings, decryptEventData, saveEvents } from "./data.js";
import { AppState, setCurrentEvent, clearCurrentEvent } from "./state.js";
import { throttle, formatOwnerContact, copyToClipboard, shareContact } from "./utils.js";
import { renderAttendees, renderDashboard, updateBreadcrumbs, updateHeaderForEventMode } from "./render.js";
import { renderShareInfoForm, attachShareInfoFormHandler } from "./questions.js";
import { initEventModule } from "./event.js";

document.addEventListener('DOMContentLoaded', () => {
  initEventModule();
  loadOwnerInfo();
  setupOwnerInfoHandlers();
  setupBreadcrumbs();

  document.getElementById('event-login-form').addEventListener('submit', handleEventLogin);
  document.getElementById('back-to-event-list').onclick = backToEventList;

  setupEventMenuHandlers();
});

function loadOwnerInfo() {
  const info = JSON.parse(localStorage.getItem('cap10meetup_owner_info')) || {};
  ['name', 'what', 'web', 'email', 'phone'].forEach(field => {
    document.getElementById(`owner-${field}`).value = info[field] || '';
  });
}

const saveOwnerInfoThrottled = throttle(() => {
  const ownerInfo = {};
  ['name', 'what', 'web', 'email', 'phone'].forEach(field => {
    ownerInfo[field] = document.getElementById(`owner-${field}`).value.trim();
  });
  localStorage.setItem('cap10meetup_owner_info', JSON.stringify(ownerInfo));
  showFeedback("Owner info saved.");
}, 1000);

function setupOwnerInfoHandlers() {
  ['name', 'what', 'web', 'email', 'phone'].forEach(field => {
    document.getElementById(`owner-${field}`).addEventListener('input', saveOwnerInfoThrottled);
  });

  document.getElementById('copy-owner-info').onclick = () => {
    const ownerInfo = getOwnerInfo();
    copyToClipboard(formatOwnerContact(ownerInfo), "Contact info copied!");
  };

  document.getElementById('share-owner-info').onclick = () => {
    const ownerInfo = getOwnerInfo();
    shareContact(formatOwnerContact(ownerInfo), `${ownerInfo.name || "My"} Contact Info`);
  };
}

function getOwnerInfo() {
  return ['name', 'what', 'web', 'email', 'phone'].reduce((info, field) => {
    info[field] = document.getElementById(`owner-${field}`).value.trim();
    return info;
  }, {});
}

function handleEventLogin(e) {
  e.preventDefault();
  const inputPassword = document.getElementById('event-login-password').value;
  const encryptedData = AppState.events[AppState.currentEventName];
  const decrypted = decryptEventData(encryptedData, inputPassword);

  if (decrypted) {
    setCurrentEvent(AppState.currentEventName, decrypted);
    transitionToEventView();
  } else {
    alert("Incorrect password. Try again.");
  }
}

function transitionToEventView() {
  document.getElementById('event-login-section').style.display = "none";
  document.getElementById('owner-info-section').style.display = "none";
  document.getElementById('event-view-section').style.display = "block";

  // Read the current owner settings and update the current event if needed
  const ownerInfo = getCurrentOwnerSettings();
  AppState.currentEvent.ownerInfo = ownerInfo;

  renderShareInfoForm(AppState.currentEvent);
  attachShareInfoFormHandler(AppState.currentEvent);
  renderAttendees(AppState.currentEvent);
  updateHeaderForEventMode(true, AppState.currentEventName);
  updateBreadcrumbs(["Events", AppState.currentEventName]);
  fillOwnerIntro();
}

function backToEventList() {
  clearCurrentEvent();
  document.getElementById('event-login-section').style.display = "none";
  document.getElementById('owner-info-section').style.display = "block"; // Restore owner-info visibility
  document.getElementById('event-list-section').style.display = "block";
  updateBreadcrumbs(["Events"]);
}

function setupEventMenuHandlers() {
  document.getElementById('menu-share-info').onclick = () => toggleEventView('share-info');
  document.getElementById('menu-dashboard').onclick = handleDashboardView;
  document.getElementById('menu-logout').onclick = logoutEvent;
}

function toggleEventView(view) {
  ['share-info', 'dashboard'].forEach(section => {
    document.getElementById(`${section}-section`).style.display = (section === view) ? "block" : "none";
  });
}

function handleDashboardView() {
  const passwordPrompt = prompt("Enter event password:");
  if (passwordPrompt !== AppState.currentEvent.password) {
    alert("Incorrect password.");
    return;
  }
  toggleEventView('dashboard');
  renderDashboard(AppState.currentEvent);
}

function logoutEvent() {
  AppState.events[AppState.currentEventName] = AppState.currentEvent;
  saveEvents(AppState.events);
  clearCurrentEvent();
  document.getElementById('event-view-section').style.display = "none";
  document.getElementById('owner-info-section').style.display = "block"; // Show owner info again
  document.getElementById('event-list-section').style.display = "block";
  updateHeaderForEventMode(false);
  updateBreadcrumbs(["Events"]);
}

function showFeedback(msg) {
  const feedback = document.getElementById('feedback');
  feedback.textContent = msg;
  feedback.style.display = "block";
  setTimeout(() => feedback.style.display = "none", 3000);
}

function setupBreadcrumbs() {
  updateBreadcrumbs(["Events"]);
}


function fillOwnerIntro() {
  // Get the current owner info from localStorage
  const ownerInfo = JSON.parse(localStorage.getItem('cap10meetup_owner_info')) || {};

  // Find the first paragraph in the share-info-section article
  const introPara = document.querySelector('#share-info-section article p');

  if (introPara) {
    // Update the inner HTML using ownerInfo values (with fallbacks)
    introPara.innerHTML = `
      Hi there! I’m <strong>${ownerInfo.name || "[Your Name]"}</strong>—and here's a bit about me:
      <em>${ownerInfo.what || "[Share something unique]"}</em>.
    `;
  }
}