
// const findObject = (list) => {
// 	const test = list.find((item) => {
//   	const { idx, children } = item;

//     if (idx === 20) return item;

//     if (children.length) {
//     	const result = findObject(children);
//     	console.log(idx, result);
//       return result;
//     }
//   });
// 	console.log('!!', test);
//   return test;
// };
// console.log(findObject(arr));
const arr = [
	{ idx: 10, children: [] },
	{
		idx: 12, children: [
			{ idx: 20, children: [] },
			{
				idx: 30, children: [
					{ idx: 40, children: [] }
				]
			}
		]
	},
	{ idx: 50, children: [
    { idx: 60, children: [] },
			{
				idx: 90, children: [
					{ idx: 100, children: [] }
				]
			}
  ] }
];


// 2번
function findObject(list){
  let result = find(list);

  if(result){
    return result;
  }

  let childList = filterChildList(list);  
  if(!childList){
    return false;
  }
  
  return findObject(childList);

}

function filterChildList(list){
  let _childList = []
  list.forEach((item)=>{
    if(item.children.length > 0) {
      _childList = _childList.concat(item.children)
    } 
  });

  return _childList;

}

// object 반환
function find(list){
  return list.find((item)=>{
    return item.idx === 60;
  })
}

var test = findObject(arr)
console.log(test)



// 1번

function findObject2(list){
  let result = find2(list);

  if(result){
    return result;
  }

  list.forEach((item)=>{
    if(item.children.length){
      result = findObject2(item.children);
      if(result){
        return;
      }
    }
  })
  
  return result;
}

// object 반환
function find2(list){
  return list.find((item)=>{
    return item.idx === 90;
  })
}

var test2 = findObject2(arr)
console.log(test2)
