/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let val1 = str1.toLowerCase().split("").sort().join("");
  let val2 = str2.toLowerCase().split("").sort().join("");

  console.log("str1",val1);
  console.log("str2",val2)

  return val1 === val2;
}

module.exports = isAnagram;
