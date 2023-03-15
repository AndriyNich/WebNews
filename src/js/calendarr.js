export class Calendar {
  #DAY_LIST = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  #MONTH_LIST = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  #selectDate;
  #selectMonth;
  #selectYear;

  constructor(cssSelector) {
    const date = new Date();
    this.#selectDate = date.getDate();
    this.#selectMonth = date.getMonth();
    this.#selectYear = date.getFullYear();

    console.log(this.#selectYear);
    const calendar = this.#createMonthYearRow() + this.#createDayNameList();

    document.querySelector(cssSelector).innerHTML = calendar;
  }

  #createMonthYearRow() {
    return `
        <div class="m-y__row">
            <div>${this.#createYear()}</div>
            <div>${this.#createMonth()}</div>
        </div>`;
  }

  #createYear() {
    return `<div>${this.#selectYear}</div>`;
  }

  #createMonth() {
    return `<div>${this.#MONTH_LIST[this.#selectMonth]}</div>`;
  }

  #createDayNameList() {
    const dayList = this.#DAY_LIST
      .map(elem => `<li class="day__item">${elem}</li>`)
      .join('');
    return `<ul class="day__list">${dayList}</ul>`;
  }

  #createDayNumberList() {
    const dayList = this.#DAY_LIST
      .map(elem => `<li class="day__item">${elem}</li>`)
      .join('');
    return `<ul class="day__list">${dayList}</ul>`;
  }
}
