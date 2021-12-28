/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
//  var findMedianSortedArrays = function(nums1, nums2) {
//     // let set = new Set(nums1.concat(nums2))
//     // let size = set.size
//     let set = nums1.concat(nums2)
//     let size = set.length
//     let sorted = [...set].sort((a,b)=>a-b)
//     if(size%2 === 0 ){
//         return (sorted[size/2] + sorted[(size/2)-1])/2
//     }else{
//         return sorted[(size/2)-0.5]
//     }
// };

var findMedianSortedArrays = function(nums1, nums2) {
    let i = 0;
    let j = 0;
    let set = [];
    while(true){
        if(nums1[i]>nums2[j]) set.push(nums2[j++]);
        else set.push(nums1[i++]);
        if(i >= nums1.length){
            set = set.concat(nums2.slice(j))
            break;
        }else if(j >= nums2.length){
            set = set.concat(nums1.slice(i))
            break;
        }

    }
    let size = set.length;
    if(size%2 === 0 ){
        return (set[size/2] + set[(size/2)-1])/2
    }else{
        return set[(size/2)-0.5]
    }
};

console.log(findMedianSortedArrays([], [1]))