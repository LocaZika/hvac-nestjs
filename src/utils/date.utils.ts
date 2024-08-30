export const getCurrentDate = (): string => {
  const date = new Date();
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  const month =
    date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
