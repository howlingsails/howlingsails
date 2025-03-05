// File: web-apps/cap10meetup/questions.js
export function renderShareInfoForm(currentEvent) {
  const shareInfoForm = document.getElementById('share-info-form');
  shareInfoForm.innerHTML = "";

  // "New Contact" button to clear the form.
  const clearButton = document.createElement('button');
  clearButton.type = "button";
  clearButton.textContent = "New Contact";
  clearButton.addEventListener('click', () => {
    shareInfoForm.reset();
    // Remove the draft response and flag.
    delete currentEvent.draftResponse;
    currentEvent.draftSaved = false;
    window.scrollTo(0, 0);
  });
  shareInfoForm.appendChild(clearButton);

  currentEvent.questions.forEach(q => {
    const div = document.createElement('div');
    div.className = "dynamic-question";
    const title = document.createElement('h3');
    title.textContent = q.prompt;
    div.appendChild(title);

    if (q.type === "contact") {
      // Only the name field is required.
      div.innerHTML += `
        <label>Name:</label>
        <input type="text" name="contact_name" required>
        <label>Email:</label>
        <input type="email" name="contact_email">
        <label>Phone:</label>
        <input type="text" name="contact_phone">
      `;
    } else if (q.type === "ranking") {
      const container = document.createElement('div');
      container.className = "ranking-container highlight-box";
      const headerRow = document.createElement('div');
      headerRow.className = "ranking-header";
      headerRow.innerHTML = `<span style="flex:1;">Skill</span>
                             <span style="flex:1; text-align:center;">Current</span>
                             <span style="flex:1; text-align:center;">Desired</span>`;
      container.appendChild(headerRow);
      q.options.forEach((opt, idx) => {
        const row = document.createElement('div');
        row.className = "ranking-row";
        const skillLabel = document.createElement('div');
        skillLabel.style.flex = "1";
        skillLabel.textContent = opt;

        const currentDiv = document.createElement('div');
        currentDiv.style.flex = "1";
        currentDiv.style.textAlign = "center";
        const currentInput = document.createElement('input');
        currentInput.type = "range";
        currentInput.min = "0";
        currentInput.max = "100";
        currentInput.value = "0";
        currentInput.name = `${q.id}_current_${idx}`;
        const currentValueDisplay = document.createElement('span');
        currentValueDisplay.textContent = currentInput.value;
        currentInput.oninput = function () {
          currentValueDisplay.textContent = currentInput.value;
        };
        currentDiv.appendChild(currentInput);
        currentDiv.appendChild(document.createElement('br'));
        currentDiv.appendChild(currentValueDisplay);

        const desiredDiv = document.createElement('div');
        desiredDiv.style.flex = "1";
        desiredDiv.style.textAlign = "center";
        const desiredInput = document.createElement('input');
        desiredInput.type = "range";
        desiredInput.min = "0";
        desiredInput.max = "100";
        desiredInput.value = "0";
        desiredInput.name = `${q.id}_desired_${idx}`;
        const desiredValueDisplay = document.createElement('span');
        desiredValueDisplay.textContent = desiredInput.value;
        desiredInput.oninput = function () {
          desiredValueDisplay.textContent = desiredInput.value;
        };
        desiredDiv.appendChild(desiredInput);
        desiredDiv.appendChild(document.createElement('br'));
        desiredDiv.appendChild(desiredValueDisplay);

        row.appendChild(skillLabel);
        row.appendChild(currentDiv);
        row.appendChild(desiredDiv);
        container.appendChild(row);
      });
      const addOptBtn = document.createElement('button');
      addOptBtn.type = "button";
      addOptBtn.textContent = "Add Skill";
      addOptBtn.onclick = () => {
        const newOpt = prompt("Enter new skill:");
        if (newOpt) {
          q.options.push(newOpt);
          renderShareInfoForm(currentEvent);
        }
      };
      container.appendChild(addOptBtn);
      div.appendChild(container);
    } else if (q.type === "checklist") {
      // Render each option with a slider (0-100) next to it.
      const container = document.createElement('div');
      container.className = "dynamic-options";
      q.options.forEach((opt, idx) => {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = "8px";
        const label = document.createElement('label');
        label.textContent = opt + ": ";
        wrapper.appendChild(label);

        const slider = document.createElement('input');
        slider.type = "range";
        slider.min = "0";
        slider.max = "100";
        slider.value = "0";
        slider.name = `${q.id}_slider_${idx}`;
        wrapper.appendChild(slider);

        const sliderValue = document.createElement('span');
        sliderValue.textContent = slider.value;
        slider.addEventListener('input', () => {
          sliderValue.textContent = slider.value;
        });
        wrapper.appendChild(sliderValue);
        container.appendChild(wrapper);
      });
      const addOptBtn = document.createElement('button');
      addOptBtn.type = "button";
      addOptBtn.textContent = "Add Option";
      addOptBtn.onclick = () => {
        const newOpt = prompt("Enter new option:");
        if (newOpt) {
          q.options.push(newOpt);
          renderShareInfoForm(currentEvent);
        }
      };
      container.appendChild(addOptBtn);
      div.appendChild(container);
    } else if (q.type === "phrase") {
      const textarea = document.createElement('textarea');
      textarea.name = q.id;
      textarea.rows = 3;
      textarea.placeholder = "Enter your response here...";
      div.appendChild(textarea);
    }
    shareInfoForm.appendChild(div);
  });
  // Always scroll to the top after rendering the form.
  window.scrollTo(0, 0);
}

