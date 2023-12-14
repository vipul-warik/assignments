/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {

  let str1 = str.toLowerCase().split().join("");
  let n = str1.length;
  let i=0;
  let j=n-1;
  let regex = /^[a-zA-Z]+$/;

  while(i<j){

    if(!regex.test(str1.charAt(i))) {
      i++;
      continue;
    }
    
    if(!regex.test(str1.charAt(j))) 
    {
      j--;
      continue;
    }

    if(str1.charAt(i)!==str1.charAt(j))
    return false;
    
    i++;
    j--;
  }

  return true;
}

module.exports = isPalindrome;
