/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
    const h = new Array(10^9)
    const l = nums.length
    for (let i = 0; i < l; i++) {
        const x = nums[i]
        const y = target - x
        if(h[y] === undefined) {
            h[x] = i
        } else {
            return [h[y], i]
        }
    }
    return []
};

let a = twoSum([3,2,3], 6)
console.log(a)