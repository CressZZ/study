import flatpickr from 'flatpickr';

const pickedDate: HTMLElement = document.querySelector(
  '.picked-result-date .picked-result-cont'
)!;
const caclPrice: HTMLElement = document.querySelector(
  '.picked-result-price .picked-result-cont'
)!;
const maxRangeDate = 2;
const ctPerDay = 8;
const defaultMinDate = new Date(2022, 2, 2);
const defaultMaxDate = new Date(2022, 4, 28);
const defaultDisable = ['2022-03-20', '2022-03-23', '2022-03-22'];

export let selectedPriceForAPi = 0;
export let selectedDatesForApi: string[] = [];
export let setFlatpickr = function setFlatpickr() {
  let flatpickrInatance = flatpickr('.date-picker', {
    dateFormat: 'Y-m-d',
    monthSelectorType: 'static',
    inline: true,
    mode: 'range',
    minDate: defaultMinDate,
    maxDate: defaultMaxDate,
    locale: {
      firstDayOfWeek: 0,
      months: {
        shorthand: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ],
        longhand: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ],
      },
      weekdays: {
        shorthand: ['SUN', 'MON', 'THU', 'WED', 'THU', 'FRI', 'SAT'],
        longhand: ['SUN', 'MON', 'THU', 'WED', 'THU', 'FRI', 'SAT'],
      },
    },
    disable: defaultDisable,

    onChange: function (selectedDates, dateStr, instance) {
      console.log(selectedDates[0]);
      console.log(selectedDates[1]);
      setMinMaxDate(selectedDates, dateStr, instance);
      setPickedDateInfo(selectedDates, dateStr, instance);
      setCalculatedPrice(selectedDates, dateStr, instance);
      console.log(instance.selectedDates);
    },
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      // Utilize dayElem.dateObj, which is the corresponding Date
      let _date = new Date(dayElem.dateObj);
      console.log(_date);
      if(_date.getDay() === 6){
        dayElem.classList.add('day-sat');
      }else if(_date.getDay() === 7){
        dayElem.classList.add('day-sun');
      }
    },
  });

  return flatpickrInatance;
};

function setCalculatedPrice(
  selectedDates: Date[],
  dateStr: string,
  instance: flatpickr.Instance,
  data?: any
) {
  if (selectedDates[1]) {
    let diffDate =
      (selectedDates[1].getTime() - selectedDates[0].getTime()) /
      (3600 * 1000 * 24);
    let _selectedPrice = (diffDate + 1) * ctPerDay;

    setSelectedPrice(_selectedPrice);

    caclPrice.innerHTML = `${selectedPriceForAPi} CT`;
  }
}

function setPickedDateInfo(
  selectedDates: Date[],
  dateStr: string,
  instance: flatpickr.Instance,
  data?: any
) {
  if (!selectedDates[1]) {
    pickedDate.innerHTML = '';
  } else if (
    flatpickr.formatDate(selectedDates[0], 'Y-m-d') ==
    flatpickr.formatDate(selectedDates[1], 'Y-m-d')
  ) {
    pickedDate.innerHTML = `${selectedDates[0].getFullYear()}년 ${
      selectedDates[0].getMonth() + 1
    }월 ${selectedDates[0].getDate()}일`;
    setSelectedDate(selectedDates);
  } else {
    pickedDate.innerHTML = `${selectedDates[0].getFullYear()}년 ${
      selectedDates[0].getMonth() + 1
    }월 ${selectedDates[0].getDate()}일 ~ ${
      selectedDates[1].getMonth() + 1
    }월 ${selectedDates[1].getDate()}일`;
    setSelectedDate(selectedDates);
  }
}

function setSelectedDate(selectedDates: Date[]) {
  // let startDate = flatpickr.formatDate(selectedDates[0], 'Y-m-d');
  // let endDate = flatpickr.formatDate(selectedDates[1], 'Y-m-d');

  let startDateTime = selectedDates[0].getTime();
  let endDateTime = selectedDates[1].getTime();
  let result = [];

  for (
    let _tempDateTime = startDateTime;
    _tempDateTime <= endDateTime;
    _tempDateTime += 3600 * 1000 * 24
  ) {
    result.push(_tempDateTime);
  }

  selectedDatesForApi = result.map((dateTime) =>
    flatpickr.formatDate(new Date(dateTime), 'Y-m-d')
  );
}

function setMinMaxDate(
  selectedDates: Date[],
  dateStr: string,
  instance: flatpickr.Instance,
  data?: any
) {
  if (!selectedDates[1]) {
    let _selectDateTime = selectedDates[0].getTime();
    let _minDateTime = _selectDateTime - 1000 * 3600 * 24 * maxRangeDate;
    let _maxDateTime = _selectDateTime + 1000 * 3600 * 24 * maxRangeDate;

    _minDateTime = Math.max(_minDateTime, defaultMinDate.getTime());
    _maxDateTime = Math.min(_maxDateTime, defaultMaxDate.getTime());

    instance.set('minDate', _minDateTime);
    instance.set('maxDate', _maxDateTime);
    console.log('min', new Date(_minDateTime));
    console.log('max', new Date(_maxDateTime));

    let defaultDisableTime = defaultDisable.map((date) =>
      flatpickr.parseDate(date, 'Y-m-d')?.getTime()
    );
    let _newMinDateTime = defaultDisableTime
      .filter((date) => {
        if (date) {
          return date > _minDateTime && date < _selectDateTime;
        }
      })
      .sort()[0];
    _minDateTime = _newMinDateTime || _minDateTime;

    let _newMaxdateTime = defaultDisableTime
      .filter((date) => {
        if (date) {
          return date < _maxDateTime && date > _selectDateTime;
        }
      })
      .sort()
      .reverse()[0];
    _maxDateTime = _newMaxdateTime || _maxDateTime;

    console.log('min', new Date(_minDateTime));
    console.log('max', new Date(_maxDateTime));
    instance.set('minDate', _minDateTime);
    instance.set('maxDate', _maxDateTime);
  } else {
    instance.set('minDate', defaultMinDate);
    instance.set('maxDate', defaultMaxDate);
    instance.set('disable', defaultDisable);
  }
}

function setSelectedPrice(_selectedPrice: number) {
  selectedPriceForAPi = _selectedPrice;
}

// export setFlatpickr;
