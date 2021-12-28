/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function(nums1, nums2) {
    let nums = [];
    
    if (nums1.length === 0) nums = nums2;
    else if (nums2.length === 0) nums = nums1;
    else {
        
        let i = j = 0;
        while (true) {
            if (nums1[i] < nums2[j]) nums.push(nums1[i++]);
            else nums.push(nums2[j++]);

            if (i >= nums1.length) {
                nums = nums.concat(nums2.slice(j));
                break;
            } else if (j >= nums2.length) {
                nums = nums.concat(nums1.slice(i));
                break;
            }
        }
    }
    
    
    // console.log(nums);
    
    
    // let nums = nums1.concat(nums2)
    // nums.sort((a, b) => a - b);
    // // if odd
    if (nums.length % 2) {
        return nums[(nums.length - 1) / 2];
    }
    return (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;
    
};


// [ 1,  2,   3,   5,   7,  12,  14,  50, 60]
//    [561, 562, 564, 567, 569, 571, 572]

// 7