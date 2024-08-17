exports.kmpSearch = function(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const lps = buildLPSArray(pattern);
  let i = 0;
  let j = 0;

  while (i < n) {
    if (pattern[j].toLowerCase() === text[i].toLowerCase()) {
      i++;
      j++;
    }
    if (j === m) {
      return true;
    } else if (i < n && pattern[j].toLowerCase() !== text[i].toLowerCase()) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return false;
}

exports. buildLPSArray=function (pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let length = 0;
  let i = 1;

  while (i < m) {
    if (pattern[i].toLowerCase() === pattern[length].toLowerCase()) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}
