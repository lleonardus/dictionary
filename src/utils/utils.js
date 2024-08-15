export function getUrlWord() {
  const path = window.location.pathname;
  const urlWord = path.split("/")[1] || "";

  return decodeURIComponent(urlWord);
}
