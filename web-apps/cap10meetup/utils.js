// utils.js: common utility functions for the app.

// Throttle function ensures actions happen at most once per interval.
export function throttle(func, interval = 1000) {
  let lastCall = 0;
  let queued = null;

  const processQueue = () => {
    if (queued) {
      func(...queued);
      queued = null;
      lastCall = Date.now();
    }
  };

  return (...args) => {
    const now = Date.now();
    const elapsed = now - lastCall;

    if (elapsed >= interval) {
      func(...args);
      lastCall = now;
    } else {
      queued = args;
      clearTimeout(queued.timer);
      queued.timer = setTimeout(processQueue, interval - elapsed);
    }
  };
}

// Formats owner contact information clearly.
export function formatOwnerContact(ownerInfo) {
  const ownerName = ownerInfo.name || "Your";
  return `
📌 ${ownerName}'s Contact Info:
👤 Name: ${ownerInfo.name || "(Not Provided)"}
📝 What You Should Know About Them: ${ownerInfo.what || "(Not Provided)"}
🌐 Website: ${ownerInfo.web || "(Not Provided)"}
📧 Email: ${ownerInfo.email || "(Not Provided)"}
📱 Phone: ${ownerInfo.phone || "(Not Provided)"}

🔹 It's not who you know, it's who knows what you know.
🔗 Brought to you by https://cap10.tech`;
}

// Clipboard helper with fallback
export function copyToClipboard(text, successMsg) {
  navigator.clipboard.writeText(text)
    .then(() => alert(successMsg))
    .catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert(successMsg);
    });
}

// Web Share API helper
export function shareContact(text, title) {
  if (navigator.share) {
    navigator.share({ title, text })
      .catch(err => {
        console.error("Error sharing:", err);
        alert("Sharing failed.");
      });
  } else {
    alert("Web Share API not supported.");
  }
}
