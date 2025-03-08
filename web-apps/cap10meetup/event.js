// File: web-apps/cap10meetup/event.js
import { saveEvents, loadEncryptedEvents } from "./data.js";

// We export a mutable "events" variable and functions for event handling.
export let events = loadEncryptedEvents();

/**
 * Renders the list of events into the "existing-events" container.
 */
export function renderEventList() {
  const existingEventsDiv = document.getElementById('existing-events');
  existingEventsDiv.innerHTML = "";
  if (Object.keys(events).length === 0) {
    existingEventsDiv.innerHTML = "<p>No events available.</p>";
    return;
  }
  const ul = document.createElement('ul');
  for (let eventName in events) {
    const li = document.createElement('li');
    li.textContent = eventName + " ";

    // Join button
    const joinBtn = document.createElement('button');
    joinBtn.textContent = "Join";
    joinBtn.className = "submit-button";
    joinBtn.style.marginLeft = "10px";
    joinBtn.onclick = () => {
      document.getElementById('event-list-section').style.display = "none";
      document.getElementById('event-login-section').style.display = "block";
      document.getElementById('login-event-name').textContent = eventName;
      // Expose the chosen event name globally (or use a setter in meetup.js)
      window.currentEventName = eventName;
    };
    li.appendChild(joinBtn);

    // Delete button
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

/**
 * Deletes the event with the given name.
 */
export function deleteEventFromList(eventName) {
  if (!events[eventName]) {
    alert("Event not found.");
    return;
  }
  if (!confirm(`Are you sure you want to delete "${eventName}"? This action cannot be undone.`)) {
    return;
  }
  delete events[eventName];
  events = saveEvents(events);
  alert(`Event "${eventName}" has been deleted.`);
  renderEventList();
}

/**
 * Attaches the submit handler for the new event (create event) form.
 */
export function attachNewEventHandler() {
  const createEventForm = document.getElementById('create-event-form');
  createEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('new-event-name').value.trim();
    const password = document.getElementById('new-event-password').value;
    if (!name || !password) {
      console.log("Missing event name or password.");
      return;
    }
    if (events[name]) {
      alert("Event with this name already exists.");
      return;
    }

    // Default skills and positions
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

    // Create the new event object with default questions.
    let newEvent = {
      password: password,
      questions: [
        { id: "contact_info", type: "contact", prompt: "Please provide your contact information" },
        { id: "what_to_remember", type: "phrase", prompt: "What should I remember?" },
        { id: "innovation_drive", type: "phrase", prompt: "What drives you to innovate in tech?" },
        { id: "tech_challenge", type: "phrase", prompt: "What challenge in the tech industry are you most passionate about solving?" },
        { id: "future_oc_tech", type: "phrase", prompt: "How do you see the future of tech evolving?" },
        { id: "recent_breakthrough", type: "phrase", prompt: "Share a recent breakthrough or insight that inspired you." },
        { id: "technical_skills", type: "ranking", prompt: "Rate your technical skills (Current and Desired)", options: defaultSkills },
        { id: "positions_held", type: "checklist", prompt: "Select positions you have held", options: defaultPositions },
      ],
      responses: [],
      attendees: []
    };

    events[name] = newEvent;
    saveEvents(events);
    createEventForm.reset();
    renderEventList();
  });
}

/**
 * Initializes the event module by attaching the handler and rendering the list.
 */
export function initEventModule() {
  attachNewEventHandler();
  renderEventList();
}
