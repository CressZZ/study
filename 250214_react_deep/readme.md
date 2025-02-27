

# 개요
## 01  [React 까보기 시리즈] 개요(feat. Fiber vs Stack)
## 02  [React 까보기 시리즈] React 구성요소인 reconciler, renderer 등의 내부 패키지 & fiber, rendering 등의 용어 정의
## 03  [React 까보기 시리즈] Virtual DOM 이 자바스크립트 객체라고? render phase 와 commit phase 로 나누어서 동작 원리 살펴보기

# useState, setState
## 04  [React 까보기 시리즈] useState 가 코드로 정의된 곳은 어디일까? reconciler 까지 찾아가기!
## 05  [React 까보기 시리즈] renderWithHooks 함수? useState 를 할당하는 과정 코드 까보기?!
## 06  [React 까보기 시리즈] useState 의 state 는 어떤 코드로 쓰여있나?!
## 07  [React 까보기 시리즈] setState 를 여러번 호출하면 실제로 상태를 여러번 업데이트할까?(상태를 업데이트 하기 위해 queue 에 저장하고 소비하는 과정)
## 08  [React 까보기 시리즈] setState 를 호출하는 2가지 상황, idle 과 render phase 를 구분하는 조건문?!
## 09  [React 까보기 시리즈] setState 를 호출했을 때, render phase 에서 벌어지는 일?!(render phase 에서 update 를 저장하고 소비하는 과정)

# UPDATE
## 10  [React 까보기 시리즈] hook 이 상태를 업데이트하는 과정 요약 & scheduler 개관
## 11  [React 까보기 시리즈] reconciler가 WORK를 스케줄링하기 위한 사전작업
## 12  [React 까보기 시리즈] 리액트 입장에서는 어떤 이벤트를 먼저 처리해야할까? (expirationTime 값의 의미)
## 13  [React 까보기 시리즈] 리액트 16버전에서 대부분의 UPDATE 를 처리하는 방법(feat. Sync)
## 14  [React 까보기 시리즈] 리액트가 처리중인 WORK 의 우선순위를 비교하는 방법 (ensureRootIsScheduled)
## 15  [React 까보기 시리즈] Fiber 구조로 가능해진 Concurrent mode 와 Sync WORK 를 처리하는 방법?

# 스케쥴러
## 16  [React 까보기 시리즈] Scheduler 시작!Task 까보기
## 17  [React 까보기 시리즈] 리액트에서 concurrent mode 가 가능해진 이유? timerQueue 와 taskQueue 의 활용
## 18  [React 까보기 시리즈] 리액트가 WORK 를 처리하다가 브라우저에게 thread 를 양보하는 이유?(user event 처리와 브라우저의 렌더링 프로세스)
## 19  [React 까보기 시리즈] 리액트가 브라우저에게 메인 쓰레드를 양보할 타이밍을 아는 방법(isInputPending API)

# WORK
## 20  [React 까보기 시리즈] Scheduler 에서 다시 Reconciler 로!(Task 를 처리하여 WORK 수행)
## 21  [React 까보기 시리즈] React element 와 component 종류와 정의에 대해(host component? custom component?)
## 22  [React 까보기 시리즈] React component 가 return 하는 html 은 babel 을 만나서 어떻게 변할까?(createElement 함수 까보기)
## 23  [React 까보기 시리즈] Fiber 생성 과정
## 24  [React 까보기 시리즈] Virtual DOM 의 맨 위에는 어떤 node 가 있을까? root node 까보기(feat. CRA)

# 스케쥴러 & WORK
## 25  [React 까보기 시리즈] 리액트가 WORK 를 스케줄링하는 과정을 까보자

# concurrent 동시성
## 26  [React 까보기 시리즈] React concurrent mode 맛보기? performConcurrentWorkOnRoot 까보기
## 27  [React 까보기 시리즈] concurrent WORK 은 어떻게 sync WORK이 되는가(performSyncWorkOnRoot)

# workInProgress
## 28  [React 까보기 시리즈] VDOM 의 workInProgress tree 를생성(초기화)하는 배경은 어떤 것이 있을까?
## 29  [React 까보기 시리즈] createWorkInProgress 함수 까보기 객체를 재활용하는 방법?
