
// 캐싱 스토리지에 저장될 파일 이름
var CACHE_NAME = 'pwa-offline-v1';
// 캐싱할 웹 자원(이미지, css의 목록등)
var filesToCache = [
  '/',
  '/css/appsds,css',
];

// 서비스 워커 설치 (웹 자원 캐싱)
self.addEventListener('install', function (event) {
  event.waitUntil(
    // 캐싱 스토리지에서 CACHE_NAME이라는 변수를 생성한다. pwa 파일을 만든다. 
    caches.open(CACHE_NAME)
      .then(function(cache){
        // pwa 파일에 다 집어 넣어라
        cache.addAll(filesToCache)
          .catch(function(err){
            return console.log('err: ', err)
          })
      })
  );

})