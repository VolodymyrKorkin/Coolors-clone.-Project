const cols = document.querySelectorAll(".col");

// add event listener to change colors by pressing 'space'
document.addEventListener("keydown", (event) => {
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

function setRandomColors() {
  cols.forEach((col) => {
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    const color = generateRandomColor();
    // const color = chroma.random();

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

setRandomColors();
