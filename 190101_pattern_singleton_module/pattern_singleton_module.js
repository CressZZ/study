// 참조 내용
// http://arguments.callee.info/2009/07/09/javascript-design-patterns-module-singleton/


// 결론 
// 1. module 패턴
// 모듈은 
// ** "프로퍼티나, 메서드를 캡슐화" ** 하여 전역과 구분 짓는 패턴이다. 
// ** 클로저를 이용한다. **

// 2. singleton 패턴
// 모듈패턴을 이용하여 
// 프로퍼티나, 메서드를 캡슐화 하여 전역과 구분 짓는 패턴이지만,  
// 객체를 하나만 생성 할수 있다. 

// 3. module 패턴과 singleton 패턴의 차이 
// 모듈 패턴은 각각 다른 변수에 참조 시켜 여러 객체를 만들 수 있으나, 
// 싱글톤 패턴은 각각 다른 변수에 참조 시켜도 결국 모두 같은 객체이다. 

// 4. NOTE
// - 모듈 패턴을 쓰는 이유는 ** private member와 전역변수와의 구분을 위해서 ** 인 것 같다. 
// - 싱글톤이란게 원래는 객체 리털러 만으로도 할 수 있는데, ** private member와 전역변수와의 구분을 위해서 ** 모듈패턴을 접목 시켜 만든다. 
// - 즉 아래 예시는 "모듈 패턴을 사용하여" "싱글톤"을 만든 것 이라고 할 수 있다. 

// 모듈패턴 예시 
var makeModulePattern = function(){
    // private 
    var private = "private";
    var public = "public";

    function getPrivate(){
        return private
    }
    function setPrivate(newPrivate){
        private = newPrivate;
    }
    // 객체를 리턴한다. (* 중요 *)
    return {
        getPrivate, 
        setPrivate, 
        public
    }
}

var module1 = makeModulePattern();
var module2 = makeModulePattern();

module1.setPrivate('private2');

module1.getPrivate(); // private2
module2.getPrivate(); // private



// 싱글톤 예시 
var makeSingleton = (function(){
    // 싱글톤을 위한 instance 변수 
    var instance; 

    // private 
    var private = "private";
    var public = "public";

    function getPrivate(){
        return private
    }
    function setPrivate(newPrivate){
        private = newPrivate;
    }

    function init(){
        return {
            getPrivate, 
            setPrivate, 
            public
        }
    }

    return {
        getInstance: function(){
            if(!instance){
                instance = init();
            } 
                return instance;
        }
    }
})();

var singleton1 = makeSingleton.getInstance();
var singleton2 = makeSingleton.getInstance();

singleton1.public = "public_rev";
singleton1.setPrivate("private_rev");

singleton1.public // public_rev
singleton1.getPrivate() // private_rev

singleton2.public // public_rev
singleton2.getPrivate() // private_rev