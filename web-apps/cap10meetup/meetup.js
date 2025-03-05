// File: web-apps/cap10meetup/meetup.js
import { encryptEventData, decryptEventData, saveEvents, loadEncryptedEvents } from "./data.js";
import { renderAttendees, renderDashboard, updateHeaderForEventMode } from "./render.js";
import { renderShareInfoForm, attachShareInfoFormHandler } from "./questions.js";
import { initEventModule, events as eventsModule, deleteEventFromList } from "./event.js";

// Global variable for the current (decrypted) event.
let currentEvent = null;
// We use a global variable (attached to window) for the current event name.
window.currentEventName = "";

// Wrap all initialization after the DOM is loaded.
document.addEventListener('DOMContentLoaded', () => {

  // Initialize the new-event module (this sets up new event creation and renders the list)
  initEventModule();

  // Load the saved owner info (from localStorage) into the owner info form.
  function loadOwnerInfo() {
    const storedOwnerInfo = JSON.parse(localStorage.getItem('cap10meetup_owner_info')) || {};
    document.getElementById('owner-name').value = storedOwnerInfo.name || '';
    document.getElementById('owner-email').value = storedOwnerInfo.email || '';
    document.getElementById('owner-phone').value = storedOwnerInfo.phone || '';
  }
  loadOwnerInfo();

  // Save owner info to localStorage when inputs change.
  function saveOwnerInfo() {
    const ownerInfo = {
      name: document.getElementById('owner-name').value.trim(),
      email: document.getElementById('owner-email').value.trim(),
      phone: document.getElementById('owner-phone').value.trim()
    };
    localStorage.setItem('cap10meetup_owner_info', JSON.stringify(ownerInfo));
    console.log("Owner contact info saved.");
  }
  document.getElementById('owner-name').addEventListener('change', saveOwnerInfo);
  document.getElementById('owner-email').addEventListener('change', saveOwnerInfo);
  document.getElementById('owner-phone').addEventListener('change', saveOwnerInfo);

  // Attach event listeners for owner info copy/share buttons.
  // (These functions are defined later in this file and attached to window.)
  document.getElementById('copy-owner-info').addEventListener('click', copyOwnerInfo);
  document.getElementById('share-owner-info').addEventListener('click', shareOwnerInfo);

  // ----------- Event Login -----------
  const eventLoginSection = document.getElementById('event-login-section');
  const eventLoginForm = document.getElementById('event-login-form');
  const backToEventListBtn = document.getElementById('back-to-event-list');

  eventLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputPassword = document.getElementById('event-login-password').value;
    const encryptedData = eventsModule[window.currentEventName];
    const decrypted = decryptEventData(encryptedData, inputPassword);
    if (decrypted) {
      currentEvent = decrypted;
      eventLoginSection.style.display = "none";
      document.getElementById('event-view-section').style.display = "block";
      renderShareInfoForm(currentEvent);
      // Attach the share info form submission handler.
      attachShareInfoFormHandler(currentEvent, eventsModule, window.currentEventName, saveEvents, renderAttendees, renderShareInfoForm);
      renderAttendees(currentEvent);
      renderOwnerInfoForm();
      updateHeaderForEventMode(true, window.currentEventName);
      hideOwnerInfoSection();
    } else {
      alert("Incorrect password. Please try again.");
    }
  });

  backToEventListBtn.addEventListener('click', () => {
    eventLoginSection.style.display = "none";
    document.getElementById('event-list-section').style.display = "block";
  });

  // ----------- Event View Navigation -----------
  const menuShareInfo = document.getElementById('menu-share-info');
  const menuDashboard = document.getElementById('menu-dashboard');
  const menuLogout = document.getElementById('menu-logout');
  const shareInfoSection = document.getElementById('share-info-section');
  const dashboardSection = document.getElementById('dashboard-section');

  menuShareInfo.addEventListener('click', () => {
    shareInfoSection.style.display = "block";
    dashboardSection.style.display = "none";
  });

  menuDashboard.addEventListener('click', () => {
    const p = prompt("Enter event password to view the dashboard:");
    if (p !== currentEvent.password) {
      alert("Incorrect password. Cannot access dashboard.");
      return;
    }
    shareInfoSection.style.display = "none";
    dashboardSection.style.display = "block";
    renderDashboard(currentEvent);
  });

  menuLogout.addEventListener('click', () => {
    // Save owner info into currentEvent before logout.
    currentEvent.ownerInfo = {
      name: document.getElementById('owner-name').value.trim(),
      email: document.getElementById('owner-email').value.trim(),
      phone: document.getElementById('owner-phone').value.trim()
    };
    eventsModule[window.currentEventName] = currentEvent;
    saveEvents(eventsModule);
    document.getElementById('event-view-section').style.display = "none";
    document.getElementById('event-list-section').style.display = "block";
    currentEvent = null;
    window.currentEventName = "";
    updateHeaderForEventMode(false);
  });

  // ----------- Dashboard Global Functions -----------
  window.deleteCurrentEvent = function() {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      deleteEventFromList(window.currentEventName);
      alert("Event deleted.");
      document.getElementById('event-view-section').style.display = "none";
      document.getElementById('event-list-section').style.display = "block";
      currentEvent = null;
      window.currentEventName = "";
      updateHeaderForEventMode(false);
    }
  };

  window.exportEventSummary = function() {
    const summary = {
      title: window.currentEventName,
      totalResponses: currentEvent.responses.length,
      totalAttendees: currentEvent.attendees.length,
      aggregatedRanking: {},
      aggregatedChecklist: {}
    };
    currentEvent.questions.filter(q => q.type === "ranking").forEach(q => {
      q.options.forEach((opt, idx) => {
        let sumCurrent = 0, sumDesired = 0, count = 0;
        currentEvent.responses.forEach(r => {
          if (r[q.id] && r[q.id][idx]) {
            sumCurrent += r[q.id][idx].current;
            sumDesired += r[q.id][idx].desired;
            count++;
          }
        });
        summary.aggregatedRanking[opt] = {
          avgCurrent: count ? (sumCurrent / count).toFixed(1) : "N/A",
          avgDesired: count ? (sumDesired / count).toFixed(1) : "N/A"
        };
      });
    });
    currentEvent.questions.filter(q => q.type === "checklist").forEach(q => {
      const counts = {};
      q.options.forEach(opt => counts[opt] = 0);
      currentEvent.responses.forEach(r => {
        if (r[q.id]) {
          r[q.id].forEach(val => {
            if (counts[val] !== undefined) counts[val]++;
          });
        }
      });
      summary.aggregatedChecklist[q.prompt] = counts;
    });
    const yamlText = jsyaml.dump(summary);
    const blob = new Blob([yamlText], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${window.currentEventName}-summary.yaml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ----------- Owner Info Helper Functions -----------
  function renderOwnerInfoForm() {
    if (currentEvent && currentEvent.ownerInfo) {
      document.getElementById('owner-name').value = currentEvent.ownerInfo.name || "";
      document.getElementById('owner-email').value = currentEvent.ownerInfo.email || "";
      document.getElementById('owner-phone').value = currentEvent.ownerInfo.phone || "";
    }
  }

  function hideOwnerInfoSection() {
    document.getElementById('owner-info-section').style.display = "none";
  }

  // ----------- Global Owner Info Functions (copy/share) -----------
  function copyOwnerInfo() {
    const ownerName = document.getElementById('owner-name').value.trim() || "Your";
    const ownerInfo = {
      name: document.getElementById('owner-name').value.trim(),
      email: document.getElementById('owner-email').value.trim(),
      phone: document.getElementById('owner-phone').value.trim()
    };
    if (!ownerInfo.name && !ownerInfo.email && !ownerInfo.phone) {
      alert("No contact info available to copy.");
      return;
    }
    const formattedText =
`📌 ${ownerName}'s Contact Info:
👤 Name: ${ownerInfo.name || "(Not Provided)"}
📧 Email: ${ownerInfo.email || "(Not Provided)"}
📞 Phone: ${ownerInfo.phone || "(Not Provided)"}

🔹 It's Who know what you know, just who you know.
🔗 Brought to you by https://cap10.tech`;
    navigator.clipboard.writeText(formattedText)
      .then(() => alert(`${ownerName}'s contact info copied to clipboard!`))
      .catch(() => {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = formattedText;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
        alert(`${ownerName}'s contact info copied to clipboard!`);
      });
  }

  function shareOwnerInfo() {
    const ownerName = document.getElementById('owner-name').value.trim() || "Your";
    const ownerInfo = {
      name: document.getElementById('owner-name').value.trim(),
      email: document.getElementById('owner-email').value.trim(),
      phone: document.getElementById('owner-phone').value.trim()
    };
    if (!ownerInfo.name && !ownerInfo.email && !ownerInfo.phone) {
      alert("No contact info available to share.");
      return;
    }
    const formattedText =
`📌 ${ownerName}'s Contact Info:
👤 Name: ${ownerInfo.name || "(Not Provided)"}
📧 Email: ${ownerInfo.email || "(Not Provided)"}
📞 Phone: ${ownerInfo.phone || "(Not Provided)"}

🔹 It's Who know what you know, just who you know.
🔗 Brought to you by https://cap10.tech`;
    if (navigator.share) {
      navigator.share({ title: `${ownerName}'s Contact Info`, text: formattedText })
        .catch(err => {
          console.error("Error sharing:", err);
          alert("Sharing failed.");
        });
    } else {
      alert("Web Share API not supported on this browser.");
    }
  }
  window.copyOwnerInfo = copyOwnerInfo;
  window.shareOwnerInfo = shareOwnerInfo;
});
