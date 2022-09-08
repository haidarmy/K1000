/**
 * Get formatted date in "yyyymmdd" format
 * @param {date} - Date
 * @param {string} - "START" | "END"
 * @param {string} - "BIYEARLY" | "MONTHLY" | "WEEKLY"
 * @returns {string} - "yyyymmdd"
 */

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Ags',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

export const getDateLabel = date => {
  if (date.length > 6) return `${date.slice(-2)}/${date.slice(4, 6)}`;
  const formattedMonth = date.slice(4, 5) == 0 ? date.slice(5, 6) : date.slice(4, 6);
  return months[Number(formattedMonth) - 1];
};

const getFormattedDate = date => {
  return String(date).length === 1 ? `0${date}` : date;
};

const getDays = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getEpochTime = (date) => {
  if (date == undefined) return 0
  const [day, month, year] = [
    date.slice(-2),
    date.slice(-4, -2),
    date.slice(0, 4),
  ];
  return new Date(year, month - 1, day).getTime();
};


export const isAMonthDifference = (startDate, endDate) => {
  return (
    (endDate.getTime() -  24 * 60 * 60 * 1000) - startDate >
    getDays(endDate.getFullYear(), endDate.getMonth()) * 24 * 60 * 60 * 1000
  );
};
export const getCurrentTimeFrameType = type => {
  switch (type) {
    case 'BIYEARLY':
      return 'monthly';
    case 'MONTHLY':
      return 'five-days';
    case 'WEEKLY':
      return 'daily';
    default:
      break;
  }
};

export const getCurrentDate = (date, sortAt, type, noSeperator) => {
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  if (!sortAt) {
    if (type === 'BIYEARLY'){
      return noSeperator ? `${year}${getFormattedDate(month+1)}` : `${year}-${getFormattedDate(month+1)}`;
    }
    return noSeperator ? `${year}${getFormattedDate(month+1)}${getFormattedDate(day)}` : `${year}-${getFormattedDate(month+1)}-${getFormattedDate(day)}`
  }

  switch (type) {
    case 'BIYEARLY':
      if (month === 0) {
        return sortAt === 'START'
          ? `${year - 1}${getFormattedDate(12 - (5 - month))}`
          : `${year - 1}12`;
      }
      if (month >= 6) {
        return sortAt === 'START'
          ? `${year}${getFormattedDate(month - 5)}`
          : `${year}${getFormattedDate(month)}`;
      }
      return sortAt === 'START'
        ? `${year - 1}${getFormattedDate(12 - (5 - month))}`
        : `${year}${getFormattedDate(month)}`;

    case 'MONTHLY':
      if (month === 0 && day === 1) {
        return sortAt === 'START' ? `${year - 1}1205` : `${year - 1}1231`;
      }

      if (month === 0) {
        return sortAt === 'START'
          ? `${year - 1}12${getFormattedDate(day + 5)}`
          : `${year}${getFormattedDate(month + 1)}${getFormattedDate(day - 1)}`;
      }

      if (day === 1) {
        return sortAt === 'START'
          ? `${year}${getFormattedDate(month)}05`
          : `${year}${getFormattedDate(month)}${getFormattedDate(
              getDays(year, month - 1),
            )}`;
      }

      return sortAt === 'START'
        ?  day + 5 > getDays(year, month - 1) 
        ? `${year}${getFormattedDate(month + 1)}${getFormattedDate(day + 5 - getDays(year, month - 1))}` 
        : `${year}${getFormattedDate(month)}${getFormattedDate(day + 5)}`
        : `${year}${getFormattedDate(month + 1)}${getFormattedDate(day - 1)}`;

    case 'WEEKLY':
      if (day >= 8) {
        return sortAt === 'START'
          ? `${year}${getFormattedDate(month + 1)}${getFormattedDate(day - 7)}`
          : `${year}${getFormattedDate(month + 1)}${getFormattedDate(day - 1)}`;
      }

      if (day === 1 && month === 0) {
        return sortAt === 'START' ? `${year - 1}1225` : `${year - 1}1231`;
      }

      if (month === 0) {
        return sortAt === 'START'
          ? `${year - 1}12${getFormattedDate(31 - (7 - day))}`
          : `${year}${getFormattedDate(month + 1)}${getFormattedDate(day - 1)}`;
      }

      if (day === 1) {
        return sortAt === 'START'
          ? `${year}${getFormattedDate(month)}${getFormattedDate(
              getDays(year, month - 1) - 6,
            )}`
          : `${year}${getFormattedDate(month)}${getFormattedDate(
              getDays(year, month - 1),
            )}`;
      }

      return sortAt === 'START'
        ? `${year}${getFormattedDate(month)}${getFormattedDate(
            getDays(year, month - 1) - (7 - day),
          )}`
        : `${year}${getFormattedDate(month + 1)}${getFormattedDate(day - 1)}`;

    default:
      break;
  }
};

