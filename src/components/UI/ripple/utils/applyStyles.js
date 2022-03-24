const getUppercaseIndexes = (word) => {
  // returns all indexes of Uppercase letters in a word
  const result = [];
  for (let i = 0, length = word.length; i < length; i++) {
    if (word[i] === word[i].toUpperCase()) {
      result.push(i);
    }
  }
  return result.length ? result : null;
};

const toHyphenCase = (item) => {
  // transforms camelCase to hyphen-case
  // transitionDuration -> transition-duration

  const uppercaseIndexes = getUppercaseIndexes(item);
  if (!uppercaseIndexes) return item;
  let pos = 0;
  let result = '';
  uppercaseIndexes.forEach((idx) => {
    result += item.slice(pos, idx) + `-${item[idx].toLowerCase()}`;
    pos = idx;
  });
  result += item.slice(pos + 1, item.length);
  return result;
};

export default function applyStyles(styles, elem) {
  for (let prop in styles) {
    if (styles.hasOwnProperty(prop)) {
      const name = toHyphenCase(prop);
      elem.style.setProperty(name, styles[prop]);
    }
  }
}
