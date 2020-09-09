var myIdentity = function (arg) {
    return arg;
};
myIdentity(1);
var myidentity_2 = function (arg) {
    return arg;
};
myidentity_2('aa');
/******************************************/
var Direction;
(function (Direction) {
    Direction[Direction["up"] = 1] = "up";
})(Direction || (Direction = {}));
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button); //<- 오류
};
