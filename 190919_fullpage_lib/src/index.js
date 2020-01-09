import 'fullpage.js/vendors/easings.min.js';
import 'fullpage.js/vendors/scrolloverflow.min.js';

import $ from 'jquery';
import 'fullpage.js/vendors/easings.min.js';
import 'fullpage.js/vendors/scrolloverflow.min.js';
import FullPage from 'fullpage.js';


window.test = new FullPage('#fullpage', {
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE', // https://alvarotrigo.com/fullPage/pricing/
    controlArrows: true, // 슬라이드 좌우 화살표 노출
    verticalCentered: true, // 섹션 버티컬 센터
    scrollingSpeed: 700, // 스크롤 속도
    sectionsColor: ['#333', '#bbb', '', '#333'], // 섹션 배경색
    easing: 'easeInOutCubic', // 섹션 이동 이징 효과
    loopTop: false, // 첫번째 섹션에서 위로 스크롤 시 마지막 섹션으로 이동 여부
    loopBottom: false, // 마지막 섹션에서 아래로 스크롤 시 첫번째 섹션으로 이동 여부
    loopHorizontal: true, // 슬라이드 좌우 루프 여부
    fitToSection: true, // 스크롤바로 이동시 섹션 중간에 멈춤 가능 여부
    fitToSectionDelay: 1000, // fitToSection 동작 딜레이
    scrollBar: false, // 스크롤바 표시 여부
    paddingTop: 0, // 섹션 상단 패딩
    paddingBottom: 0, // 섹션 상단 패딩
    normalScrollElements: null, // 섹션 내 기본 스크롤 동작 요소 ('.map, .banner')
    bigSectionsDestination: null, // 뷰포트보다 큰 섹션으로 스크롤 하는 방법 정의 (top | bottom | null )
    keyboardScrolling: true, // 키보드 스크롤 가능 여부
    continuousHorizontal: false, // 슬라이드 맨 뒤에서 다음 버튼 클릭 시 처음으로 이동 (https://gumroad.com/l/fullpageContinuousHorizontal)
    scrollHorizontally: false, // 슬라이드가 있는 섹션에서 스크롤 시 슬라이드가 끝나면 섹션 이동 (https://gumroad.com/l/fullpageScrollHorizontally)
    dragAndMove: false, // 드래그 이동 (https://gumroad.com/l/fullpageDragAndMove)
    offsetSections: false, // 섹션 보여주는 비율 및 정렬 기능 사용 여부 (https://gumroad.com/l/fullpageOffsetSections)
    fadingEffect: true, // 섹션 및 슬라이드 이동시 페이드 효과 (https://gumroad.com/l/fullpageFadingEffect)
    animateAnchor: true, // 주소에 앵커가 있을 경우 이동 여부
    recordHistory: true, // 뒤로가기 히스토리 저장 여부
    menu: '#menu', // 메뉴 연결
    navigation: true, // 섹션 네비게이션 도트 노출 여부
    navigationPosition: 'right', // 섹션 네비게이션 도트 위치
    showActiveTooltip: false, // 섹션 네비게이션 도트 툴팁 항상 노출
    slidesNavigation: true, // 슬라이드 네비게이션 도트 노출 여부
    slidesNavPosition: 'bottom', // 슬라이드 네비게이션 도트 위치
    scrollOverflow: true, // 화면보다 큰 섹션 스크롤 여부
    scrollOverflowReset: true, // scrollOverflow 사용 시 섹션 내 컨텐츠 상단으로 고정 여부 (https://gumroad.com/l/fullpageScrolloverflowReset)
    sectionSelector: '.section', // 섹션 셀렉터
    slideSelector: '.slide', // 슬라이드 셀렉터
    // responsiveWidth: 1000, // 브라우저 너비가 1000보다 작을 경우 일반 스크롤로 동작
    // responsiveHeight: 500, // 브라우저 높이가 500보다 작을 경우 일반 스크롤로 동작
    responsiveSlides: false, // 일반 스크롤로 동작할 때 슬라이드 펼침 여부 (https://gumroad.com/l/fullpageResponsiveSlides)
    parallax: false, // 패럴렉스 효과 (https://gumroad.com/l/fullpageParallax)
    parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate'}, // 패럴렉스 효과 옵션
    lazyLoading: true, // 미디어 요소 지연 로드
    afterLoad: function (origin, destination, direction) {
      // 스크롤이 끝나고 섹션이 로드된 후
      // console.log('afterLoad', origin, destination, direction);

    //   const { anchor } = destination;
    //   const timeline = Global[anchor].timeline;

    //   timeline && timeline.timeScale(1);
    //   timeline && timeline.play();
      // console.log('afterSlideLoad',  origin, destination, direction);
      // console.log(window.fullpage_api);
      if(direction === 'up'){
        console.log('up');
        console.log(destination.item.offsetTop);
        window.scrollTo(0,destination.item.offsetTop);
        window.fullpage_api.silentMoveTo(destination.anchor);
      }
    },
    onLeave: function (origin) {
      // 섹션을 떠날 때
      // console.log('onLeave', origin, destination, direction);

    //   const { anchor } = origin;
    //   const timeline = Global[anchor].timeline;

    //   timeline && timeline.timeScale(2);
    //   timeline && timeline.reverse();
    },
    afterRender: function () {
      // 섹션 구조가 생성 된 후
      // console.log('afterRender');
    },
    afterResize: function () {
      // 브라우저 리사이즈될 때
      // console.log('afterResize', width, height);
    },
    afterResponsive: function () {
      // 페이지 모드와 일반 스크롤 모드로 전환 될 때
      // console.log('afterResponsive', isResponsive);
    },
    afterSlideLoad: function (section, origin, destination, direction) {
      // 스크롤이 끝나고 슬라이드가 로드된 후
      console.log('afterSlideLoad', section, origin, destination, direction);
    },
    onSlideLeave: function () {
      // 슬라이드를 떠날 때
      // console.log('onSlideLeave', section, origin, destination, direction);
    }
  });

