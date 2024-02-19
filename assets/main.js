// configuration

let dataReplaceMap = {
  currentYear: new Date().getFullYear(),
};

// replace custom data attributes

let dataReplaceElements = document.querySelectorAll("[data-replace]");
dataReplaceElements.forEach((element) => {
  let replaceValue = dataReplaceMap[element.dataset.replace];
  element.innerHTML = replaceValue;
});

// loading fade in

let transitionDelayMs = 500;
let transitionDurationMs = 1000;
let loaderElement = document.getElementById("loading-cover");
loaderElement.classList.add(`delay-${transitionDelayMs}`);
loaderElement.classList.add(`duration-${transitionDurationMs}`);
loaderElement.classList.add("opacity-0");
setTimeout(() => {
  loaderElement.remove();
}, transitionDurationMs + transitionDelayMs);
