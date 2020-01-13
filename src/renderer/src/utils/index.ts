/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

export const sessionStore = <T>(key: string, item: any): T => {
  sessionStorage.setItem(key, JSON.stringify(item));
  return item;
};

export const getSessionItem = <T>(key: string): T => {
  let item = sessionStorage.getItem(key);
  if (!item || item === 'undefined') return null;
  return JSON.parse(item);
};

export function urlToList(url: string): string[] {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}
/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes /*<Route>*/(path /*: string*/, routerData /*: Object*/) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes /*: Array<Route>*/ = renderArr.map(item => {
    const exact /*: boolean*/ = !routes.some(
      route => route !== item && getRelation(route, item) === 1
    );
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

function getRenderArr(routes /*: Array<string>*/) /*: Array<string>*/ {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}
function getRelation(str1 /*: string*/, str2 /*: string*/) /*: number*/ {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

export function Deduplicate(array, key) {
  return array.reduce((x, y) => (x.findIndex(e => e[key] === y[key]) < 0 ? [...x, y] : x), []);
}

export function Merge(array, key) {
  return array.reduce(
    (x, y) =>
      x.findIndex(e => e[key] === y[key]) < 0
        ? [...x, y]
        : x.map(e => (e[key] === y[key] ? { ...e, ...y } : e)),
    []
  );
}

/* export function flattenAuthorities (authorities: Array<Auth>) {
  let ret = [];
  authorities.map(a=>{
    let {children,...auth} = a;
    ret.push(auth);
    if (children) {
      ret = [...ret,...flattenAuthorities(children)]
    }
    return a;
  })
  return ret;
} */

function s4(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export function guid(): string {
  let sep = '-';
  return s4() + s4() + sep + s4() + sep + s4() + sep + s4() + sep + s4() + s4() + s4();
}
