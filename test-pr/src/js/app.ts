import flatpickr from 'flatpickr';

flatpickr('.date-picker', {});

console.log('a');

if (module.hot) {
  module.hot.accept();
}
