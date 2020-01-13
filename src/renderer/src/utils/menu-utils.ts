export const conversionPath = (path: string): string => {
  if (path && path.indexOf('http') === 0) {
    return path;
  } else {
    return `/${path || ''}`.replace(/\/+/g, '/');
  }
};
