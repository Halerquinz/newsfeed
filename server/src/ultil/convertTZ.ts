export const convertTZ = (utcStringDate: string) => {
  const utcDate = new Date(utcStringDate);
  const time = utcDate.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const date = utcDate.toLocaleDateString("en-GB");
  return {
    date,
    time,
  };
};

export const formatToDbDate = ({ date, time }: Record<string, string>) => {
  const dateArr = date.split("/");
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]} ${time}.000000`;
};
