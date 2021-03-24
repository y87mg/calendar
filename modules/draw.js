//Условная неделя, которая начинается c воскресенья
const WEEK = [6, 0, 1, 2, 3, 4, 5];

const range = function (count) {
  let arr = [];
  for (let i = 0; i < count; i++) {
    let day = {};
    day.date = 1 + i;
    day.className = 'day-of-current-month';
    arr[i] = day;
  }
  return arr;
};

// Функция, которая возвращает номер последнего дня месяца
const getLastDay = function (year, month) {
  return new Date(year, month + 1, 0).getDate();
};

// Функция, которая возвращает номер дня недели первого дня месяца
const getFirstWeekDay = function (year, month) {
  return WEEK[new Date(year, month, 1).getDay()];
};

// Функция, которая возвращает номер дня недели последнего дня месяца
const getLastWeekDay = function (year, month) {
  return WEEK[new Date(year, month + 1, 0).getDay()];
};

// Дополним наш массив строками справа и слева
// Пусть для этого у нас будет функция normalize, первым параметром принимающая массив, вторым - сколько строк добавить слева, а третьим - сколько строк справа.
// Четвёртый и пятый параметры - это год и месяц соответственно. Если им не присвоены аргументы, то слева и справа будут добавлены пустые строки.
// Слева мы должны добавить firstWeekDay элементов, а справа - 6 минус lastWeekDay элементов

const normalize = function (arr, left, right, year, month) {
  const isDateSpecified = year !== undefined && month !== undefined;
  for (let i = 0; i < left; i++) {
    let day = {};
    day.date = isDateSpecified ? `${new Date(year, month, -i).getDate()}` : '';
    day.className = 'day-of-previous-month';
    arr.unshift(day);
  }
  for (let i = 0; i < right; i++) {
    let day = {};
    day.date = isDateSpecified ? `${new Date(year, month + 1, 1 + i).getDate()}` : '';
    day.className = 'day-of-next-month';
    arr.push(day);
  }
  return arr;
};

//Разобьём массив days в двухмерный. Сделаем для этого следующую функцию chunk:

const chunk = function (arr, n) {
  // n - количество элементов в подмассиве
  let result = [];
  let count = Math.ceil(arr.length / n);

  for (let i = 0; i < count; i++) {
    result[i] = arr.splice(0, n);
  }

  return result;
};

// Сделаем функцию createTable,
// первым параметром принимающую ссылку на родительский элемент чисел календаря (в нашем случае это будет tbody),
// а вторым - двухмерный массив

const createTable = function (parent, arr) {
  parent.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let week of arr) {
    let tr = document.createElement('tr');

    for (let day of week) {
      let td = document.createElement('td');
      td.className = day.className;
      td.textContent = day.date;
      tr.append(td);
    }

    fragment.append(tr);
  }

  parent.append(fragment);
};

const draw = function (body, year, month) {
  const days = range(getLastDay(year, month));
  const firstWeekDay = getFirstWeekDay(year, month);
  const lastWeekDay = getLastWeekDay(year, month);
  let cells = normalize(days, firstWeekDay, WEEK[0] - lastWeekDay, year, month);
  cells = chunk(cells, WEEK.length);
  createTable(body, cells);
};

export { draw };
