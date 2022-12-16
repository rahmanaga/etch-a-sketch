const container = document.querySelector(".container");
// create 16*16 grid of square divs
for (let index = 1; index < 257; index++) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("item");
  newDiv.style.width = "40px";
  container.appendChild(newDiv);
}
