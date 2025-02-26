export function getDayCountByYear(year: number): number {
  if (year < 0 || parseInt(year + '') != year) {
    throw new Error('Year must big than 0 and not be float')
  }
  const currentYear = new Date(0).setFullYear(year)
  const nextYear = new Date(0).setFullYear(year + 1)

  return (nextYear - currentYear) / 24 / 60 / 60 / 1000
}

export function getDayCountByLasteYear(datetime: Date): number {
  const currenttime = datetime.getTime()
  const lastetime = new Date(currenttime).setFullYear(datetime.getFullYear() - 1)

  return Math.ceil((currenttime - lastetime) / 24 / 60 / 60 / 1000)
}

export function getDayCountByMonth(month: number): number {
  if (month < 0 || parseInt(month + '') != month) {
    throw new Error('Month must big than 0 and not be float')
  }
  const currentYear = new Date().setMonth(month)
  const nextYear = new Date().setMonth(month + 1)

  return (nextYear - currentYear) / 60 / 60 / 1000
}

function calculateDateByDayCount(dayCount: number, date: Date = new Date()): Date {
  const lastYearToday = new Date(date.getTime()).setFullYear(date.getFullYear() - 1);
  const lastYearEnd = new Date(date.getFullYear() - 1, 11, 31, 23, 59, 59).getTime();
  const offset = dayCount * 24 * 60 * 60 * 1000 - (lastYearEnd - lastYearToday);
  return new Date(lastYearEnd + offset);
}

export function getYearByDayCount(dayCount: number, date: Date = new Date()): number {
  const calculatedDate = calculateDateByDayCount(dayCount, date);
  return calculatedDate.getFullYear();
}

export function getMonthByDayCount(dayCount: number, date: Date = new Date()): number {
  const calculatedDate = calculateDateByDayCount(dayCount, date);
  return calculatedDate.getMonth() + 1;
}

export function getDayByDayCount(dayCount: number, date: Date = new Date()): number {
  const calculatedDate = calculateDateByDayCount(dayCount, date);
  return calculatedDate.getDate();
}

export function getDateByDayCount(dayCount: number, date: Date = new Date()): Date {
  const calculatedDate = calculateDateByDayCount(dayCount, date);
  return calculatedDate;
}

