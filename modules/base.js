import { data } from './data';
import { draw } from './draw';
import { getPrevMonth, getNextMonth } from './navigation';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const months = data.months;
const mainClassName = 'calendar';

const createCell = function (tag, text) {
  let cell = document.createElement(tag);
  cell.textContent = text;
  return cell;
};

const createCalendar = function (selector) {
  const container = document.querySelector(selector);
  const classNamesParent = container.className.split(' ');
  const classNameParent = classNamesParent[1] ? classNamesParent[1] : classNamesParent[0];
  const calendar = document.createElement('div');
  const title = document.createElement('h3');
  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableHeadRow = document.createElement('tr');
  const tbody = document.createElement('tbody');
  const nav = document.createElement('div');
  const next = document.createElement('button');
  const prev = document.createElement('button');

  // Добавим дни недели
  for (let day of days) {
    tableHeadRow.append(createCell('th', day));
  }

  title.className = `${mainClassName}__title`;
  title.textContent = `${months[new Date(year, month).getMonth()]} ${new Date(year, month).getFullYear()}`;
  tableHead.append(tableHeadRow);
  table.append(tableHead);
  tbody.className = `${mainClassName}__body`;
  draw(tbody, year, month);
  table.append(tbody);
  nav.className = `${mainClassName}__navigation`;
  prev.className = `${mainClassName}__button ${mainClassName}__button--prev button`;
  prev.textContent = '←';
  next.className = `${mainClassName}__button ${mainClassName}__button--next button`;
  next.textContent = '→';
  prev.addEventListener('click', function () {
    draw(tbody, year, getPrevMonth(title, year, month));
  });
  next.addEventListener('click', function () {
    draw(tbody, year, getNextMonth(title, year, month));
  });
  calendar.append(title);
  calendar.append(table);
  nav.append(prev);
  nav.append(next);
  calendar.append(nav);
  calendar.className = `${classNameParent}__${mainClassName} ${mainClassName}`;
  container.append(calendar);
};

export { createCalendar };
