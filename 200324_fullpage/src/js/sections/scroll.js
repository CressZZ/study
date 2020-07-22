// import { state } from '../common/store';
import { TimelineMax, TweenMax } from 'gsap';

export default (() => {
  const sectionName = 'scroll'; // 섹션 이름

  if (!$(`.section-${sectionName}`).length) return;

  let timeline = null;

  (() => {
    setTimeline();
  })();

  function setTimeline () {
    timeline = new TimelineMax();
    timeline.add(TweenMax.fromTo(`.section-${sectionName} .text`, 1, { x: 0 }, { x: 300 }, 0));
    timeline.pause();
  }

  return {
    active () {
      timeline.timeScale(1);
      timeline.play();
    },
    deActive () {
      timeline.timeScale(2);
      timeline.reverse();
    }
  };
})();
