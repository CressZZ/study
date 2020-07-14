"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("regenerator-runtime/runtime.js");

require("core-js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var test = function () {
	function test() {
		_classCallCheck(this, test);

		[1.3].includes(1);
		[1, 2, 3].map(function (e) {
			return e + 2;
		});
	}

	_createClass(test, [{
		key: "test",
		value: async function test() {
			return 1;
		}
	}]);

	return test;
}();
