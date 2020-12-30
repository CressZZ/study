# 클릭한후 드래그 하고 클릭한거 손가락에서 때면 target은 뭘로 나올까?
- https://javascript.info/mouse-events-basics
- Triggers after mousedown and then mouseup over the same element if the left mouse button was used.
- 만약 document 에 이벤트가 걸려 있다고 한다면 
- 그리고 아래의 dom 이 있다면

```html
	<div parent>
		<div child1></div>
		<div child2></div>
	</div>
```
- 그리고 child1 클릭후
- child2 에서 클릭을 때면
- event.target 은 parent 로 나온다. 
- 왜냐하면, 위에 영어 문장에서 알수 있듯이 마우스다운후에 마우스 업이 된 같은 엘레멘트에 트리거 된다고 했으니
- 그 두게가 동시에 이루어 진곳은 parent 가 된다. 
- 물로 클릭할때 당시는 child1 이 event.target 의 후보이나, 
- 드래그 하고 클릭을 때는 곳이 child2 므로, 두개가 동일하지 않으나, event.target 의 후보에서 탈락. 
- 그럼 그 이후 이벤트가 버블링 될거고 그러고 event.target 으로 선정된 곳이 바로바로 parent 가 되시겠다. 

