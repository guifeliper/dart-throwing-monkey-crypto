export default function getYearWeekString() {
  const now = new Date();
  const year = now.getFullYear();
  const week = getWeekYear();

  return `${year}_${week}`;
}

function getWeekYear() {
  var currentDate = new Date();
  var year = new Date(currentDate.getFullYear(), 0, 1);
  var days = Math.floor((currentDate - year) / (24 * 60 * 60 * 1000));
  var week = Math.ceil((currentDate.getDay() + 1 + days) / 7);
  return week;
}
