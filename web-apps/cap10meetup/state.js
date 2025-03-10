// state.js: centralized state management.

export const AppState = {
  currentEvent: null,
  currentEventName: "",
  events: {},
};

export function setCurrentEvent(eventName, eventData) {
  AppState.currentEventName = eventName;
  AppState.currentEvent = eventData;
}

export function clearCurrentEvent() {
  AppState.currentEventName = "";
  AppState.currentEvent = null;
}
