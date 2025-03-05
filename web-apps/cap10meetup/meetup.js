// Global Variables
let events = loadEncryptedEvents();
let currentEvent = null; // currently loaded event (decrypted object)
let currentEventName = ""; // key for the event

// ------------------------
// Utility Functions
// ------------------------

function encryptEventData(data, password) {
  const plaintext = JSON.stringify(data);
  return CryptoJS.AES.encrypt(plaintext, password).toString();
}

function decryptEventData(ciphertext, password) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) return null;
    return JSON.parse(decryptedText);
  } catch (e) {
    return null;
  }
}

function saveEvents() {
  const encryptedEvents = {};
  for (let key in events) {
    const ev = events[key];
    encryptedEvents[key] = encryptEventData(ev, ev.password);
  }
  localStorage.setItem('cap10meetup_events', JSON.stringify(encryptedEvents));
  events = encryptedEvents;
}

function loadEncryptedEvents() {
  const stored = localStorage.getItem('cap10meetup_events');
  if (stored) {
    return JSON.parse(stored);
  }
  return {};
}

// ------------------------
// EVENT LIST / CREATE
// ------------------------
const eventListSection = document.getElementById('event-list-section');
const existingEventsDiv = document.getElementById('existing-events');
const createEventForm = document.getElementById('create-event-form');

function renderEventList() {
  existingEventsDiv.innerHTML = "";
  if (Object.keys(events).length === 0) {
    existingEventsDiv.innerHTML = "<p>No events available.</p>";
    return;
  }
  const ul = document.createElement('ul');
  for (let eventName in events) {
    const li = document.createElement('li');
    li.textContent = eventName + " ";

    const joinBtn = document.createElement('button');
    joinBtn.textContent = "Join";
    joinBtn.className = "submit-button";
    joinBtn.style.marginLeft = "10px";
    joinBtn.onclick = () => {
      eventListSection.style.display = "none";
      document.getElementById('event-login-section').style.display = "block";
      document.getElementById('login-event-name').textContent = eventName;
      currentEventName = eventName;
    };
    li.appendChild(joinBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "submit-button";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = () => {
      deleteEventFromList(eventName);
    };
    li.appendChild(deleteBtn);

    ul.appendChild(li);
  }
  existingEventsDiv.appendChild(ul);
}

function deleteEventFromList(eventName) {
  if (!events[eventName]) {
    alert("Event not found.");
    return;
  }
  if (!confirm(`Are you sure you want to delete "${eventName}"? This action cannot be undone.`)) {
    return;
  }
  delete events[eventName];
  saveEvents();
  alert(`Event "${eventName}" has been deleted.`);
  renderEventList();
}

createEventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Create event form submitted");

  const name = document.getElementById('new-event-name').value.trim();
  const password = document.getElementById('new-event-password').value;
  if (!name || !password) {
    console.log("Missing event name or password.");
    return;
  }
  if (events[name]) {
    alert("Event with this name already exists.");
    console.log("Event already exists:", name);
    return;
  }

  const defaultSkills = [
    "JavaScript", "Python", "Java", "C#", "C++", "Ruby", "PHP", "Swift",
    "Kotlin", "Go", "Rust", "SQL", "NoSQL Databases", "Data Science",
    "Machine Learning", "Deep Learning", "Natural Language Processing",
    "Computer Vision", "UX/UI Design", "Graphic Design", "Web Design",
    "Mobile Development", "Cloud Computing", "DevOps", "Cybersecurity",
    "Blockchain", "IoT", "AR/VR", "Game Development", "Embedded Systems",
    "Networking", "Big Data", "Data Analytics", "Robotics", "Quantum Computing",
    "Agile Methodologies", "Project Management", "Software Testing", "Automation",
    "API Design", "Microservices", "SaaS Development"
  ];

  const defaultPositions = [
    "Software Developer", "Frontend Developer", "Backend Developer",
    "Full Stack Developer", "Mobile Developer", "DevOps Engineer",
    "QA Engineer", "UX Designer", "UI Designer", "Product Manager",
    "Project Manager", "Business Analyst", "Data Scientist",
    "Data Analyst", "Database Administrator", "Systems Engineer",
    "Network Engineer", "Security Analyst", "Cybersecurity Specialist",
    "Cloud Architect", "Solutions Architect", "Technical Lead",
    "Engineering Manager", "CTO", "CIO", "Software Architect",
    "Research Scientist", "AI/ML Engineer", "Machine Learning Researcher",
    "Hardware Engineer", "Embedded Systems Engineer", "IT Support Specialist",
    "Technical Writer", "Scrum Master", "Agile Coach", "Systems Administrator",
    "Game Developer", "Blockchain Developer", "Automation Engineer",
    "IoT Specialist", "R&D Engineer", "Digital Marketing Specialist"
  ];

  let newEvent = {
    password: password,
    questions: [
      {
        id: "contact_info",
        type: "contact",
        prompt: "Please provide your contact information"
      },
      {
        id: "technical_skills",
        type: "ranking",
        prompt: "Rate your technical skills (Current and Desired)",
        options: defaultSkills
      },
      {
        id: "positions_held",
        type: "checklist",
        prompt: "Select positions you have held",
        options: defaultPositions
      },
      {
        id: "innovation_drive",
        type: "phrase",
        prompt: "What drives you to innovate in tech?"
      },
      {
        id: "tech_challenge",
        type: "phrase",
        prompt: "What challenge in the tech industry are you most passionate about solving?"
      },
      {
        id: "future_oc_tech",
        type: "phrase",
        prompt: "How do you see the future of OC tech evolving?"
      },
      {
        id: "recent_breakthrough",
        type: "phrase",
        prompt: "Share a recent breakthrough or insight that inspired you."
      }
    ],
    responses: [],
    attendees: []
  };

  events[name] = newEvent;
  saveEvents();
  createEventForm.reset();
  renderEventList();
  console.log("Event created:", name);
});

