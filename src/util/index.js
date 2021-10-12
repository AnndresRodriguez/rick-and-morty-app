export let species = {
  Human: { class: " img__specie--human" },
  Alien: { class: " img__specie--alien" },
  default: { class: " img__specie--default" },
};

export let states = {
  Alive: { class: "info__status--alive" },
  Dead: { class: "info__status--dead" },
  unknown: { class: " info__status--unknown" },
  default: { class: " info__status--default" },
};

export let genders = {
  Male: { class: "fa-male" },
  Female: { class: "fa-female" },
  unknown: { class: "fa-question-circle" },
  default: { class: "fa-genderless" },
};

export let origins = {
  Planet: { class: "fa-globe" },
  TV: { class: "fa-television" },
  default: { class: "fa-rss" },
};

export function getClassSpecie(specie) {
  try {
    return species[specie].class;
  } catch (error) {
    return species["default"].class;
  }
}

export function getClassStatus(status) {
  try {
    return states[status].class;
  } catch (error) {
    return states["default"].class;
  }
}

export function getClassGender(gender) {
  try {
    return genders[gender].class;
  } catch (error) {
    return genders["default"].class;
  }
}

export function getClassOrigin(origin) {
  try {
    return origins[origin].class;
  } catch (error) {
    return origins["default"].class;
  }
}

export function sanitizeText(text) {
  return text.trim().toLowerCase();
}

export function getNumberPage(text) {
  if (text !== null) {
    return text[text.length - 1];
  }
  return "";
}

export let filters = [
  { name: "All", key: "character" },
  { name: "Alive", key: "alive", param: "status" },
  { name: "Dead", key: "dead", param: "status" },
  { name: "Female", key: "female", param: "gender" },
  { name: "Male", key: "male", param: "gender" },
  { name: "Genderless", key: "genderless", param: "gender" },
  { name: "Unknown", key: "unknown", param: "gender" },
];

export function getRandomIDCharacter(min = 0, max = 671) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createArrayIds() {
  const LIMIT_CHARACTERS = 3;
  let ids = [];
  for (let index = 0; index < LIMIT_CHARACTERS; index++) {
    ids.push(getRandomIDCharacter());
  }
  return ids;
}
