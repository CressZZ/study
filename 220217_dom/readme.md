# dom vs dom tree vs node
https://www.digitalocean.com/community/tutorials/introduction-to-the-dom
https://www.digitalocean.com/community/tutorials/understanding-the-dom-tree-and-nodes

- The DOM is often referred to as the DOM tree, and consists of a tree of objects called nodes.
- `DOM`은 `DOM tree` 라고 불리기도 하고, DOM은 `노드 라고불리는 객체`들의 트리로 구성 됩니다.
- 노드는 많은 유형의 노드가 있지만 가장 자주 사용하는 세 가지 주요 노드가 있습니다.
  - 요소 노드
  - 텍스트 노드
  - 주석 노드
  
- The DOM represents the document as nodes and objects; (https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

https://stackoverflow.com/questions/9979172/difference-between-node-object-and-element-object
- So, in a nutshell, a node is any DOM object.
- 그래서, 간단히 말하면 노드는 모든 DOM 객체입니다.

# eventTarget, node, element
EventTarget > Node > Element


# https://ko.javascript.info/searching-elements-dom
id에 대응하는 전역변수는 명세서의 내용을 구현해 만들어진 것으로 표준이긴 하지만 하위 호환성을 위해 남겨둔 동작입니다.

브라우저는 스크립트의 네임스페이스와 DOM의 네임스페이스를 함께 사용할 수 있도록 해서 개발자의 편의를 도모합니다. 그런데 이런 방식은 스크립트가 간단할 땐 괜찮지만, 이름이 충돌할 가능성이 있기 때문에 추천하는 방식은 아닙니다. HTML을 보지 않은 상황에서 코드만 보고 변수의 출처를 알기 힘들다는 단점도 있습니다.

본 튜토리얼에선 간결성을 위해 요소의 출처가 명확한 경우, id를 사용해 요소에 직접 접근하는 방법을 사용할 예정입니다.

실무에선 document.getElementById를 사용하시길 바랍니다.