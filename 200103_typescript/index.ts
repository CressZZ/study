interface GenericIdntityFn{
    <T>(arg: T): T;
}

let myIdentity: GenericIdntityFn = function <T>(arg: T): T {
    return arg;
};

myIdentity<number>(1);

/**************************************************************************/

interface GenericIdntityFn_2<T> {
    (arg: T): T;
}

let myidentity_2: GenericIdntityFn_2<string> = function(arg){
    return arg;
};

myidentity_2('aa');

/******************************************/

enum Direction {
    up = 1,
}
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  //<- 오류
};