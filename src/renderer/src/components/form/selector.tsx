import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

type itemOpt = {
  _id?: string;
  id?: string;
  key?: string;
  name: string;
};

interface Props extends Partial<Select> {
  items: Array<itemOpt>;
  placeholder?: string;
  enableSearch?: boolean;
  disabled?: boolean;
  notFoundContent?: any;
  value?: any;
  mode?: string;
  onChange?: (x: any) => void;
};

const SelectOption=(t: itemOpt,i): React.ReactNode=> {
  const value = t.key || t._id || t.id || t;
  // const key=t.key || i++;
  return (
    <Option key={value} >
      {t.name}
    </Option>
  );
}

function SelectOptions(items: Array<itemOpt>) {
  return items.map(SelectOption);
}

class Selector extends React.Component<Props> {
  render() {
    let { placeholder, items, enableSearch, ...rest } = this.props;

    let searchV = {};
    if (enableSearch) {
      searchV = {
        showSearch: true,
        optionFilterProp: 'children',
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      };
    }
    rest.value = rest.value || undefined;
    return (
      <Select
        placeholder={placeholder || 'Select'}
        style={{ width: '100%' }}
        {...searchV}
        {...rest}
      >
        {SelectOptions(items)}
      </Select>
    );
  }
}

const _Select =(props)=> {
    let { placeholder, items, enableSearch,getFieldDecorator, ...rest } = props;

    let searchV = {};
    if (enableSearch) {
      searchV = {
        showSearch: true,
        optionFilterProp: 'children',
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      };
    }
    rest.value = rest.value || undefined;
    return (
      getFieldDecorator("groups", {
        rules: [
          {
            required: true,
            message: "Name is required"
          },
        ]
      })(
      <Select
        placeholder={placeholder || 'Select'}
        style={{ width: '100%' }}
        {...searchV}
        {...rest}
        required={true}
      >
        {SelectOptions(items)}
      </Select>
      )
    );
}
export {_Select}

export default Selector;
