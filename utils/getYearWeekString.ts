export default function getYearWeekString() {
  const now = new Date()
  const year = now.getFullYear()
  const week = getWeekYear()

  return `${year}_${week}`
}

function getWeekYear() {
  var currentDate = new Date()
  var year = new Date(currentDate.getFullYear(), 0, 1)
  var days = Math.floor(
    (currentDate.getTime() - year.getTime()) / (24 * 60 * 60 * 1000)
  )
  var week = Math.ceil((days - currentDate.getDay() + 1) / 7)
  return week
}
