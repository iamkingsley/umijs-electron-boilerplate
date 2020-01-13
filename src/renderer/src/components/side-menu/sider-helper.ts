import { urlToList } from '../../utils';
import pathToRegexp from 'path-to-regexp';
import { MenuItem } from '@/common/typings';

interface UU {
  location: Location;
}

export default class SiderHelper {
  static getMenuMatchKeys(flatMenuKeys: string[], path: string): string[] {
    return flatMenuKeys.filter(item => {
      return pathToRegexp(item).test(path);
    });
  }

  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  static getDefaultCollapsedSubMenus<T>(props: UU, flatMenuKeys: Array<string>): string[] {
    const {
      location: { pathname },
    } = props;
    return urlToList(pathname)
      .map(item => {
        return SiderHelper.getMenuMatchKeys(flatMenuKeys, item)[0];
      })
      .filter(item => item);
  }

  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  static getFlatMenuKeys = (menus: Array<MenuItem>): Array<string> => {
    let keys: Array<string> = [];
    menus.forEach(item => {
      if (item.children) {
        keys = keys.concat(SiderHelper.getFlatMenuKeys(item.children));
      }
      keys.push(item.path);
    });
    return keys;
  };
}
