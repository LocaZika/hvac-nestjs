import dayjs, { ManipulateType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const timeMap = new Map<string, string>([
  ['s', 'seconds'],
  ['m', 'minutes'],
  ['d', 'days'],
  ['y', 'years'],
]);

type TMailExpire = {
  unit: string;
  timeNumber: number;
};

const mailExpire = (): TMailExpire => {
  const getMailExpire: string = process.env.MAIL_EXPIRE;
  const mailExpire = {
    timeNumber: 30,
    unit: 'days',
  };
  if (3 === getMailExpire.length) {
    const timeNumber = parseInt(getMailExpire.slice(0, 2));
    const unit = timeMap.get(getMailExpire.slice(2, 3));
    mailExpire.timeNumber = timeNumber;
    mailExpire.unit = unit;
  }
  if (2 === getMailExpire.length) {
    const timeNumber = parseInt(getMailExpire.slice(0, 1));
    const unit = timeMap.get(getMailExpire.slice(1, 2));
    mailExpire.unit = unit;
    mailExpire.timeNumber = timeNumber;
  }
  return mailExpire;
};

/**
 * Create a expire date
 */
const getMailExpire = (): Date =>
  dayjs()
    .add(mailExpire().timeNumber, mailExpire().unit as ManipulateType)
    .toDate();

/**
 * Create a expire date string
 */
const getMailExpireString = (): string =>
  `${mailExpire().timeNumber} ${mailExpire().unit}`;

/**
 * Expire date
 * @method toDate()  Get expire date
 * @method toString() Get expire date string
 */
export const expireDate = {
  toDate: getMailExpire,
  toString: getMailExpireString,
};

export const currentDate = (): string => {
  return dayjs()
    .tz('Asia/Bangkok')
    .format('DD-MM-YYYY HH:mm:ss [UTC]Z')
    .slice(0, -3);
};
