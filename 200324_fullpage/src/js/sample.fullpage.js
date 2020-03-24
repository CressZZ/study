
import 'fullpage.js/vendors/scrolloverflow.min.js';
import fullpage from 'fullpage.js/dist/fullpage.extensions.min.js';



new fullpage('#fullpage', {
  sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
  normalScrollElements: '.scrollable-content',
  scrollOverflow: true,
});
