const pageTitle = document.title;
const comeBack = "Come baaack! 😿";
const missU = "We miss youu! 💔";

let interval;

function onBlur() {
  interval = setInterval(() => {
    if (document.title == pageTitle || document.title == missU) {
      document.title = comeBack;
    } else document.title = missU;
  }, 2000);
}

function onFocus() {
  clearInterval(interval);
  document.title = pageTitle;
}

window.addEventListener("blur", onBlur);

window.addEventListener("focus", onFocus);
