const ICON_WIDTH = 100,
  ICON_HEIGHT = 120,
  NUM_ICONS = 7,
  TIME_PER_ITEM = 50,
  INDEXES = [0, 0, 0, 0, 0],
  ICON_MAP = [
    "diamond",
    "none",
    "watermellon",
    "cherry",
    "plum",
    "lemon",
    "star",
  ],
  BET = [100000, 200000, 500000, 1000000, 2000000, 5000000, 15000000, 20000000];


const BTN_SPIN = document.querySelector("#button-spin");
let widthDeviceElement = document.querySelector("#width-device");

const roll = (reel, offset = 0) => {
  const delta =
    (offset + 2) * NUM_ICONS + Math.round(Math.random() * NUM_ICONS);
  const style = getComputedStyle(reel),
    backgroundPositionY = parseFloat(style["background-position-y"]),
    targetBackgroundPositionY = backgroundPositionY + delta * ICON_HEIGHT,
    normTargetBackgroundPositionY =
      targetBackgroundPositionY % (NUM_ICONS * ICON_HEIGHT);

  return new Promise((resolve, reject) => {
    reel.style.transition = `background-position-y ${
      6 + delta * TIME_PER_ITEM
    }ms`;
    reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

    setTimeout(() => {
      reel.style.transition = `none`;
      reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
      resolve(delta % NUM_ICONS);
    }, 6 + delta * TIME_PER_ITEM);
  });
};
const rollAll = () => {
  const REEL_LIST = document.querySelectorAll(".main-container > .reel");

  Promise.all([...REEL_LIST].map((reel, i) => roll(reel, i))).then((deltas) => {
    deltas.forEach(
      (delta, i) => (INDEXES[i] = (INDEXES[i] + delta) % NUM_ICONS)
    );
    INDEXES.map((index) => console.log(ICON_MAP[index]));
  });
};

BTN_SPIN.addEventListener("click", () => {
  rollAll();

  BTN_SPIN.disabled = true;
  BTN_SPIN.classList.remove("button-active");
  BTN_SPIN.classList.add("button-disabled");
  setTimeout(() => {
    BTN_SPIN.disabled = false;
    BTN_SPIN.classList.add("button-active");
    BTN_SPIN.classList.remove("button-disabled");
  }, 2000);
});
