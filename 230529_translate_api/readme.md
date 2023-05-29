# Google cloude
## GCP - Google Cloude Platform 란
- laaS, PaaS, 각종 API다양한걸 제공,
## GCP - translate API
- 번역 API

## 인증 방법

### 클라이언트 라이브러리(npm package) 
- 클라이언트 라이브러리를 사용하면 지원되는 언어로 Google Cloud API에 쉽게 액세스할 수 있습니다. 서버에 원시 요청을 수행해서 Google Cloud API를 직접 사용할 수 있지만 클라이언트 라이브러리는 작성할 코드 양을 크게 줄여 주는 간소화 기능을 제공합니다. 이는 클라이언트 라이브러리가 애플리케이션 기본 사용자 인증 정보(ADC)를 지원하기 때문에 특히 더 그렇습니다.
- 로컬 개발 환경의 경우 gcloud CLI를 사용하여 사용자 인증 정보로 ADC를 설정할 수 있습니다. 
- 프로덕션 환경의 경우 `서비스 계정`을 연결하여 ADC를 설정합니다.

## 인증 방법중 하나. 클라이언트 라이브러리(npm package) 사용 + gcloude CLI - SDK (ADC)
- 설치: https://cloud.google.com/sdk/docs/install-sdk?hl=ko
- gcloud auth application-default login 명령어를 실행하여 `ADC`에 사용자 인증 정보를 제공
- 프로젝트 변경 방법 : gcloud auth application-default set-quota-project YOUR_PROJECT

## 인증 방법중 둘. 클라이언트 라이브러리(npm package) 사용 + gcloude CLI - SDK (서비스 계정 키)
- GOOGLE_APPLICATION_CREDENTIALS 환경 변수를 서비스 계정 키가 포함된 JSON 파일의 경로로 설정합니다. 이 변수는 현재 셸 세션에만 적용되므로, 새 세션을 열 경우, 변수를 다시 설정합니다.

## 인증 방법중 셋. HTTP 직접 호출 + API키
- 설정 화면: https://console.cloud.google.com/apis/credentials?hl=ko&walkthrough_id=translation_api_v3_index&project=translate-test-388202
- API 키를 사용하여 API를 인증할 때 API 키는 주 구성원을 식별하거나 승인 정보를 제공하지 않습니다. API 키는 청구 및 할당 목적으로 요청을 Google Cloud 프로젝트와 연결합니다. API 키가 호출자를 식별하지 않기 때문에 종종 공개 데이터 또는 리소스에 액세스하는 데 사용됩니다.
- 대부분의 Google Cloud APIs는 API 키를 지원하지 않습니다. 
- ADC에 사용자 인증 정보를 제공하려면 Google Cloud CLI를 사용합니다.?
- 아래에서 통합 API 키를 생성하고, 사용할수 있는데, 사용할 제품과 ip, url 등을 제한 할수 있고, 최소 번역의 경우 cors 설정이 되어 있다. 
- https://console.cloud.google.com/apis/credentials?hl=ko&project=translate-test-388202 

