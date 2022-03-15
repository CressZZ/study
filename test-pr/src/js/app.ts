import flatpickr from 'flatpickr';

const pickedDate = <HTMLElement> document.querySelector('.picked-date');
const caclPrice = <HTMLElement> document.querySelector('.calc-price');

flatpickr('.date-picker', {
  dateFormat: 'm j, Y',
  monthSelectorType: 'static',
  inline: true,
  mode:'range',
  locale: {
    firstDayOfWeek: 0,
    months: {
      shorthand: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      longhand: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
    weekdays: {
      shorthand: ['SUN', 'MON', 'THU', 'WED', 'THU', 'FRI', 'SAT'],
      longhand: ['SUN', 'MON', 'THU', 'WED', 'THU', 'FRI', 'SAT'],
    }
  },
  onChange: function(selectedDates, dateStr, instance) {
    console.log(selectedDates[0]);
    console.log(selectedDates[1]);
    setMinMaxDate(selectedDates, dateStr, instance);
    setPickedDateInfo(selectedDates, dateStr, instance);
    setCalculatedPrice(selectedDates, dateStr, instance);

  },
});

function setCalculatedPrice(selectedDates: Date[], dateStr: string, instance: flatpickr.Instance, data?: any){
  if(selectedDates[1]){
    let diffDate = (selectedDates[1].getTime() - selectedDates[0].getTime())/ (3600 * 1000 * 24);
    caclPrice.innerHTML = `${(diffDate + 1) * 8} CT`;
  }
}

function setPickedDateInfo(selectedDates: Date[], dateStr: string, instance: flatpickr.Instance, data?: any){
  if(!selectedDates[1]){
    pickedDate.innerHTML = '';
  }else if(flatpickr.formatDate(selectedDates[0], 'Y-m-d') == flatpickr.formatDate(selectedDates[1], 'Y-m-d')){
    pickedDate.innerHTML = `${selectedDates[0].getFullYear()}년 ${selectedDates[0].getMonth() + 1}월 ${selectedDates[0].getDate()}일`;
  }else{
    pickedDate.innerHTML = `${selectedDates[0].getFullYear()}년 ${selectedDates[0].getMonth() + 1}월 ${selectedDates[0].getDate()}일 ~ ${selectedDates[1].getMonth() + 1}월 ${selectedDates[1].getDate()}일`;
  }
}

function setMinMaxDate(selectedDates: Date[], dateStr: string, instance: flatpickr.Instance, data?: any) {
  if(!selectedDates[1]){
    instance.set('minDate', selectedDates[0].getTime() - (1000 * 3600 * 24 * 2));
    instance.set('maxDate', selectedDates[0].getTime() + (1000 * 3600 * 24 * 2));
  }else{
    instance.set('minDate', null);
    instance.set('maxDate', null);
  }
}


if (module.hot) {
  module.hot.accept();
}
