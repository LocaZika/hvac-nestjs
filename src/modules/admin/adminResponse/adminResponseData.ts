export type TStatisticData = {
  sale_month: string;
  result: { [key: string]: number }[];
};

type TStatistic = {
  month: string;
} & Record<Exclude<string, 'month'>, number>;

export type TLastMonthData = {
  value: number;
  percent: number;
  growth: 'up' | 'down';
};

export default class AdminResponseData {
  statistic: TStatistic[];
  orderCount: number;
  customerCount: number;
  lastMonthEarningDifference: TLastMonthData;
  lastMonthGrowthDifference: TLastMonthData;
}
