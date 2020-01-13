import React from 'react';
import { message } from 'antd';
import { T_Dispatch, Loading } from 'typings';
import { routerRedux } from 'dva/router';

export interface RouteWrapperProps {
  settings: any;
  dispatch: T_Dispatch;
  loading: Loading;
}
export interface RouteWrapperState {
  item?: any;
  delete_modal_visible?: boolean;
  entry_delete_modal_visible?: boolean;
  new_modal_visible?: boolean;
  item_edit_mode?: boolean;
  entry_modal_visible?: boolean;
  formData?: any;
}

class RouteWrapper<
  InnerProps extends RouteWrapperProps,
  InnerState extends RouteWrapperState
> extends React.Component<InnerProps, InnerState> {
  model: string;
  refreshList: string[];
  formRef: any;

  handlePrint: () => void;
  handleSubMenuClickDefault: (key: string | number) => void;
  handleSaveSuccess: (data: any) => void;

  constructor(props: InnerProps) {
    super(props);
    this.state = {
      entry_delete_modal_visible: false,
      delete_modal_visible: false,
      entry_modal_visible: false,
      new_modal_visible: false,
      item_edit_mode: false,
      item: null,
      formData: null,
    };
  }
  setRef = v => (this.formRef = v);

  handleItemSave = () => {
    return;
  }

  handleItemClose = () => {
    this.props.dispatch(routerRedux.goBack());
  }

  handleFormClear = () => {
    const { item } = this.state;
    const itemCopy: object = item as object;
    this.setState({ formData: item ? { ...itemCopy } : null });
  }

  handleNotFound = () => {
    message.warn('Item does not exisit');
    this.handleItemClose();
  }

  handleFormFieldChange = <T extends {}, U extends {}>(key: string, value: T) => {
    let { formData } = this.state;
    if (!formData) { formData = {} as U; }
    formData[key] = value;
    this.setState({ formData });
  }

  // local state handlers
  handleModalCancel = () =>
    this.setState({
      delete_modal_visible: false,
      entry_modal_visible: false,
      new_modal_visible: false,
      entry_delete_modal_visible: false,
    })

  /** submenu handlers */
  handleItemEdit = () => {
    this.setState({
      new_modal_visible: this.props.settings && this.props.settings.edit_mode === 'modal',
      item_edit_mode: true,
    });
  }
  handleItemNew = () =>
    this.setState({
      new_modal_visible: true,
      item_edit_mode: false,
    })

  handleItemDelete = () =>
    this.setState({
      delete_modal_visible: true,
    })

  handleListRefresh = (): void => {
    this.handleFetchNext();
    if (this.refreshList) {
      this.refreshList.map((model: string) => {
        model !== this.model && this.handleFetchNext(model);
      });
    }
  }

  handleEntryNew = () =>
    this.setState({
      entry_modal_visible: true,
      item_edit_mode: false,
    })
  handleEntryDelete = () =>
    this.setState({
      entry_delete_modal_visible: true,
    })
  /** end submenu handler */

  /** click handler */
  handleSubMenuClick = key => {
    switch (key) {
      case 'close':
        this.handleItemClose();
        break;
      case 'clear':
        this.handleFormClear();
        break;
      case 'edit':
        this.handleItemEdit();
        break;
      case 'new':
        this.handleItemNew();
        break;
      case 'save':
        this.handleItemSave();
        break;
      case 'delete':
        this.handleItemDelete();
        break;
      case 'refresh':
        this.handleListRefresh();
        break;
      case 'print':
        this.handlePrint();
        break;
      // case 'entry':
      //   this.handleEntryNew();
      //   break;
      // case 'entry_delete':
      //   this.handleEntryDelete();
      //   break;
      default:
        if (typeof this.handleSubMenuClickDefault === 'function') {
          this.handleSubMenuClickDefault(key);
        }
        break;
    }
  }
  /** end click handler */

  /*
   * state modifiers
   */

  handleItemSaveOk = payload => {
    const { item, item_edit_mode } = this.state;
    const itemCopy: object = item as object;
    const data = item_edit_mode ? { ...itemCopy, ...payload } : payload;

    this.props.dispatch({
      type: this.model + '/save',
      payload: data,
      done: (err, savedData) => {
        if (err == null) {
          this.setState(
            {
              item: savedData,
            },
            () => {
              this.handleModalCancel();
              if (typeof this.handleSaveSuccess === 'function') { this.handleSaveSuccess(savedData); }
              message.success('Item details saved');
            },
          );
        } else {
          message.warning(err.message || 'Saving details failed');
        }
      },
    });
  }

  handleItemDeleteOk = () => {
    this.props.dispatch({
      type: this.model + '/remove',
      payload: this.state.item,
      done: err => {
        this.handleModalCancel();
        if (err) {
          message.warning('Delete failed');
        } else {
          message.success('Item removed');
          this.setState(
            {
              item: null,
            },
            () => {
              this.handleItemClose();
            },
          );
        }
      },
    });
  }

  handleFetchNext = (model: string = this.model, options: object = {}) => {
    return this.props.dispatch({
      type: model + '/fetch',
      options,
      done: err => {
        return new Promise((res, rej) => {
          if (err) {
            message.warning(`Fetching ${model.split('_').join(' ')} failed`);
            rej(false);
          } else { res(true); }
        });
      },
    });
  }
  /** endstate modifiers */
}

export default RouteWrapper;
