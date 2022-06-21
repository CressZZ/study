https://stackoverflow.com/questions/60131681/make-sure-array-has-all-types-from-a-union/60132060#60132060


15

Taking ideas from this answer, you can make a function that type-checks by using a type parameter of the passed array, T. Type it as T extends Colors[] to make sure every item of the array is in Colors, and also type it as [Colors] extends [T[number]] ? unknown : 'Invalid' to make sure every item of the Colors type is in the passed array:

type Colors = 'red' | 'blue' | 'pink';
const arrayOfAllColors = <T extends Colors[]>(
  array: T & ([Colors] extends [T[number]] ? unknown : 'Invalid')
) => array;

const missingColors = arrayOfAllColors(['red', 'blue']); // error
const goodColors = arrayOfAllColors(['red', 'blue', 'pink']); // compiles
const extraColors = arrayOfAllColors(['red', 'blue', 'pink', 'bad']); // error
More generically, wrap it in another function so you can pass and use a type parameter of the union type:

type Colors = 'red' | 'blue' | 'pink';
const arrayOfAll = <T>() => <U extends T[]>(
  array: U & ([T] extends [U[number]] ? unknown : 'Invalid')
) => array;
const arrayOfAllColors = arrayOfAll<Colors>();

const missingColors = arrayOfAllColors(['red', 'blue']); // error
const goodColors = arrayOfAllColors(['red', 'blue', 'pink']); // compiles
const extraColors = arrayOfAllColors(['red', 'blue', 'pink', 'bad']); // error