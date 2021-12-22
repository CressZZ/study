# requestAnimationFrame
https://dev.opera.com/articles/better-performance-with-requestanimationframe/

# setTimeout / setInterval 의 단점
## JavaScript timers continue to work even in background tabs, and even when the corresponding browser window is minimized.
- 다른탭을 사용중경우 뿐 아니라 브라우저를 최소화 했을때도, 타이머는 돌아간다. 

## not only do timers continue to run for invisible animations, but when their time is up they also always enqueue their callback functions.
- 설정한 시간보다, 콜백 함수의 연산이 오래 걸리면, 콜백 함수의 연산이 안끝나도 다음 콜백을 콜스택에 넣어 버린다. (무한히 쌓일수 있다)

## Both can only redraw animations at a fixed rate, so to make sure the animation is smooth, we tend to err on the side of caution and choose a frequency slightly higher than the display refresh rate. 
- 설정한 시간내에 콜백함수 연산이 먼저 끝나도 문제가 있다. 타이머는 정해진 시간마다 실행되는데, 사용자는 부드러운 움직임을 위해 모니터의 한계치보다 더 자주 함수를 실행하게 할것이다. (그러니까 60프레임을 지원하는 모니터인데, 사용자가 혹시 모르니 100 프레임으로 동작하게 타이머를 만든다는 이야기). 그러면 불필요한 draw가 생기고, 이 draw는 화면에 보여지기 전에 파괴 될것이다.

# requestAnimationFrame 의 장점
## First, it only draws the animations that will be visible to the user. That means no CPU power or battery life is wasted drawing animations that are running in background tabs, minimized windows, or otherwise hidden parts of a page.
- 벡그라운드에서 실행 안됨 (실제로 모니터에 탭이 있을때만 실행됨 )
## Second, frames are only drawn when the browser is ready to paint and there are no ready frames waiting to be drawn. This means that it’s impossible for an animation drawn using requestAnimationFrame to enqueue more than one callback function or to stall the browser.
- 브라우저가 그릴준비가 되어 있을때만 그린다. 하나의 콜백 함수의 연산이 다끝나야 다음 콜백은 콜스텍에 넣는다.

## Third, since frames are only drawn when the browser is ready to paint and there are no ready frames waiting to be drawn, there are no unnecessary frame draws. So animations are smoother and CPU and battery use are optimized further.
- 불필요한 draw가 없다. 

# requestAnimationFrame 의 단점
- 타이머 처럼 자동으로 연속적으로 콜백이 실행되게 할수 없다. 후속 애니메이션 프레임이 필요한 경우 콜백 함수 내에서 requestAnimationFrame을 다시 호출해야 합니다. 애니메이션을 중지해야 하는 경우 cancelAnimationFrame(id)을 사용할 수 있습니다.
- 정확히 언제 draw할지 정할수 없다. 브라우저가 그릴 준비가 됬을때 그린다. 
- 두개의 애니메션이 있을때, 두개가 항상 똑같이 움직인다고 볼수 없다. 화면에 보이지 않는 애니메이션은 멈춰 있을 테니까

# example
```js

var requestId = 0;
var animationStartTime = 0;

function animate(time) {
	var frog = document.getElementById("animated");
	frog.style.left = (50 + (time - animationStartTime)/10 % 300) + "px";
	frog.style.top = (185 - 10 * ((time - animationStartTime)/100 % 10) + ((time - animationStartTime)/100 % 10) * ((time - animationStartTime)/100 % 10) ) + "px";
	var t = (time - animationStartTime)/10 % 100;
	frog.style.backgroundPosition = - Math.floor(t / (100/2)) * 60+ "px";
	requestId = window.requestAnimationFrame(animate);
}
function start() {
	animationStartTime = window.performance.now();
	requestId = window.requestAnimationFrame(animate);
}
function stop() {
	if (requestId)
	window.cancelAnimationFrame(requestId);
	requestId = 0;
}

```