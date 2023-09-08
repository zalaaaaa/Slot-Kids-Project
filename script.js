const ICON_WIDTH = 250,
  ICON_HEIGHT = 300,
  NUM_ICONS = 6,
  TIME_PER_ITEM = 50,
  INDEXES = [0, 0, 0, 0, 0];

const BTN_SPIN = document.querySelector("#button-spin");

const roll = (reel, offset = 0) => {
  const random =
    (offset + 2) * NUM_ICONS + Math.round(Math.random() * NUM_ICONS);
  const style = getComputedStyle(reel),
    backgroundPositionY = parseFloat(style["background-position-y"]);
  reel.style.transition = `background-position-y ${
    5 + random * TIME_PER_ITEM
  }ms`;
  reel.style.backgroundPositionY = `${
    backgroundPositionY + random * ICON_HEIGHT
  }px`;
};
const rollAll = () => {
  const REEL_LIST = document.querySelectorAll(".main-container > .reel");
  [...REEL_LIST].map((reel, i) => {
    roll(reel, i);
  });
};

