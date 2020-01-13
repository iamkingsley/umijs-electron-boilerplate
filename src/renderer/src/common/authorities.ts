import { Authority } from '@/models/models';

export const authList: Array<Authority> = [
  {
    _id: 'USR',
    name: 'User management',
    detail: 'Rights to manage user accounts',
    children: [
      {
        _id: 'USR_VIEW',
        name: 'View user',
        detail: 'Can view all or one user',
      },
      {
        _id: 'USR_ADD',
        name: 'Create user',
        detail: 'Can create new user account',
      },
      {
        _id: 'USR_EDIT',
        name: 'Modify user',
        detail: 'Can edit user accounts',
      },
      {
        _id: 'USR_PROFILE',
        name: 'Manage profile',
        detail: 'Can edit own profile and password',
      },
      {
        _id: 'USR_REMOVE',
        name: 'Remove user',
        detail: 'Can remove user accounts',
      },
    ],
  },
  {
    _id: 'GRP',
    name: 'Access group managemet',
    detail: 'Right to manage access groups',
    children: [
      {
        _id: 'GRP_VIEW',
        name: 'View Access groups',
        detail: 'Can view access groups',
      },
      {
        _id: 'GRP_ADD',
        name: 'Create new Access groups',
        detail: 'Can create access groups',
      },
      {
        _id: 'GRP_EDIT',
        name: 'Edit Access groups',
        detail: 'Can modify access groups',
      },
      {
        _id: 'GRP_REMOVE',
        name: ' Access groups',
        detail: 'Can remove access groups',
      },
    ],
  },
  {
    _id: 'SET',
    name: 'App setting managemet',
    detail: 'Rights for changing app settings',
    children: [
      {
        _id: 'SET_VIEW',
        name: 'View Settings',
        detail: 'Can view settings',
      },
      {
        _id: 'SET_EDIT',
        name: 'Modify Settings',
        detail: 'Can edit settings',
      },
    ],
  },
  {
    _id: 'CAT',
    name: 'Categories managemet',
    detail: 'Right to manage categories',
    children: [
      {
        _id: 'CAT_VIEW',
        name: 'View Categories',
        detail: 'Can view categories',
      },
      {
        _id: 'CAT_ADD',
        name: 'Create new Categories',
        detail: 'Can create categories',
      },
      {
        _id: 'CAT_EDIT',
        name: 'Edit Categories',
        detail: 'Can modify categories',
      },
      {
        _id: 'CAT_REMOVE',
        name: ' Categories',
        detail: 'Can remove categories',
      },
    ],
  },
  {
    _id: 'PDT',
    name: 'Products managemet',
    detail: 'Right to manage products',
    children: [
      {
        _id: 'PDT_VIEW',
        name: 'View Products',
        detail: 'Can view products',
      },
      {
        _id: 'PDT_ADD',
        name: 'Create new Products',
        detail: 'Can create products',
      },
      {
        _id: 'PDT_EDIT',
        name: 'Edit Products',
        detail: 'Can modify products',
      },
      {
        _id: 'PDT_REMOVE',
        name: ' Products',
        detail: 'Can remove products',
      },
    ],
  },
];
