import React from 'react';
import { Menu, Icon, Row, Input } from 'antd';
import styles from './sub-menu.less';
import classNames from 'classnames';
import Search from 'antd/lib/input/Search';

interface BtnItem {
  loading?: boolean;
  disabled?: boolean;
}
export interface Buttons {
  edit?: BtnItem;
  back?: BtnItem;
  add?: BtnItem;
  save?: BtnItem;
  delete?: BtnItem;
  close?: BtnItem;
  refresh?: BtnItem;
  reset?: BtnItem;
  print?: BtnItem;
}

interface MenuProps {
  onItemClick: (x: string) => void;
  isMobile?: boolean;
  buttons: Buttons;
  title?: React.ReactNode;
  handleSearch?: (x: any) => void;
  textMenu?: any;
}

const ViewMenu = ({
  onItemClick,
  isMobile = false,
  buttons,
  title = '',
  handleSearch = null,
  textMenu = null,
}: MenuProps) => {
  const onClickHandler = ({ item, key }) => onItemClick(key);
  return (
    <div className="row">
      <div className={classNames('col', styles.submenuTitle)}>{title}</div>
      <div className="col">
        <div className={styles.subMenuHolder}>
          {handleSearch && (
            <div className={classNames(styles.searchBox)}>
              <Search placeholder="Search" className={styles.searchInput} onSearch={handleSearch} />
            </div>
          )}
          {
            textMenu && textMenu
          }
          <Menu mode="horizontal" onClick={onClickHandler} className={styles.subMenu}>
            {buttons.back && BackButton(buttons.back)}
            {buttons.refresh && RefreshButton(buttons.refresh)}
            {buttons.add && AddButton(buttons.add)}
            {buttons.edit && EditButton(buttons.edit)}
            {buttons.save && SaveButton(buttons.save)}
            {buttons.reset && ResetFormButton(buttons.reset)}
            {buttons.delete && DeleteButton(buttons.delete)}
            {buttons.close && CloseButton(buttons.close)}
            {buttons.print && PrintButton(buttons.print)}
          </Menu>
        </div>
      </div>
    </div>
  );
};

const SaveButton = ({ disabled = false, loading = false, icon = 'save', text = 'Save' }) => {
  icon = loading ? 'loading' : icon;
  return Button({
    disabled: disabled || loading,
    icon,
    text,
    className: styles.btnGo,
    key: 'save',
  });
};

const AddButton = ({ icon = 'plus', text = 'Add New', loading = false, disabled = false }) =>
  Button({ icon, text, className: styles.btnGo, key: 'new', disabled: loading || disabled });

const EditButton = ({ icon = 'edit', text = 'Edit Distributor info', loading = false, disabled = false }) =>
  Button({ icon, text, className: styles.btnGo, key: 'edit', disabled: loading || disabled });

const CloseButton = ({ disabled = false, loading = false, icon = 'close', text = 'Close' }) =>
  Button({ disabled: disabled || loading, icon, text, className: styles.btnPlain, key: 'close' });

const PrintButton = ({ disabled = false, loading = false, icon = 'printer', text = 'Print' }) =>
  Button({ disabled: disabled || loading, icon, text, className: styles.btnMo, key: 'print' });

const ResetFormButton = ({ disabled = false, loading = false, icon = 'stop', text = 'Reset' }) =>
  Button({ disabled: disabled || loading, icon, text, className: styles.btnWarn, key: 'clear' });

const BackButton = ({ disabled = false, loading = false, icon = 'left', text = 'Back' }) =>
  Button({ disabled: disabled || loading, icon, text, className: styles.btnPlain, key: 'close' });

const DeleteButton = ({ disabled = false, loading = false, icon = 'delete', text = 'Delete' }) => {
  icon = loading ? 'loading' : icon;
  return Button({
    disabled: disabled || loading,
    icon,
    text,
    className: styles.btnDel,
    key: 'delete',
  });
};

const RefreshButton = ({ disabled = false, loading = false, icon = 'sync', text = 'Sync' }) =>
  Button({
    disabled: disabled || loading,
    icon,
    text,
    className: styles.btnPlain,
    key: 'refresh',
    spin: loading,
  });

const Button = ({
  disabled = false,
  key,
  icon = 'close',
  text,
  className = styles.menuBtn,
  spin = false,
}) => (
  <Menu.Item disabled={disabled} key={key} className={classNames(styles.btnMo, className)} title={text}>
    <Icon type={icon} spin={spin} />
    {/* {text} */}
  </Menu.Item>
);
export default ViewMenu;
