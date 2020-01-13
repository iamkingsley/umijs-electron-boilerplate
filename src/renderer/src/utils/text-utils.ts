export const shortenName = (name, shortenLen = 100) => {
  return name.length < shortenLen ? name : name.substr(0, shortenLen - 3) + '...';
};