const getReversedFormattedDate = (date) => {
  return String(date).slice(0, 1) == 0 ? date.slice(-1) : date;
};

const getDate = (date) => {
  return (/* { day, month, year } =  */{
    day: getReversedFormattedDate(date.slice(-2)),
    month: getReversedFormattedDate(date.slice(-4, -2)),
    year: date.slice(0, 4),
  });
};

export const getFiveDayUpdateDate = (startDate, endDate) => {
  if (getDate(startDate).month === getDate(endDate).month) {
    const rollbackDayAmount = (Number(getDate(endDate).day) - Number(getDate(startDate).day)) % 5;
    const dayDate = Number(getDate(endDate).day) - Number(rollbackDayAmount);
    return {day: dayDate, month: getDate(endDate).month - 1, year: getDate(endDate).year}  
}
  const rollbackDayAmountPrevMonth = (Number(getDays(getDate(startDate).year, getDate(startDate).month)) - Number(getDate(startDate).day)) % 5;
  const rollbackDayAmount = (Number(getDate(endDate).day) + Number(rollbackDayAmountPrevMonth)) % 5
  const dayDate = Number(getDate(endDate).day) - Number(rollbackDayAmount)
  return {day: dayDate, month: getDate(endDate).month - 1, year: getDate(endDate).year}
};

