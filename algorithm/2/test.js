/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    if (!s) { return 0;}
    let start = 0;
    let end = 0;
    let maxLength = 0;
    const uniqueChar = new Set();
    while (end< s.length) {
        if (!uniqueChar.has(s[end])) {
            uniqueChar.add(s[end]);
            end++;
            maxLength=Math.max(maxLength,uniqueChar.size);
        } else {
            uniqueChar.delete(s[start]);
            start++;
        }
    }
    return maxLength;
};