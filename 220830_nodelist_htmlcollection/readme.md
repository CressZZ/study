# https://stackoverflow.com/questions/15763358/difference-between-htmlcollection-nodelists-and-arrays-of-objects

두 인터페이스 모두 DOM 노드의 모음입니다. 제공하는 방법과 포함할 수 있는 노드 유형이 다릅니다. NodeList는 모든 노드 유형을 포함할 수 있지만 HTMLCollection은 Element 노드만 포함해야 합니다.
HTMLCollection은 NodeList와 동일한 메서드와 추가로 namedItem이라는 메서드를 제공합니다.

# NodeList - querySelectorAll
- DOM 노드의 모음
- 모든 노드 유형을 포함할수 있다. - 태그 이름으로도 검색 가능 하니까
- 유사 배열이니까 배열 매서드를 그냥은 못쓴다
- 자체적으로 forEach를 제공한다. 

# HTMLCollection - getElementsByClassName
- DOM 노드의 모음 
- Element 노드만 포함한다.
- 유사 배열이니까 배열 매서드를 그냥은 못쓴다


# (큼) EventTarget > Node > Element (작음)