const dateList = (date, type, customDate) => {
  const handleWeekly = (i) => {
    const currentMonthDayList =`${date.slice(0,4)}${date.slice(4,6)}${getFormattedDate(getReversedFormattedDate(date.slice(-2)) - 7 + i)}`
    
    if (getReversedFormattedDate(date.slice(-2)) - 7 > 0) return currentMonthDayList

    const handlPrevMonthDay = (day) => {
        if (date.slice(4,6) === '01') return `${Number(date.slice(0, 4)) - 1}12${getFormattedDate(day)}`
        return `${date.slice(0, 4)}${getFormattedDate(getReversedFormattedDate(date.slice(4, 6) - 1))}${getFormattedDate(day)}`
    }
    const prevMonthDaysAmount = getDays(getReversedFormattedDate(date.slice(0, 4)),getReversedFormattedDate(date.slice(4, 6)) - 1);
    const day = prevMonthDaysAmount - (7 - getReversedFormattedDate(date.slice(-2))) + i;
    const prevMonthDayList = handlPrevMonthDay(day)
    return day > prevMonthDaysAmount ? currentMonthDayList : prevMonthDayList;
  };

  const handleBiyearly = (i) => {
    const currentYearMonthList = `${date.slice(0,4)}${getFormattedDate(getReversedFormattedDate(date.slice(-2)) - 6 + i)}`
    if(date.slice(-2) - 6 > 0) return currentYearMonthList
    const month = getReversedFormattedDate(date.slice(-2)) - 6 + i
    const prevYearMonthList = `${Number(date.slice(0,4)) - 1}${getFormattedDate(12 - (6 - Number(getReversedFormattedDate(date.slice(-2)))) + i)}`
    return month <= 0 ? prevYearMonthList : currentYearMonthList
  }

  const handleMonthly = (i) => {
    //TODO need refactor later
    const prevMonthDayamount = getDays(date.slice(0,4), getFormattedDate(getReversedFormattedDate(date.slice(4,6)) - 1))
    const diffDayAmountIfCustomDatePrevMonth = (getReversedFormattedDate(customDate.slice(-2)) - (Number(getReversedFormattedDate(date.slice(-2))) - 1)) % 5
    const diffDayAmountIfCustomDateCurrMonth = (prevMonthDayamount - (Number(getReversedFormattedDate(date.slice(-2))) - 1) + Number(getReversedFormattedDate(customDate.slice(-2)))) % 5
    const diffDayAmount =  date.slice(4,6) === customDate.slice(4,6) ? diffDayAmountIfCustomDateCurrMonth : diffDayAmountIfCustomDatePrevMonth
    const startDate = (Number(getReversedFormattedDate(date.slice(-2))) - 1) + diffDayAmount + 5 
    const handleJanMonth = date.slice(4,6) === '01' 
        ? `${getFormattedDate(getReversedFormattedDate(date.slice(0,4) - 1))}12` 
        : `${date.slice(0,4)}${getFormattedDate(getReversedFormattedDate(date.slice(4,6)) - 1)}`
    const prevMonthRestDay = (prevMonthDayamount - startDate) % 5
    const prevMonthCounter = startDate < prevMonthDayamount ? Math.floor((prevMonthDayamount - startDate)/5) : 0
    const prevMonthConstraintChecker = startDate + i * 5 < (Number(getReversedFormattedDate(date.slice(-2))) - 1) + 5
    const prevMonthDayList = prevMonthConstraintChecker ? false : `${handleJanMonth}${getFormattedDate(startDate + i * 5)}`
    const currMonthConstraintChecker = (i - prevMonthCounter) * 5 - prevMonthRestDay > (Number(getReversedFormattedDate(date.slice(-2))) - 1)
    const handleZeroVal = (i - prevMonthCounter) * 5 - prevMonthRestDay > 0 
        ? /* prevMonthCounter === 0 */ 
            /* ? getFormattedDate((i - prevMonthCounter) * 5 - prevMonthRestDay >= 5 ? (i - prevMonthCounter) * 5 - prevMonthRestDay : false) */
            /* : */ getFormattedDate((i - prevMonthCounter) * 5 - prevMonthRestDay) 
        : false
    const currentMonthDayList = currMonthConstraintChecker ? false : `${date.slice(0,4)}${date.slice(4,6)}${handleZeroVal}`
    return startDate + i * 5 > prevMonthDayamount ? handleZeroVal && currentMonthDayList : prevMonthDayList
  }

  switch (type) {
    case "WEEKLY":
        return [...Array(7)].map((e, i) => handleWeekly(i));
    case "MONTHLY":
        return [...Array(7)].map((e, i) => handleMonthly(i)).filter(Boolean);
    case "BIYEARLY":
        return [...Array(6)].map((e, i) => handleBiyearly(i));
    default:
      break;
  }
};


export const handleUndefinedData = (oldData = {}, type, uid, date, customDate) => {
    const update = {};
    const key = (e) => `${e.slice(0,4)}-${e.slice(4,6)}${type !== "BIYEARLY" ? '-'+e.slice(6,8) : ''}`
    dateList(date, type, customDate).forEach(
      e =>
      (update[key(e)] = {
            categoryList: {},
            date: e,
            revenue: 0,
            uid:uid,
            salesDetails: {
                cancel: 0,
                sold: 0,
                viewed: 0,
            },
            ...oldData[key(e)],
        }),
    );
    return update;
};