## 인증 방법중 셋. HTTP 직접 호출 + REST를 사용하여 인증 (직접인증 )
- https://cloud.google.com/docs/authentication/rest?hl=ko#before_you_begin
- gcloud 사용자 인증 정보
```shell
# Google Cloud 컴퓨팅 리소스에서 실행하는 경우 사용자 인증 정보를 ADC에 제공하면 안 됩니다. 대신 연결된 서비스 계정을 사용하여 사용자 인증 정보를 제공하세요. 자세한 내용은 서비스 계정 연결을 지원하는 Google Cloud 서비스를 참조하세요.
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID"
```
- 애플리케이션 기본 사용자 인증 정보(ADC)에 제공되는 사용자 인증 정보 
```shell
# (PROJECT_ID 필요할때)
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID"
```
- 서비스 계정을 가장하여 제공하는 사용자 인증 정보입니다.
```js
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token --impersonate-service-account=PRIV_SA)" \
    "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID"
```
- REST 요청으로 할당량 프로젝트 설정
```shell
curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "x-goog-user-project: PROJECT_ID" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d @request.json \
    "https://translation.googleapis.com/language/translate/v2"
```
## basic VS advance
- 비교 (https://cloud.google.com/translate/docs/editions?hl=ko)
- 둘다 유료 (https://cloud.google.com/translate/pricing?hl=ko)

### basic (v2)
- Google의 선행 학습된 인공신경망 기계 번역(NMT) 모델을 사용
- 채팅, 소셜 미디어, 댓글과 같이 주로 일상적인 사용자 제작 콘텐츠를 취급하는 애플리케이션에 적합
- Cloud Translation - Basic의 경우 인증된 요청을 수행하는 데 사용한 비공개 키와 연결된 프로젝트에 요금이 적용됩니다. (https://cloud.google.com/translate/pricing?hl=ko)

### advance (v3)
- Basic의 모든 기능이 포함
- 용어집 및 커스텀 모델 선택
- gRPC API 지원 (gRPC는 단순하고 간결한 코드 작성을 위해 코드 생성 기능을 제공하며, 양방향 스트리밍, 단방향 스트리밍, 단일 요청-응답 등 다양한 메시지 패턴을 지원합니다. 또한, 다양한 보안 기능과 로드 밸런싱, 서비스 디스커버리 등의 기능을 제공하여 대규모 분산 시스템에서 확장성과 견고성을 갖춘 서비스를 구축할 수 있습니다.)
- Cloud Translation - Advanced의 경우 요청 시 사용한 프로젝트가 아니라 사용하는 번역 모델이 포함된 프로젝트에 요금이 청구됩니다. 예를 들어 다음 요청은 project-number-1에서 작성되었습니다. 하지만 호출자는 `project-number-2에` 위치한 모델(커스텀 또는 NMT 모델)에 대한 액세스 권한이 있으며 이 모델을 사용하였습니다. 이 경우 Cloud Translation은 `project-number-2`에 요금을 청구합니다. (https://cloud.google.com/translate/pricing?hl=ko)

```js

`POST https://translation.googleapis.com/v3/projects/${project-number-1}/locations/us-central1:translateText`

{
  "model":`projects/${project-number-2}/locations/us-central1/models/${model}`,
  "sourceLanguageCode": "en",
  "targetLanguageCode": "ru",
  "contents": ["Dr. Watson, please discard your trash."]
}
```

## Google Cloude SDK
- 아래 3개를 그냥 뭉뜨그려서 SDK 로 부른다. SDK 하나에 아래 3개가 전부 포함되어 있는 패키지 같은건 아니다. 
- Google Cloude CLI - 웹에서 다운받자
- Cloud Client Library - npm 설치
- Tools and Documnet
### Google Cloude CLI
- Google Cloude의 세팅 작업을 한다. 
- Google Cloude 에 접속해서 대시보드에서 이것저것 세팅 하고, 설정하는걸 로컬 cli 에서 가능하게 한다. 

### Cloud Client Library
- API 를 고수준 언어로 추상화해서 쉽게 사용하게 한다. 


## Google translate API 를 사용해 보자
- 사용해봤음

# Deepl
## 프론트에서 쓰지 말자
- 공개적으로 배포된 코드에 키를 입력하면 안 됩니다. (https://www.deepl.com/docs-api/api-access/authentication/)
- cors 이슈
### Deepl cors
- https://www.deepl.com/docs-api/api-access/cors-requests/
- 브라우저에서 DeepL API로 요청을 보내려고 하면 'CORS 정책에 의해 차단됨'이라는 메시지와 함께 HTTP 403 Forbidden 상태 코드와 함께 요청이 실패합니다. DeepL API는 브라우저 기반 애플리케이션에서 직접 호출을 허용하지 않습니다.
- 프런트 엔드 애플리케이션에서 타사 API에 대한 요청은 웹에서 자격 증명을 노출하여 계정을 사기 및 남용에 취약하게 만듭니다. 공개적으로 액세스할 수 있는 코드에 API 인증 키를 공개해서는 안 됩니다.
- API 인증 키가 손상된 것을 알게 되면 DeepL 계정에 즉시 로그인하십시오. '계정 세부 정보'에서 새 인증 키를 생성하는 옵션이 있습니다. 이렇게 하면 손상된 키가 무효화됩니다.
- 웹사이트 또는 애플리케이션에서 DeepL API를 안전하게 사용하기 위해 자체 백엔드 서버를 통해 요청을 라우팅할 수 있습니다. 이렇게 하면 자격 증명이 숨겨지고 사용 사례에 따라 CORS 정책 및 속도 제한을 지정할 수 있습니다.
- DeepL의 공식 오픈 소스 클라이언트 라이브러리는 이러한 백엔드 구현을 만드는 데 도움이 될 수 있습니다.

## Deepl 한국 서비스
- https://www.hellot.net/news/article.html?no=77813
- 딥엘은 `지난 1월` 딥엘 번역기에 한국어 서비스를 추가하며 비즈니스 확장에 나섰다. 이에 따라 웹사이트, 데스크톱 및 모바일 앱, 구글 크롬 및 마이크로소프트 엣지 확장 프로그램, 그리고 딥엘 API에서 한국어가 제공되었다. 당시 딥엘은 한국어 사용자는 물론 한국과 교류를 희망하는 조직이 언어 장벽으로 인해 겪는 소통의 불편을 해소하는 데 이바지하겠다는 포부를 밝혔었다. 
- 간담회에서 쿠틸로브스키 CEO는 올 `8월` 딥엘 프로(DeepL Pro)의 한국 출시를 통해 현지 시장 공략에 박차를 가할 계획을 발표했다. 딥엘 프로는 자체 AI 번역 기술을 최대한 활용할 수 있는 구독 기반의 고급 서비스로, 사용자에게 최적화된 웹 번역은 물론 딥엘의 알고리즘을 번역 소프트웨어에 통합하는 기능을 제공한다.
- 카드 등록도 안됨

## Deepl 을 사용해보자
### 라이브러리
```shell
npm install deepl-node
```

### API 인증 키
```
Authorization HTTP 헤더를 DeepL-Auth-Key [yourAuthKey].
```
### API 호출 코드 시뮬레이터
- https://www.deepl.com/docs-api/simulator/