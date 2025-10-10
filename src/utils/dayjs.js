import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

// 扩展 dayjs 插件
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(quarterOfYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// 设置中文语言
dayjs.locale('zh-cn');

// 修复 Ant Design DatePicker 兼容性问题
// 为 dayjs 原型添加 isValid 方法
if (!dayjs.prototype.isValid) {
  dayjs.prototype.isValid = function() {
    return !isNaN(this.valueOf());
  };
}

// 为 dayjs 构造函数添加必要的属性和方法
if (!dayjs.isDayjs) {
  dayjs.isDayjs = (obj) => {
    return obj instanceof dayjs || (obj && obj.$isDayjsObject === true);
  };
}

// 确保 dayjs 实例具有正确的属性
const originalDayjs = dayjs;
const wrappedDayjs = function(...args) {
  const instance = originalDayjs(...args);
  if (instance && typeof instance.isValid !== 'function') {
    instance.isValid = function() {
      return !isNaN(this.valueOf());
    };
  }
  return instance;
};

// 复制所有静态方法和属性
Object.setPrototypeOf(wrappedDayjs, originalDayjs);
Object.assign(wrappedDayjs, originalDayjs);

export default wrappedDayjs;
