const cols = document.querySelectorAll(".col");

// add event listener to change colors by pressing 'space'
document.addEventListener("keydown", (event) => {
  // cancel default behavior
  event.preventDefault();

  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type; // dataset - obj with data attributes

  if (type === "lock") {
    // verification of click on <button> or <i>
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? // if <i>
          event.target
        : // if <button> => child <button> == <i>
          event.target.children[0];

    // change class 'lock' <==> 'open'
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  }
  // copying content <h2> to buffer
  else if (type === "copyText") {
    copyToClickboard(event.target.textContent);
  }
});

function generateRandomColor() {
  // RGB
  // #FF0000
  const hexCodes = "0123456789ABCDEF";
  let color = "";

  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }

  return "#" + color;
}

// copying text of tag <h2> to buffer
function copyToClickboard(text) {
  // return promise
  return navigator.clipboard.writeText(text);
}

function setRandomColors() {
  // arr colors is to save set of colors to passing a link
  const colors = [];
  //
  cols.forEach((col) => {
    // check if col is locked (<i> className = 'fa-lock')
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    //
    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    const color = generateRandomColor();
    // const color = chroma.random();

    // if <i> className = 'fa-lock' => return setRandomColors
    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    colors.push(color);

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.toString();
}

setRandomColors();
