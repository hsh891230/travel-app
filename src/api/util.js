import moment from 'moment'

export const dateRange = (fromDate, toDate) => {
  const range = []
  const from = moment(fromDate)
  const to = moment(toDate)
  const diff = to.diff(from, 'days')
  for (let i = 0; i <= diff; i++) {
    range.push(
      from
        .clone()
        .add(i, 'day')
        .format(moment.HTML5_FMT.DATE)
    )
  }
  return range
}
