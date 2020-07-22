const path = require('path');

console.log(__dirname);
console.log(__filename);

console.log(path.join(__dirname,"app"));


var counter = (function(){
    var i = 0;
    return {
        get: function(){
            return i;
        },
        set: function(newValue){
            i = newValue;
        },
        increment: function(){
            return i++;
        }
    }
})();

module.exports = counter;