renderEventList();

// ------------------------
// EVENT LOGIN
// ------------------------
const eventLoginSection = document.getElementById('event-login-section');
const eventLoginForm = document.getElementById('event-login-form');
const backToEventListBtn = document.getElementById('back-to-event-list');

eventLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputPassword = document.getElementById('event-login-password').value;
  const encryptedData = events[currentEventName];
  const decrypted = decryptEventData(encryptedData, inputPassword);
  if (decrypted) {
    currentEvent = decrypted;
    eventLoginSection.style.display = "none";
    document.getElementById('event-view-section').style.display = "block";
    renderShareInfoForm();
    renderAttendees();
    renderOwnerInfoForm();
  } else {
    alert("Incorrect password. Please try again.");
  }
});

backToEventListBtn.addEventListener('click', () => {
  eventLoginSection.style.display = "none";
  eventListSection.style.display = "block";
});

// ------------------------
// EVENT VIEW NAVIGATION
// ------------------------
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
  renderDashboard();
});

menuLogout.addEventListener('click', () => {
  const p = prompt("Enter event password to exit:");
  if (p !== currentEvent.password) {
    alert("Incorrect password. Cannot exit event.");
    return;
  }
  events[currentEventName] = currentEvent;
  saveEvents();
  document.getElementById('event-view-section').style.display = "none";
  eventListSection.style.display = "block";
  currentEvent = null;
  currentEventName = "";
});

// ------------------------
// EVENT DELETE & EXPORT (Dashboard)
// ------------------------
function deleteCurrentEvent() {
  if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
    delete events[currentEventName];
    saveEvents();
    alert("Event deleted.");
    document.getElementById('event-view-section').style.display = "none";
    eventListSection.style.display = "block";
    currentEvent = null;
    currentEventName = "";
    renderEventList();
  }
}

