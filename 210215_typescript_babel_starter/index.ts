import {test1, StringValidator} from './test1';
import {test2} from './test2';
import axios from 'axios';
test1('a');
test2('b');

export function test(a: string): StringValidator{
	console.log(a);
	return {isAcceptable: true}; 
}
test('s');
console.log(axios);