# pwa 도중 애러 발생

# 현황
브라우저 알림 받기 끄고, 다시 브라우저 알림 받기 키고 
firebase 의 messaging.getToken() 을 실행하면
firebase 가 [POST]https://fcm.googleapis.com/fcm/connect/unsubscribe 를 보내는데
여기서 404 애러가 떨어진다.

 errors.ts:102 Uncaught FirebaseError: Messaging: A problem occured while unsubscribing the user from FCM: FirebaseError: Messaging: A problem occured while unsubscribing the user from FCM: Requested entity was not found. (messaging/token-unsubscribe-failed). (messaging/token-unsubscribe-failed).
    at IidModel.<anonymous> (https://rc-wstatic.plaync.co.kr/pwa/lineage2m/js/pwa.js?_=2002032023:1542:44)
    at step (https://rc-wstatic.plaync.co.kr/pwa/lineage2m/js/pwa.js?_=2002032023:3311:23)
    at Object.next (https://rc-wstatic.plaync.co.kr/pwa/lineage2m/js/pwa.js?_=2002032023:3292:53)
    at fulfilled (https://rc-wstatic.plaync.co.kr/pwa/lineage2m/js/pwa.js?_=2002032023:3282:58)

# firebase@6.6.2 코드를 보면 
github 주소 : https://github.com/firebase/firebase-js-sdk
클론받고
6.6.2 태그가 찍힌 브랜치로 이동하여 아래 파일을 살펴보자 
firebase-js-sdk/packages/messaging/src/controllers/base-controller.ts
firebase-js-sdk/packages/messaging/src/models/iid-model.ts

# 참고 
npm install 로 source-map-loader 를 설치하고 
웹팩에서 아래 코드를 추가하면 
```js
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
```
실제로 내가 사용하는 번들된 js 파일에서 
node_modules 에 대한 디버깅도 할수 있다. 
즉, firebase@6.6.2 를 라이브러리로 사용하는 나의 pwa.js 에서도 firebase@6.6.2 의 디버깅이 가능해진다. 
물론 이경우에 node_modules 의 firebase 가 sourcemap 을 제공하기에 가능한 일이다. 

# 왜 애러가 나는가
일단 firebase 코드를 살펴 보면
```js
//firebase-js-sdk/packages/messaging/src/controllers/base-controller.ts

  async getToken(): Promise<string | null> {
    // Check with permissions
    const currentPermission = this.getNotificationPermission_();
    if (currentPermission === 'denied') {
      throw errorFactory.create(ErrorCode.NOTIFICATIONS_BLOCKED);
    } else if (currentPermission !== 'granted') {
      // We must wait for permission to be granted
      return null;
    }

    const swReg = await this.getSWRegistration_();
    const publicVapidKey = await this.getPublicVapidKey_();
    // If a PushSubscription exists it's returned, otherwise a new subscription
    // is generated and returned.
    const pushSubscription = await this.getPushSubscription(
      swReg,
      publicVapidKey
    );
    const tokenDetails = await this.tokenDetailsModel.getTokenDetailsFromSWScope(
      swReg.scope
    );

    if (tokenDetails) {
      return this.manageExistingToken(
        swReg,
        pushSubscription,
        publicVapidKey,
        tokenDetails
      );
    }
    return this.getNewToken(swReg, pushSubscription, publicVapidKey);
  }

    /**
   * Gets a PushSubscription for the current user.
   */
  getPushSubscription(
    swRegistration: ServiceWorkerRegistration,
    publicVapidKey: Uint8Array
  ): Promise<PushSubscription> {
    return swRegistration.pushManager.getSubscription().then(subscription => {
      if (subscription) {
        return subscription;
      }

      return swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey
      });
    });
  }
```
getToken 을 실행하면 getPushSubscription 함수를 통해 
swRegistration.pushManager.getSubscription을 새로 가져 오게 되는데 subscription 이 비어져 있었으면 subscription객체를 subscribe()를 통해 새로 생성한다. 
그런데, 브라우저에서 알림으르 끄는순간 subscription 은 날아가 버리기 때문에 
새로 키게 되면 매번 새로운 subsciption객체를 생성해 버리고 만다. 

**참고로**
브라우저 알림을 껏다 키면서 아래의 코드를 console 창에 실행 해보면 안다. 
```js
var registration = await navigator.serviceWorker.register('/service-worker.js');
registration.pushManager.getSubscription().then(s=>console.log(s))
```
아무튼 그이후에 firebase 는 subsciption 객체가 가지고 있는 정보와, 자기가 아까 저장했던 indexedDB에 저장한 subscription 정보(한번이라도 getToken()을 실행했을경우 생긴다.)를 비교하는데, 
이게 같을리가 없다. 

그래서 unsubscription 로직을 실행하는데 여기서 404 애러를 밷는다.

```js
//firebase-js-sdk/packages/messaging/src/models/iid-model.ts

  async deleteToken(
    senderId: string,
    fcmToken: string,
    fcmPushSet: string
  ): Promise<void> {
    const fcmUnsubscribeBody =
      `authorized_entity=${senderId}&` +
      `token=${fcmToken}&` +
      `pushSet=${fcmPushSet}`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const unsubscribeOptions = {
      method: 'POST',
      headers,
      body: fcmUnsubscribeBody
    };

    try {
      const response = await fetch(
        ENDPOINT + '/fcm/connect/unsubscribe',
        unsubscribeOptions
      );
      const responseData: ApiResponse = await response.json();
      if (responseData.error) {
        const message = responseData.error.message;
        throw errorFactory.create(ErrorCode.TOKEN_UNSUBSCRIBE_FAILED, {
          errorInfo: message
        });
      }
    } catch (err) {
      throw errorFactory.create(ErrorCode.TOKEN_UNSUBSCRIBE_FAILED, {
        errorInfo: err
      });
    }
  }
```

# 왜 애러를 밷을까
...firebase 서버에 들어가서 코드를 봐야 알거 같은데.......... 여기서는 알수가 없다. 

# 그럼 이제 어쩌지?
일단 예전 버전(라이브 firebase 버전은 6.3.4 (August 1, 2019) 라고 위키에 적어 놓앗다.) 돌려 보고,
(package.json의 캐럿 때문에 버전이 자동으로 올라갔다.) 

# 버전 내리는 것은 소용없다. 
아 진짜 예전에는 이런 애러가 없었다. 
있을 수가 없는데!
내가 테스트를 몇번을 했는데

# 버전을 올려 보라고 한다. 
https://github.com/firebase/firebase-js-sdk/issues/2469

2364번 이슈의 경우 firebase 7.0.0 을 사용했는데 발생하는 애러로
현재 환경과 상황이 조금 다르지만, 결국은 같은 이유로 같은 애러가 나오는 것으로 보인다. 
https://github.com/firebase/firebase-js-sdk/issues/2364

두상황 보두 최신버전으로 올리라고 한다.

# 버전을 latest로 올리니 그냥 해결이 되긴하는데 테스트를 좀더 해보고 라이브에 반영 해야 할것 같다. 
firebase@7.24.0

# 추가 내용으로 7.24.0 의 경우
같은 상황에서 
[DELETE] https://fcmregistrations.googleapis.com/v1/projects/gamefcmwebpush/registrations/ 
가 404로 실패하고 

아래와 같이 console 에 비슷한 메시지를 뿌린다. 
```js
FirebaseError: Messaging: A problem occurred while unsubscribing the user from FCM: FirebaseError: Messaging: A problem occurred while unsubscribing the user from FCM: Requested entity was not found. (messaging/token-unsubscribe-failed). (messaging/token-unsubscribe-failed).
    at https://rc-wstatic.plaync.co.kr/pwa/lineage2m/js/pwa.js?_=2002032023:3318:41
    at step (https://rc-wstatic.plaync.co.kr/pwa/lineage2m/js/pwa.js?_=2002032023:14653:23)
    at Object.next (https://rc-wstatic.plaync.co.kr/pwa/lineage2m/js/pwa.js?_=2002032023:14634:53)
    at fulfilled (https://rc-wstatic.plaync.co.kr/pwa/lineage2m/js/pwa.js?_=2002032023:14624:58)
```

그러나 애러메시지는 warning으로 출력되며 뒤이어
[POST] https://fcmregistrations.googleapis.com/v1/projects/gamefcmwebpush/registrations
를 통해 새로운 토큰을 받아온다. 

[POST] https://fcmregistrations.googleapis.com/v1/projects/gamefcmwebpush/registrations 은 구버전의
[POST]https://fcm.googleapis.com/fcm/connect/subscribe 과 비슷한 역할을 하는 것으로 보이며

아무튼 애러가 튀어나와도 토큰을 다시 받아온다는 것이 구버전과 7.24.0 버전의 차이이다.