function exportEventSummary() {
  const summary = {
    title: currentEventName,
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
  link.download = `${currentEventName}-summary.yaml`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function renderDashboardExtras() {
  const oldExtras = document.getElementById('dashboard-extras');
  if (oldExtras) oldExtras.remove();
  const dashboardExtras = document.createElement('div');
  dashboardExtras.id = "dashboard-extras";
  dashboardExtras.style.marginTop = "20px";
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete Event";
  deleteBtn.className = "submit-button";
  deleteBtn.style.marginRight = "10px";
  deleteBtn.onclick = deleteCurrentEvent;
  dashboardExtras.appendChild(deleteBtn);
  const exportBtn = document.createElement('button');
  exportBtn.textContent = "Export Summary (YAML)";
  exportBtn.className = "submit-button";
  exportBtn.onclick = exportEventSummary;
  dashboardExtras.appendChild(exportBtn);
  dashboardSection.appendChild(dashboardExtras);
}

// ------------------------
// OWNER INFO HANDLING
// ------------------------
const ownerInfoSection = document.getElementById('owner-info-section');
const ownerInfoForm = document.getElementById('owner-info-form');
const ownerNameInput = document.getElementById('owner-name');
const ownerEmailInput = document.getElementById('owner-email');
const ownerPhoneInput = document.getElementById('owner-phone');
// Removed the saveOwnerInfoButton since auto-saving is used

// Load saved owner info (from localStorage)
function loadOwnerInfo() {
    const storedOwnerInfo = JSON.parse(localStorage.getItem('cap10meetup_owner_info')) || {};
    ownerNameInput.value = storedOwnerInfo.name || '';
    ownerEmailInput.value = storedOwnerInfo.email || '';
    ownerPhoneInput.value = storedOwnerInfo.phone || '';
}

// Save owner info automatically (no alert needed)
function saveOwnerInfo() {
    const ownerInfo = {
        name: ownerNameInput.value.trim(),
        email: ownerEmailInput.value.trim(),
        phone: ownerPhoneInput.value.trim()
    };
    localStorage.setItem('cap10meetup_owner_info', JSON.stringify(ownerInfo));
    console.log("Owner contact info saved.");
}

// Add auto-save event listeners
ownerNameInput.addEventListener('change', saveOwnerInfo);
ownerEmailInput.addEventListener('change', saveOwnerInfo);
ownerPhoneInput.addEventListener('change', saveOwnerInfo);

// Copy owner info to clipboard
function copyOwnerInfo() {
    const ownerInfo = {
        name: ownerNameInput.value.trim(),
        email: ownerEmailInput.value.trim(),
        phone: ownerPhoneInput.value.trim()
    };

    if (!ownerInfo.name && !ownerInfo.email && !ownerInfo.phone) {
        alert("No contact info available to copy.");
        return;
    }

    const formattedText =
`📌 Contact Info:
👤 Name: ${ownerInfo.name || "(Not Provided)"}
📧 Email: ${ownerInfo.email || "(Not Provided)"}
📞 Phone: ${ownerInfo.phone || "(Not Provided)"}

🔹 Sent with Cap10Meetup
🔗 Brought to you by https://cap10.tech`;

    navigator.clipboard.writeText(formattedText)
        .then(() => alert("Contact info copied to clipboard!"))
        .catch(() => {
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = formattedText;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextarea);
            alert("Contact info copied to clipboard!");
        });
}

// New: Share owner info using the Web Share API
function shareOwnerInfo() {
    const ownerInfo = {
        name: ownerNameInput.value.trim(),
        email: ownerEmailInput.value.trim(),
        phone: ownerPhoneInput.value.trim()
    };

    if (!ownerInfo.name && !ownerInfo.email && !ownerInfo.phone) {
        alert("No contact info available to share.");
        return;
    }

    const formattedText =
`📌 Contact Info:
👤 Name: ${ownerInfo.name || "(Not Provided)"}
📧 Email: ${ownerInfo.email || "(Not Provided)"}
📞 Phone: ${ownerInfo.phone || "(Not Provided)"}

🔹 Sent with Cap10Meetup
🔗 Brought to you by https://cap10.tech`;

    if (navigator.share) {
        navigator.share({ title: 'Owner Contact Info', text: formattedText })
            .catch(err => {
                console.error("Error sharing:", err);
                alert("Sharing failed.");
            });
    } else {
        alert("Web Share API not supported on this browser.");
    }
}

// Toggle editability based on event entry
function updateOwnerInfoUI(inEvent) {
    ownerNameInput.readOnly = inEvent;
    ownerEmailInput.readOnly = inEvent;
    ownerPhoneInput.readOnly = inEvent;
}

// Call loadOwnerInfo when page loads
loadOwnerInfo();

// -----------------
// Additional event and form handling code remains unchanged...
// (Share info form rendering, event responses, etc.)
