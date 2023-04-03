export const formatDay = (s: string) => {
  const sArr = s.split("-");
  const year = sArr[0];
  const month = sArr[1];
  const date = sArr[2].slice(0, 2);

  return `${date}/${month}/${year}`;
};
