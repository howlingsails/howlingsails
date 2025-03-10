// questions.js: Dynamic question rendering and autosave functionality
import { saveEvents } from "./data.js";
import { AppState } from "./state.js";
import { throttle } from "./utils.js";
import { renderAttendees } from "./render.js";

export function renderShareInfoForm(currentEvent) {
  const form = document.getElementById('share-info-form');
  form.innerHTML = "";

  currentEvent.questions.forEach(q => {
    const div = document.createElement('div');
    div.className = "dynamic-question";
    div.innerHTML = `<h3>${q.prompt}</h3>`;

    if (q.type === "contact") {
      div.innerHTML += `
        <label>Name:</label><input type="text" name="contact_name" required>
        <label>Info:</label><input type="text" name="contact_what">
        <label>Web:</label><input type="text" name="contact_web">
        <label>Email:</label><input type="email" name="contact_email">
        <label>Phone:</label><input type="text" name="contact_phone">`;
    }
    else if (q.type === "phrase") {
      div.innerHTML += `<textarea name="${q.id}" rows="5"></textarea>`;
    }
    else if (q.type === "ranking") {
      const rankingContainer = document.createElement('div');
      rankingContainer.className = "ranking-container";

      const header = document.createElement('div');
      header.className = "ranking-header";
      header.innerHTML = `
        <span style="flex:1;">Skill</span>
        <span style="flex:1; text-align:center;">Current</span>
        <span style="flex:1; text-align:center;">Desired</span>`;
      rankingContainer.appendChild(header);

      q.options.forEach((skill, idx) => {
        const row = document.createElement('div');
        row.className = "ranking-row";
        row.innerHTML = `
          <span style="flex:1;">${skill}</span>
          <input type="range" name="${q.id}_current_${idx}" min="0" max="100" value="0" style="flex:1;">
          <input type="range" name="${q.id}_desired_${idx}" min="0" max="100" value="0" style="flex:1;">`;
        rankingContainer.appendChild(row);
      });

      div.appendChild(rankingContainer);
    }
    else if (q.type === "checklist") {
      const checklistContainer = document.createElement('div');
      checklistContainer.className = "dynamic-options";

      q.options.forEach((option, idx) => {
        const optionDiv = document.createElement('div');
        optionDiv.innerHTML = `
          <label>
            <input type="checkbox" name="${q.id}" value="${option}"> ${option}
          </label>`;
        checklistContainer.appendChild(optionDiv);
      });

      div.appendChild(checklistContainer);
    }

    form.appendChild(div);
  });

  attachShareInfoFormHandler(currentEvent);
}

const autoSaveResponseThrottled = throttle((currentEvent) => {
  const formData = new FormData(document.getElementById('share-info-form'));
  const response = { timestamp: new Date().toISOString() };

  currentEvent.questions.forEach(q => {
    if (q.type === "contact") {
      response[q.id] = ['name', 'what', 'web', 'email', 'phone'].reduce((data, field) => {
        data[field] = formData.get(`contact_${field}`) || "";
        return data;
      }, {});
    } else if (q.type === "phrase") {
      response[q.id] = formData.get(q.id) || "";
    }
    // Include original handling for other question types
  });

  currentEvent.responses.push(response);
  saveEvents(AppState.events);
  renderAttendees(currentEvent);
}, 1000);

export function attachShareInfoFormHandler(currentEvent) {
  document.getElementById('share-info-form').addEventListener('input', () => {
    autoSaveResponseThrottled(currentEvent);
  });
}
