import { split, truncate, reduce, forEach } from 'lodash';
import moment from 'moment';

/**
 * 将原始数据提取成 { 杨扇舟蛾: {2020-11-11： 1} } 的形式
 * @param ASource
 * @param insects
 * @returns {*}
 */
export function aSourceToOriginal(ASource, insects) {

  return reduce(ASource, (result, { img_name, anno_info }) => {
    const dateStr = split(img_name, '_')[1];
    const dateMoment = moment(truncate(dateStr, { length: 8, omission: '' }), 'YYYYMMDD');
    const date = dateMoment.format('YYYY-MM-DD');
    const { detect_info } = JSON.parse(anno_info);
    forEach(detect_info, ({ cato = '0' }) => {
      if (!isNaN(cato)) {
        cato = insects[+cato].bugName;
      }
      if (result[cato]) {
        result[cato][date] = (result[cato][date] || 0) + 1;
      } else {
        result[cato] = { [date]: 1 };
      }
    });
    return result;
  }, {});
}

/**
 * 将 { 杨扇舟蛾: {2020-11-11： 1} } 转换成 { 杨扇舟蛾: {2020-11-11： 1} }
 * @param originalASource
 * @returns {*}
 */
export function calcTSource(originalASource) {

  const now = moment().get('year');
  return reduce(originalASource, (result, value, key) => {
    result[key] = splitTime(value, now - 1, now);
    return result;
  }, {});
}

/**
 * 计算年报的 G2数据源
 * @param TSource
 * @returns {[]}
 */
export function calcYSource(TSource) {
  const arr = [];
  for (const bugName in TSource) {
    if (TSource.hasOwnProperty(bugName)) {
      const now = moment();
      const source = TSource[bugName];
      for (let month = 1; month <= 12; month++) {
        const year = now.get('year');
        const month = now.get('month') + 1;
        arr.unshift({
          bugName,
          time: now.format('YYYY年MM月'),
          count: source[year][month].count,
        });
        now.subtract(1, 'month');
      }
    }
  }
  return arr;
}

/**
 * 计算某一年某月的月报 G2 数据源
 * @param year
 * @param month
 * @param TSource
 * @returns {[]}
 */
export function calcMSource(year, month, TSource) {
  const arr = [];
  for (const bugName in TSource) {
    if (TSource.hasOwnProperty(bugName)) {
      const now = moment([year, month - 1, 1]);
      const days = now.daysInMonth();
      const source = TSource[bugName];
      for (let day = 1; day <= days; day++) {
        const year = now.get('year');
        const month = now.get('month') + 1;
        arr.push({
          bugName,
          time: now.format('YYYY年MM月DD日'),
          count: source[year][month][day].count,
        });
        now.add(1, 'day');
      }
    }
  }
  return arr;
}

/**
 * 计算某年某月某日的G2数据源
 * @param year
 * @param month
 * @param day
 * @param TSource
 * @returns {[]}
 */
export function calcDSource(year, month, day, { TSource }) {
  const arr = [];
  for (const bugName in TSource) {
    if (TSource.hasOwnProperty(bugName)) {
      arr.push({
        bugName,
        count: TSource[bugName][year][month][day].count,
      });
    }
  }
  return arr;
}

/**
 * 将 {2020-11-11： 1} 的结果 转换成 { 2020: 11: 11: 1 } 的形式
 * @param obj
 * @param startYear
 * @param endYear
 */
function splitTime(obj, startYear, endYear) {
  const result = {};
  for (let year = startYear; year <= endYear; year++) { // 便利每一年
    let yearCount = 0; // 这一年某害虫的数量
    const yearMoment = moment(year + '-01-01'); // 今年第一天
    const yearObj = {};
    for (let month = 1; month <= 12; month++) { // 开始遍历每一月
      let monthCount = 0; // 某年某月的害虫数量
      const monthStr = yearMoment.format('YYYY-MM');
      const monthMoment = moment(monthStr + '-01');
      const endDay = monthMoment.endOf('month').get('date');
      const monthObj = {};
      for (let day = 1; day <= endDay; day++) {
        const now = moment([year, month - 1, day]).format('YYYY-MM-DD');
        monthObj[day] = { count: obj[now] || 0 };
        monthCount += monthObj[day].count;
        monthMoment.add(1, 'day');
      }
      monthObj.count = monthCount;
      yearObj[month] = monthObj;
      yearCount += monthCount;
      yearMoment.add(1, 'month');
    }
    yearObj.count = yearCount;
    result[year] = yearObj;
  }
  return result;
}
