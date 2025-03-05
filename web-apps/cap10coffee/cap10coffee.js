// Data storage in localStorage:
let containers = JSON.parse(localStorage.getItem('coffeeContainers')) || {};
let brews = JSON.parse(localStorage.getItem('coffeeBrews')) || {};

// Predefined container types with default warning and expired times (in milliseconds)
const containerTypes = {
  insulated_thermos: {
    name: "Insulated Thermos",
    warning: 2 * 60 * 60 * 1000,  // 2 hours
    expired: 4 * 60 * 60 * 1000   // 4 hours
  },
  glass_pot: {
    name: "Glass Pot (on burner)",
    warning: 1 * 60 * 60 * 1000,  // 1 hour
    expired: 2 * 60 * 60 * 1000   // 2 hours
  },
  french_press: {
    name: "French Press",
    warning: 30 * 60 * 1000,      // 30 minutes
    expired: 60 * 60 * 1000       // 1 hour
  },
  paper_cup: {
    name: "Paper Cup",
    warning: 10 * 60 * 1000,      // 10 minutes
    expired: 20 * 60 * 1000       // 20 minutes
  },
  cold_brew_jar: {
    name: "Cold Brew Jar",
    warning: 12 * 60 * 60 * 1000, // 12 hours
    expired: 24 * 60 * 60 * 1000  // 24 hours
  }
};

// Populate the container type dropdown in the container management form
function populateContainerTypeDropdown() {
  const containerTypeSelect = document.getElementById('container-type');
  containerTypeSelect.innerHTML = "";
  for (let key in containerTypes) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = containerTypes[key].name;
    containerTypeSelect.appendChild(option);
  }
}

// Add a new container with error checking and default type handling
function addContainer() {
  const name = document.getElementById('container-name').value.trim();
  const description = document.getElementById('container-description').value.trim();
  const type = document.getElementById('container-type').value;
  const imageUrl = document.getElementById('container-image').value.trim();

  if (!name) {
    alert("Please enter a container name.");
    return;
  }

  // Set a default type if somehow none is selected
  const containerType = type || Object.keys(containerTypes)[0];

  // Use name as key; in a real application, consider using unique IDs instead
  containers[name] = {
    name,
    description,
    type: containerType,
    imageUrl
  };
  localStorage.setItem('coffeeContainers', JSON.stringify(containers));
  renderContainers();
  populateBrewContainerDropdown();

  // Clear input fields
  document.getElementById('container-name').value = '';
  document.getElementById('container-description').value = '';
  document.getElementById('container-image').value = '';
}

// Render the container list with safe lookup for container type name
function renderContainers() {
  const containerList = document.getElementById('container-list');
  containerList.innerHTML = "";
  for (let key in containers) {
    const container = containers[key];
    const typeObj = containerTypes[container.type];
    const typeName = typeObj ? typeObj.name : "Unknown";
    const li = document.createElement('li');
    li.innerHTML = `<strong>${container.name}</strong> (${typeName})<br>${container.description}`;
    if (container.imageUrl) {
      li.innerHTML += `<br><img src="${container.imageUrl}" alt="${container.name}" style="max-width:100px;">`;
    }
    containerList.appendChild(li);
  }
}


// Populate the dropdown for selecting a container when brewing coffee
function populateBrewContainerDropdown() {
  const brewContainerSelect = document.getElementById('brew-container');
  brewContainerSelect.innerHTML = "";
  for (let key in containers) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = containers[key].name;
    brewContainerSelect.appendChild(option);
  }
}

// Add a new coffee brew record
function addBrew() {
  const containerKey = document.getElementById('brew-container').value;
  const coffeeDesc = document.getElementById('coffee-description').value.trim();
  const coffeeImage = document.getElementById('coffee-image').value.trim();
  if (!containerKey || !coffeeDesc) return;

  // Create a unique brew record ID using timestamp
  const brewId = 'brew-' + Date.now();
  brews[brewId] = {
    containerKey,
    coffeeDesc,
    coffeeImage,
    brewTime: new Date().toISOString()
  };
  localStorage.setItem('coffeeBrews', JSON.stringify(brews));
  renderBrews();

  // Clear inputs
  document.getElementById('coffee-description').value = '';
  document.getElementById('coffee-image').value = '';
}

// Render the brew log
function renderBrews() {
  const brewLog = document.getElementById('brew-log');
  brewLog.innerHTML = "";
  for (let id in brews) {
    const brew = brews[id];
    const container = containers[brew.containerKey];
    if (!container) continue;

    // Calculate age of brew
    const brewTime = new Date(brew.brewTime);
    const now = new Date();
    const ageMs = now - brewTime;

    // Get container type thresholds
    const thresholds = containerTypes[container.type];
    let status = "Fresh";
    let statusClass = "status-fresh";
    if (ageMs > thresholds.expired) {
      status = "Expired";
      statusClass = "status-expired";
    } else if (ageMs > thresholds.warning) {
      status = "Warning";
      statusClass = "status-warning";
    }

    const li = document.createElement('li');
    li.innerHTML = `<strong>${brew.coffeeDesc}</strong> in <em>${container.name}</em><br>
      Brewed at: ${brewTime.toLocaleString()}<br>
      Status: <span class="${statusClass}">${status}</span> (Age: ${formatDuration(ageMs)})`;
    if (brew.coffeeImage) {
      li.innerHTML += `<br><img src="${brew.coffeeImage}" alt="${brew.coffeeDesc}" style="max-width:100px;">`;
    }
    brewLog.appendChild(li);
  }
}

// Helper to format duration in hours/minutes
function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

// Function to switch between sections (tabs)
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => {
    sec.style.display = (sec.id === sectionId) ? 'block' : 'none';
  });
}

// Initialization
function init() {
  populateContainerTypeDropdown();
  renderContainers();
  populateBrewContainerDropdown();
  renderBrews();
}

// Run init on page load
init();
