import { words } from "./words.mjs";

function isAWord(word) {
  return word in words;
}

function validCharacters(string) {
  return /^[a-zA-Z]+$/.test(string);
}

export { isAWord, validCharacters };
