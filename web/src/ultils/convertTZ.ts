export const convertTZ = (utcStringDate: string) => {
  const utcDate = new Date(utcStringDate);
  return utcDate.toLocaleString("en-GB");
};

export const formatToDbDate = ({ date, time }: Record<string, string>) => {
  const dateArr = date.split("/");
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]} ${time}.000000`;
};
