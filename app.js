const container = document.querySelector(".container");
// generate num*num grid of square divs in container
const generateDivs = function (num = 16) {
  for (let i = 1; i < num ** 2 + 1; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.style.width = `${640 / num}px`;
    container.appendChild(newDiv);
  }
};

// generate 16*16 grid
generateDivs();

// Borrowed this function from CSSTricks
function RGBToHSL(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}
// Create random numbers
const randomNums = function () {
  const h = Math.floor(Math.random() * 365) + 1;
  const s = Math.floor(Math.random() * 100) + 1;
  const l = 50;

  return { h, s, l };
};
// Add event listener for hovering to each div we just created
// First time assign random color
// Then each time reduce ligthening by five until its zero
const colorize = function (e) {
  if (e.target.style.backgroundColor === "") {
    const { h, s, l } = randomNums();
    e.target.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  } else {
    const currentColor = e.target.style.backgroundColor;
    const arrayColor = currentColor
      .slice(4, currentColor.length - 1)
      .split(",");
    const [r, g, b] = arrayColor;
    const { h, s, l } = RGBToHSL(+r, +g, +b);
    e.target.style.backgroundColor = `hsl(${h}, ${s}%, ${
      l - 5 >= 0 ? l - 5 : 0
    }%)`;
  }
};

const selectItems = () => {
  const newItems = document.querySelectorAll(".item");
  newItems.forEach((item) => {
    item.addEventListener("mouseenter", colorize);
  });
  return newItems;
};

selectItems();

const newGridBtn = document.querySelector("#new");
const clearBtn = document.querySelector("#clear");

// Removes all the divs inside container
const removeDivs = function () {
  const childCount = container.childElementCount;
  for (let i = 1; i <= childCount; i++) {
    const element = container.firstElementChild;
    container.removeChild(element);
  }
};
// Remove the background color of all the divs inside the container
const clearDivs = function () {
  const children = container.children;
  for (let i = 0; i < children.length; i++) {
    const element = children[i];
    element.style.backgroundColor = "";
  }
};

newGridBtn.addEventListener("click", () => {
  const input = +prompt("Enter grid size...(max-100)");
  if (isNaN(input) || input < 5) {
    alert("Please enter a valid number(5-100)");
    return;
  } else if (input > 100) {
    alert("Please enter a lower number than 100");
    return;
  } else {
    removeDivs();
    generateDivs(input);
    selectItems();
  }
});

clearBtn.addEventListener("click", clearDivs);
