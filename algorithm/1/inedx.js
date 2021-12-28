
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
     let ms = []
     let hs=[]
     let ls=[]
    nums.forEach((num, i)=>{
        if(num === target/2){
            ms.push(i);
        }else if(num<target/2){
            ls.push(num)
        }else{
            hs.push(num)
        }
    })


    if(ms.length>1){
        return [ms[0], ms[1]]
    }

    for(let i =0; i<hs.length; i++){
        let targetLs = target -hs[i];
        let lsIndex = ls.indexOf(targetLs)
        if(lsIndex>-1){
            return [nums.indexOf(targetLs), nums.indexOf(hs[i])]
        }
    }

    return []

};

let a = twoSum([3,2,3], 6)
console.log(a)