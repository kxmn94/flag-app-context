export const capitalize = (word) => {
  const arr = word.split(" ");
  return arr
    .map((w) => w.charAt(0).toUpperCase().concat(w.substring(1)))
    .toString()
    .replace(/,/g, " ");
};

export const addCommas = (arr) => {
  return arr.map((e, index) => {
    if (arr.length > 1) {
      return <span key={index}>{`${e.name}, `}</span>;
    }
    return <span key={index}>{`${e.name}`}</span>;;
  });
};

export const format = (number) => new Intl.NumberFormat().format(number);
