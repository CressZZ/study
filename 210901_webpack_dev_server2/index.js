import a from './a';

console.log(a);

if (module.hot) {
  module.hot.accept('./a.js', function () {
    console.log('Accepting the updated printMe module!');
		console.log(a,'dddd');
  });
}
