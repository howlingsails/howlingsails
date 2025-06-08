# Captain’s Log | 2025-06-05 19:00 PDT

Today we set our course to build a simple HTML page that accepts an OpenAPI JSON, parses it, lists all endpoints, and lets a user select any endpoint to copy its spec, request schema, and response schema to the clipboard.

## Context & Overview (Why We Sail)

Many teams need a lightweight tool to quickly inspect an OpenAPI definition without installing heavy documentation generators. By creating a single-page HTML app that reads a JSON spec, displays all available endpoints, and offers “Copy to Clipboard” buttons, developers can rapidly explore and share endpoint details during development or troubleshooting.

## Prerequisites

• Basic familiarity with HTML, CSS, and JavaScript (ES6).
• Understanding of how to work with DOM APIs (e.g., `document.querySelector`, event listeners).
• Knowledge of the OpenAPI JSON structure (especially the `paths` object and request/response schemas).
• A modern browser that supports the [FileReader API](https://developer.mozilla.org/docs/Web/API/FileReader) and the [Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API).
• (Optional) A code editor and local web server (e.g., `Live Server` extension for VS Code) for quick testing.

## Step-by-Step Guide

### 1. Create the Project Structure

1. In your project folder, create a file called `index.html`.
2. Optionally, create a `styles.css` for styling and a `script.js` to hold your JavaScript logic.

```
# project/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OpenAPI Explorer</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <!-- We'll fill this in during Step 2 -->
  <script src="script.js"></script>
</body>
</html>
```

### 2. Design the HTML Skeleton with a File Input and Sections for Display

In `index.html`, add:

* A file input (`<input type="file">`) to load the OpenAPI JSON.
* A container element to display the list of endpoints.
* A detail panel where selected endpoint details (spec, request, response) will appear.

```html
# project/index.html
<body>
  <h1>OpenAPI Explorer</h1>
  <!-- 1. File Input to Load OpenAPI JSON -->
  <section id="upload-section">
    <label for="openapi-json">Load OpenAPI JSON:</label>
    <input type="file" id="openapi-json" accept=".json" />
  </section>

  <!-- 2. List of Endpoints -->
  <section id="endpoints-section">
    <h2>Available Endpoints</h2>
    <ul id="endpoint-list">
      <!-- Populated dynamically -->
    </ul>
  </section>

  <!-- 3. Endpoint Details and Copy Buttons -->
  <section id="details-section" hidden>
    <h2 id="endpoint-title"></h2>
    <pre id="endpoint-spec"></pre>
    <button id="copy-spec">Copy Spec</button>

    <h3>Request Schema</h3>
    <pre id="request-schema"></pre>
    <button id="copy-request">Copy Request Schema</button>

    <h3>Response Schema</h3>
    <pre id="response-schema"></pre>
    <button id="copy-response">Copy Response Schema</button>
  </section>
</body>
```

### 3. Read and Parse the JSON File with JavaScript

1. In `script.js`, add an event listener for the file input’s `change` event.
2. Use the [FileReader API](https://developer.mozilla.org/docs/Web/API/FileReader) to read the selected file as text.
3. Parse the text into a JavaScript object using `JSON.parse`.
4. Extract the `paths` object from the parsed OpenAPI spec.

```js
# project/script.js
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('openapi-json');
  const endpointList = document.getElementById('endpoint-list');
  const detailsSection = document.getElementById('details-section');

  let openapiSpec = null;

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        openapiSpec = JSON.parse(e.target.result);
        populateEndpointList(openapiSpec.paths);
      } catch (err) {
        alert('Invalid JSON file. Please load a valid OpenAPI spec.');
        console.error(err);
      }
    };
    reader.readAsText(file);
  });

  // Placeholder: define populateEndpointList below
});
```

### 4. Render the List of Endpoints in the UI

1. Create a function `populateEndpointList(paths)` that takes the `paths` object.
2. Iterate over each key in `paths` (each key is a URL path like `"/users"`). For each path, iterate over its HTTP methods (e.g., `get`, `post`).
3. For each `(method, path)` pair, create a clickable `<li>` entry in `#endpoint-list`. Use a consistent label format, for example: `GET /users`.
4. Attach a click listener to each `<li>` that calls a function to display detailed info for that endpoint.

```js
# project/script.js
function populateEndpointList(paths) {
  endpointList.innerHTML = ''; // Clear any existing entries
  for (const [path, methodsObj] of Object.entries(paths)) {
    for (const [method, operationObj] of Object.entries(methodsObj)) {
      const listItem = document.createElement('li');
      listItem.textContent = `${method.toUpperCase()} ${path}`;
      listItem.dataset.path = path;
      listItem.dataset.method = method;
      listItem.addEventListener('click', () => {
        showEndpointDetails(path, method, operationObj);
      });
      endpointList.appendChild(listItem);
    }
  }
}
```

### 5. Display Endpoint Details (Spec, Request, Response)

1. Define `showEndpointDetails(path, method, operationObj)`.
2. In this function:

  * Build a minimal spec fragment for the selected endpoint (including `path`, `method`, and the `operationObj`).
  * Extract the `requestBody` schema (if it exists) under `operationObj.requestBody.content['application/json'].schema`.
  * Extract the `responses` schema (typically `operationObj.responses['200'].content['application/json'].schema`, but adapt for multiple status codes if needed).
  * Populate the DOM elements:

    * `#endpoint-title` with something like `GET /users`.
    * `#endpoint-spec <pre>` with `JSON.stringify({ [path]: { [method]: operationObj } }, null, 2)`.
    * `#request-schema <pre>` with the JSON string of the request schema or a placeholder if none.
    * `#response-schema <pre>` with the JSON string of the response schema (for 200 or first available) or a placeholder.
  * Unhide (remove `hidden`) from `#details-section`.

```js
# project/script.js
function showEndpointDetails(path, method, operationObj) {
  // 1. Build minimal spec fragment
  const fragment = { paths: { [path]: { [method]: operationObj } } };
  document.getElementById('endpoint-title').textContent =
    `${method.toUpperCase()} ${path}`;
  document.getElementById('endpoint-spec').textContent =
    JSON.stringify(fragment, null, 2);

  // 2. Extract request schema
  let requestSchema = {};
  if (
    operationObj.requestBody &&
    operationObj.requestBody.content &&
    operationObj.requestBody.content['application/json']
  ) {
    requestSchema =
      operationObj.requestBody.content['application/json'].schema;
  } else {
    requestSchema = { note: 'No request schema defined' };
  }
  document.getElementById('request-schema').textContent =
    JSON.stringify(requestSchema, null, 2);

  // 3. Extract response schema (e.g., 200 or first available)
  let responseSchema = {};
  if (operationObj.responses) {
    const response200 = operationObj.responses['200'];
    if (
      response200 &&
      response200.content &&
      response200.content['application/json']
    ) {
      responseSchema =
        response200.content['application/json'].schema;
    } else {
      // If 200 not available, pick the first defined response
      const firstKey = Object.keys(operationObj.responses)[0];
      const firstResp = operationObj.responses[firstKey];
      if (
        firstResp &&
        firstResp.content &&
        firstResp.content['application/json']
      ) {
        responseSchema =
          firstResp.content['application/json'].schema;
      } else {
        responseSchema = { note: 'No response schema defined' };
      }
    }
  } else {
    responseSchema = { note: 'No responses defined' };
  }
  document.getElementById('response-schema').textContent =
    JSON.stringify(responseSchema, null, 2);

  // 4. Show the details section
  document.getElementById('details-section').hidden = false;
}
```

### 6. Implement “Copy to Clipboard” Buttons

1. For each copy button (`#copy-spec`, `#copy-request`, `#copy-response`), add a click listener.
2. In the listener, read the corresponding `<pre>`’s `textContent` and use `navigator.clipboard.writeText(...)` to copy it.
3. Optionally show a brief tooltip or temporary message (“Copied!”).

```js
# project/script.js
function setupCopyButtons() {
  const copySpecBtn = document.getElementById('copy-spec');
  const copyRequestBtn = document.getElementById('copy-request');
  const copyResponseBtn = document.getElementById('copy-response');

  copySpecBtn.addEventListener('click', () => {
    const specText = document.getElementById('endpoint-spec').textContent;
    navigator.clipboard.writeText(specText).then(() => {
      alert('Endpoint spec copied to clipboard.');
    });
  });

  copyRequestBtn.addEventListener('click', () => {
    const reqText = document.getElementById('request-schema').textContent;
    navigator.clipboard.writeText(reqText).then(() => {
      alert('Request schema copied to clipboard.');
    });
  });

  copyResponseBtn.addEventListener('click', () => {
    const respText = document.getElementById('response-schema').textContent;
    navigator.clipboard.writeText(respText).then(() => {
      alert('Response schema copied to clipboard.');
    });
  });
}

// Call this once after DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupCopyButtons();
});
```

### 7. Tie Everything Together in `script.js`

Ensure your `DOMContentLoaded` listener:

1. Hooks the file input to `populateEndpointList`.
2. Sets up copy buttons.
3. Defines `populateEndpointList` and `showEndpointDetails`.

The final `script.js` outline should look like:

```js
# project/script.js
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('openapi-json');
  const endpointList = document.getElementById('endpoint-list');
  let openapiSpec = null;

  // Read and parse JSON file
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        openapiSpec = JSON.parse(e.target.result);
        populateEndpointList(openapiSpec.paths);
      } catch (err) {
        alert('Invalid JSON. Load a valid OpenAPI spec.');
        console.error(err);
      }
    };
    reader.readAsText(file);
  });

  // Populate the list of endpoints
  function populateEndpointList(paths) {
    endpointList.innerHTML = '';
    for (const [path, methodsObj] of Object.entries(paths)) {
      for (const [method, operationObj] of Object.entries(methodsObj)) {
        const li = document.createElement('li');
        li.textContent = `${method.toUpperCase()} ${path}`;
        li.dataset.path = path;
        li.dataset.method = method;
        li.addEventListener('click', () => {
          showEndpointDetails(path, method, operationObj);
        });
        endpointList.appendChild(li);
      }
    }
  }

  // Display details for a selected endpoint
  function showEndpointDetails(path, method, operationObj) {
    const detailsSection = document.getElementById('details-section');
    // Build minimal spec fragment
    const fragment = { paths: { [path]: { [method]: operationObj } } };
    document.getElementById('endpoint-title').textContent = `${method.toUpperCase()} ${path}`;
    document.getElementById('endpoint-spec').textContent = JSON.stringify(fragment, null, 2);

    // Request schema
    let reqSchema = {};
    if (
      operationObj.requestBody &&
      operationObj.requestBody.content &&
      operationObj.requestBody.content['application/json']
    ) {
      reqSchema = operationObj.requestBody.content['application/json'].schema;
    } else {
      reqSchema = { note: 'No request schema defined' };
    }
    document.getElementById('request-schema').textContent = JSON.stringify(reqSchema, null, 2);

    // Response schema
    let respSchema = {};
    if (operationObj.responses) {
      const resp200 = operationObj.responses['200'];
      if (
        resp200 &&
        resp200.content &&
        resp200.content['application/json']
      ) {
        respSchema = resp200.content['application/json'].schema;
      } else {
        const firstKey = Object.keys(operationObj.responses)[0];
        const firstResp = operationObj.responses[firstKey];
        if (
          firstResp &&
          firstResp.content &&
          firstResp.content['application/json']
        ) {
          respSchema = firstResp.content['application/json'].schema;
        } else {
          respSchema = { note: 'No response schema defined' };
        }
      }
    } else {
      respSchema = { note: 'No responses defined' };
    }
    document.getElementById('response-schema').textContent = JSON.stringify(respSchema, null, 2);

    detailsSection.hidden = false;
  }

  // Set up copy-to-clipboard buttons
  function setupCopyButtons() {
    const copySpecBtn = document.getElementById('copy-spec');
    const copyRequestBtn = document.getElementById('copy-request');
    const copyResponseBtn = document.getElementById('copy-response');

    copySpecBtn.addEventListener('click', () => {
      const text = document.getElementById('endpoint-spec').textContent;
      navigator.clipboard.writeText(text).then(() => {
        alert('Endpoint spec copied.');
      });
    });
    copyRequestBtn.addEventListener('click', () => {
      const text = document.getElementById('request-schema').textContent;
      navigator.clipboard.writeText(text).then(() => {
        alert('Request schema copied.');
      });
    });
    copyResponseBtn.addEventListener('click', () => {
      const text = document.getElementById('response-schema').textContent;
      navigator.clipboard.writeText(text).then(() => {
        alert('Response schema copied.');
      });
    });
  }

  // Initialize copy buttons
  setupCopyButtons();
});
```

### 8. Style the Page for Better Usability (Optional)

Create `styles.css` to make the page readable:

```css
# project/styles.css
body {
  font-family: Arial, sans-serif;
  margin: 1rem;
  line-height: 1.5;
}
h1, h2 {
  color: #20252c;
}
#upload-section {
  margin-bottom: 1rem;
}
#endpoint-list {
  list-style: none;
  padding: 0;
}
#endpoint-list li {
  cursor: pointer;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}
#endpoint-list li:hover {
  background-color: #f0f0f0;
}
#details-section {
  margin-top: 1rem;
  border-top: 1px solid #ccc;
  padding-top: 1rem;
}
pre {
  background: #f8f8f8;
  padding: 0.5rem;
  overflow-x: auto;
}
button {
  margin: 0.5rem 0 1rem 0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
```

### 9. Test with a Sample OpenAPI JSON

1. Create or download a simple `sample-openapi.json`, for example:

```json
{
  "openapi": "3.0.1",
  "info": { "title": "Sample API", "version": "1.0.0" },
  "paths": {
    "/users": {
      "get": {
        "summary": "List users",
        "responses": {
          "200": {
            "description": "A list of users",
            "content": {
              "application/json": {
                "schema": { "type": "array", "items": { "type": "object" } }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create user",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": { "type": "object", "properties": { "name": { "type": "string" } } }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User created",
            "content": {
              "application/json": {
                "schema": { "type": "object", "properties": { "id": { "type": "integer" } } }
              }
            }
          }
        }
      }
    }
  }
}
```

2. Serve the folder with a simple server (e.g., run `npx serve` or use VS Code Live Server).
3. Navigate to `index.html`, upload `sample-openapi.json`, verify that both `GET /users` and `POST /users` appear, and test the “Copy” buttons.

## Reflection & Mentor Insights

Building this single-page app reinforces how powerful the browser’s native APIs are:
• **FileReader** lets us load local files without a backend.
• **Clipboard API** makes sharing snippet details frictionless.
• Parsing and rendering JSON in the DOM is a minimal example of client-side tooling that can save teams time over heavyweight documentation tools.

Consider how you might extend this: support multiple media types beyond `application/json`, add search/filter for endpoints, or integrate syntax highlighting libraries to improve readability. Always log key steps in a “logbook” as you iterate—if something breaks, you’ll know when, why, and how you fixed it.

## Next Steps & Action Items

* Experiment with OpenAPI definitions that include server variables or authentication schemes.
* Add a dropdown to let users choose which response status code’s schema to view (e.g., 200 vs. 404).
* Integrate a syntax highlighter (such as [Prism](https://prismjs.com/) or [Highlight.js](https://highlightjs.org/)) to colorize JSON.
* Deploy this HTML page as a static asset (GitHub Pages, Netlify) so teammates can access it without cloning the repo.
* Document any edge cases—missing `requestBody`, multiple `content` types, or deeply nested schemas—and log them for future iterations.

Fair winds and following seas,
– cap10bill
