// render.js: Handles UI rendering logic clearly

export function renderAttendees(event) {
  const list = document.getElementById('attendees-list');
  list.innerHTML = event.attendees.length ? event.attendees.map(a => `<li>${a.name} - ${a.email}</li>`).join('') : "<li>No attendees yet.</li>";
}

export function renderDashboard(event) {
  const dashboard = document.getElementById('dashboard-content');
  dashboard.innerHTML = `
    <p>Total Responses: ${event.responses.length}</p>
    <p>Total Attendees: ${event.attendees.length}</p>`;
}

export function updateHeaderForEventMode(active, eventName = "") {
  document.querySelector("header .tagline").textContent = active ? `Event Mode: ${eventName}` : "Who knows what you know?";
}

export function updateBreadcrumbs(path = []) {
  const breadcrumbDiv = document.getElementById('breadcrumbs');
  breadcrumbDiv.innerHTML = path.map((p) => `<span>${p}</span>`).join(" &rsaquo; ");
}
