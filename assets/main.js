// force scroll to top on page load
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

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

console.log("Main.js loaded!");

// turtle stack animation - setup
let turtles = [];
let maxTurtles = 4; // Total number of turtles in the stack
let baseTurtleSize = 150; // Size of the biggest (bottom) turtle in pixels
let sizeReduction = 0.8; // Each turtle is 80% the size of the one below it
let lastVisibleCount = 1; // Track previous count
let turtleTimeouts = []; // Track timeouts

function initTurtles() {
  console.log("Initializing turtles...");

  let turtleStack = document.getElementById("turtle-stack");
  console.log("Turtle stack element:", turtleStack);

  if (!turtleStack) {
    console.error("Turtle stack element not found!");
    return;
  }

  // Pre-create all turtles
  for (let i = 0; i < maxTurtles; i++) {
    let turtle = document.createElement("img");
    turtle.src = "/assets/images/turtleemoji.png";
    turtle.className = "turtle-item";
    let size = baseTurtleSize * Math.pow(sizeReduction, i);
    turtle.style.width = size + "px";
    turtle.style.height = size + "px";
    turtleStack.appendChild(turtle);
    turtles.push(turtle);
    console.log("Created turtle", i, "with size", size);
  }

  console.log("Created", turtles.length, "turtles");

  // Always show the first (biggest) turtle
  if (turtles.length > 0) {
    turtles[0].classList.add("visible");
    console.log("Made first turtle visible");
  }

  // Initial check
  updateTurtleStack();

  // Update on scroll
  window.addEventListener("scroll", updateTurtleStack);
}

// Show turtles based on scroll position
function updateTurtleStack() {
  let scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  let scrolled = window.scrollY;
  let scrollPercent = scrollHeight > 0 ? scrolled / scrollHeight : 0;

  // Calculate how many turtles should be visible
  // First turtle always shows, others appear as you scroll
  let visibleTurtleCount = 1 + Math.floor(scrollPercent * (maxTurtles - 1));
  visibleTurtleCount = Math.min(visibleTurtleCount, maxTurtles);

  // Clear pending timeouts
  turtleTimeouts.forEach(timeout => clearTimeout(timeout));
  turtleTimeouts = [];

  if (visibleTurtleCount > lastVisibleCount) {
    // Scrolling DOWN - add turtles one at a time with delays
    for (let i = lastVisibleCount; i < visibleTurtleCount; i++) {
      if (i === 0) continue; // Never touch base turtle
      let delay = (i - lastVisibleCount) * 1500;
      let timeout = setTimeout(() => {
        if (turtles[i]) turtles[i].classList.add("visible");
      }, delay);
      turtleTimeouts.push(timeout);
    }
  } else if (visibleTurtleCount < lastVisibleCount) {
    // Scrolling UP - remove turtles in REVERSE order (top to bottom) instantly
    for (let i = lastVisibleCount - 1; i >= visibleTurtleCount; i--) {
      if (i === 0) continue; // Never touch base turtle
      if (turtles[i]) turtles[i].classList.remove("visible");
    }
  }

  lastVisibleCount = visibleTurtleCount;
}

// Initialize turtles immediately
initTurtles();

// loading fade in

let transitionDelayMs = 500;
let transitionDurationMs = 1000;
let loaderElement = document.getElementById("loading-cover");
console.log("Loading cover element:", loaderElement);
loaderElement.classList.add(`delay-${transitionDelayMs}`);
loaderElement.classList.add(`duration-${transitionDurationMs}`);
loaderElement.classList.add("opacity-0");
setTimeout(() => {
  console.log("Timeout fired! Removing loader");
  loaderElement.remove();
}, transitionDurationMs + transitionDelayMs);
