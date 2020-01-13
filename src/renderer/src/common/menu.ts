import { isUrl } from '../utils';
import { MenuItem } from '../common/typings';

const menuData: Array<MenuItem> = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: '',
    hideInHeader: true,
  },
  {
    name: 'Settings',
    icon: 'setting',
    path: 'settings',
    hideInHeader: true,
    children: [
      {
        name: 'Profile',
        icon: 'user',
        path: 'profile',
      },
      {
        name: 'Access Groups',
        path: 'groups',
        icon: 'lock',
      },
      {
        name: 'Users',
        icon: 'team',
        path: 'users',
      },
    ],
  },
];

function formatter(
  data: Array<MenuItem>,
  parentPath: string = '/',
  parentAuthority: string = null
): Array<MenuItem> {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = (): Array<MenuItem> => formatter(menuData);
