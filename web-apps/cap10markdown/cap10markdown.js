// File: web-apps\cap10markdown\cap10markdown.js
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("markdownInput").addEventListener("input", convertMarkdownToJira);
});

function convertMarkdownToJira() {
    let markdownText = document.getElementById("markdownInput").value;
    let jiraText = markdownText
        .replace(/^# (.*$)/gim, "h1. $1") // h1
        .replace(/^## (.*$)/gim, "h2. $1") // h2
        .replace(/^### (.*$)/gim, "h3. $1") // h3
        .replace(/^#### (.*$)/gim, "h4. $1") // h4
        .replace(/^##### (.*$)/gim, "h5. $1") // h5
        .replace(/^###### (.*$)/gim, "h6. $1") // h6
        .replace(/\*\*(.*?)\*\*/gim, "*$1*") // Bold
        .replace(/\*(.*?)\*/gim, "_$1_") // Italic
        .replace(/~~(.*?)~~/gim, "-$1-") // Strikethrough
        .replace(/\+\+(.*?)\+\+/gim, "+$1+") // Inserted text
        .replace(/\^\^(.*?)\^\^/gim, "^$1^") // Superscript
        .replace(/~(.*?)~/gim, "~$1~") // Subscript
        .replace(/```([\s\S]*?)```/gim, "{code}$1{code}") // Code Block
        .replace(/`([^`]*)`/gim, "{{$1}}") // Inline Code
        .replace(/^> (.*$)/gim, "bq. $1") // Blockquote
        .replace(/^- (.*$)/gim, "* $1") // Unordered List
        .replace(/^\d+\. (.*$)/gim, "# $1") // Ordered List
        .replace(/\[(.*?)\]\((.*?)\)/gim, "[$1|$2]") // Links
        .replace(/\|\|(.+?)\|\|/g, "||$1||") // Table Header
        .replace(/\|(.+?)\|/g, "|$1|"); // Table Data

    document.getElementById("jiraOutput").textContent = jiraText;
}

function copyToClipboard(elementId) {
    let text = document.getElementById(elementId).value || document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error("Error copying text: ", err);
    });
}
