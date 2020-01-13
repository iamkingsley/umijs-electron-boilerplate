export interface MenuItem {
  name: string;
  path: string;
  key?: string;
  icon?: string;
  title?: string;
  children?: Array<MenuItem>;
  authority?: string;
  hideInHeader?: boolean;
  hideInSider?: boolean;
  target?: string;
}
