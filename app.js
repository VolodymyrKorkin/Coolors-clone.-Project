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

function setRandomColors(isInitial) {
  // arr colors is to save set of colors to passing a link
  // if first load, make arr from hash (getColorsFromHash()), else set empty arr
  const colors = isInitial ? getColorsFromHash() : [];
  //
  cols.forEach((col, index) => {
    // check if col is locked (<i> className = 'fa-lock')
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    //
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    // if <i> className = 'fa-lock' => return setRandomColors
    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    // if first load => take colors from hash, else => generate randomly
    const color = isInitial
      ? colors[index]
        ? // checking if color index exist => colors[index], else generateRandomColor()
          colors[index]
        : generateRandomColor() //
      : generateRandomColor();
    // const color = chroma.random();

    //if not first load => add color to arr colors
    if (!isInitial) {
      colors.push(color);
    }

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
  document.location.hash = colors
    .map((col) => {
      return col.substring(1);
    })
    .join("-");
}

// return array of colors from hash string (e.g. #0F6211-CE76FA-E6B9A5-A51F72-5D08DA)
function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }

  return [];
}

// initial(first time) set = true (setRandomColors(isInitial) === true)
setRandomColors(true);