/**
 * Instead of using a submit button, we auto-save on any change.
 * This function attaches a change event listener to the form.
 */
export function attachShareInfoFormHandler(currentEvent, events, currentEventName, saveEvents, renderAttendees, renderShareInfoForm) {
  const shareInfoForm = document.getElementById('share-info-form');

  function autoSaveResponse() {
    const formData = new FormData(shareInfoForm);
    const response = {};
    currentEvent.questions.forEach(q => {
      if (q.type === "contact") {
        response[q.id] = {
          name: formData.get("contact_name"),
          email: formData.get("contact_email"),
          phone: formData.get("contact_phone")
        };
      } else if (q.type === "ranking") {
        const rankings = [];
        q.options.forEach((opt, idx) => {
          const current = formData.get(`${q.id}_current_${idx}`);
          const desired = formData.get(`${q.id}_desired_${idx}`);
          rankings.push({ skill: opt, current: Number(current), desired: Number(desired) });
        });
        response[q.id] = rankings;
      } else if (q.type === "checklist") {
        // Retrieve slider values as percentage strings.
        const sliderValues = [];
        q.options.forEach((opt, idx) => {
          const sliderVal = formData.get(`${q.id}_slider_${idx}`);
          sliderValues.push({ option: opt, percentage: sliderVal + "%" });
        });
        response[q.id] = sliderValues;
      } else if (q.type === "phrase") {
        response[q.id] = formData.get(q.id);
      }
    });
    response.timestamp = new Date().toISOString();
    // Save as a draft response.
    currentEvent.draftResponse = response;

    // Update the contacts list:
    // If the "contact_info" has a non-empty name, update the draft contact.
    if (response.contact_info && response.contact_info.name) {
      if (currentEvent.draftSaved) {
        // Update the last contact in the attendees array.
        currentEvent.attendees[currentEvent.attendees.length - 1] = response.contact_info;
      } else {
        currentEvent.attendees.push(response.contact_info);
        currentEvent.draftSaved = true;
      }
    }
    events[currentEventName] = currentEvent;
    events = saveEvents(events);
    renderAttendees(currentEvent);
  }

  // Attach auto-save on every change.
  shareInfoForm.addEventListener('change', autoSaveResponse);
}
