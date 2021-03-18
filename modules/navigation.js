import { data } from './data';
import { draw } from './draw';

let count = 0;

const getMonth = function (title, year, month) {
  let newMonth = month + count;
  title.textContent = `${data.months[new Date(year, newMonth).getMonth()]} ${new Date(year, newMonth).getFullYear()}`;
  return newMonth;
};

const getPrevMonth = function (title, year, month) {
  count--;
  return getMonth(title, year, month);
};

const getNextMonth = function (title, year, month) {
  count++;
  return getMonth(title, year, month);
};

const onPrevClick = function (body, title, year, month) {
  draw(body, year, getPrevMonth(title, year, month));
};

const onNextClick = function (body, title, year, month) {
  draw(body, year, getNextMonth(title, year, month));
};

export { onPrevClick, onNextClick };
