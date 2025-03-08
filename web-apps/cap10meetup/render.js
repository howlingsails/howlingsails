// File: web-apps/cap10meetup/render.js
export function renderAttendees(currentEvent) {
  const attendeesList = document.getElementById('attendees-list');
  attendeesList.innerHTML = "";
  if (!currentEvent.attendees || currentEvent.attendees.length === 0) {
    attendeesList.innerHTML = "<li>No attendees yet.</li>";
    return;
  }
  currentEvent.attendees.forEach(att => {
    const li = document.createElement('li');
    li.textContent = `${att.name} - ${att.email}${att.phone ? " - " + att.phone : ""}`;
    attendeesList.appendChild(li);
  });
}

export function renderDashboard(currentEvent) {
  const dashboardContent = document.getElementById('dashboard-content');
  dashboardContent.innerHTML = "";
  // Display total responses and attendees.
  const responsesCount = document.createElement('p');
  responsesCount.textContent = `Total Responses: ${currentEvent.responses.length}`;
  const attendeesCount = document.createElement('p');
  attendeesCount.textContent = `Total Attendees: ${currentEvent.attendees.length}`;
  dashboardContent.appendChild(responsesCount);
  dashboardContent.appendChild(attendeesCount);
  renderDashboardExtras();
}

function renderDashboardExtras() {
  const dashboardSection = document.getElementById('dashboard-section');
  const oldExtras = document.getElementById('dashboard-extras');
  if (oldExtras) oldExtras.remove();
  const dashboardExtras = document.createElement('div');
  dashboardExtras.id = "dashboard-extras";
  dashboardExtras.style.marginTop = "20px";
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete Event";
  deleteBtn.className = "submit-button";
  deleteBtn.style.marginRight = "10px";
  // These functions are attached to window in meetup.js
  deleteBtn.onclick = window.deleteCurrentEvent;
  dashboardExtras.appendChild(deleteBtn);
  const exportBtn = document.createElement('button');
  exportBtn.textContent = "Export Summary (YAML)";
  exportBtn.className = "submit-button";
  exportBtn.onclick = window.exportEventSummary;
  dashboardExtras.appendChild(exportBtn);
  dashboardSection.appendChild(dashboardExtras);
}

export function updateHeaderForEventMode(isEvent, eventName = "") {
  const header = document.querySelector("header");
  const tagline = header.querySelector(".tagline");
  if (isEvent) {
    tagline.textContent = `Event Mode: ${eventName} [PERSONAL MODE - STORED LOCAL ONLY ENCRYPTED]`;
  } else {
    tagline.textContent = "Who knows what you know? Let's share";
  }
}
