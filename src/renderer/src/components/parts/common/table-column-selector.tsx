import React from 'react';
import { Form, Checkbox, Row, Col, Button } from 'antd';
import styles from '@/global.less';
import { Column } from '@/components/parts/common/view-list';

interface Props {
  fields: Column[];
  onSubmit: (x: any) => void;
}
const TableColumnSelectorForm = ({ fields, onSubmit }: Props) => {
  const checkedValues = fields.filter(f => f.checked).map(f => f.key);
  let _val = checkedValues;

  const handleChange = vals => {
    _val = vals;
  };
  const handleSubmit = () => onSubmit(_val);
  return (
    <Form style={{ width: 150 }} onSubmit={onSubmit}>
      <Form.Item style={{ marginBottom: 5, maxHeight: 200, overflowY: 'auto' }}>
        <Checkbox.Group defaultValue={checkedValues} onChange={handleChange}>
          <Row>
            {fields.map(f => (
              <Col span={24} key={f.key}>
                <Checkbox style={{ lineHeight: 2 }} value={f.key} disabled={!f.canHide}>
                  {f.title}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <div>
        <Button className={styles.btnGo} onClick={handleSubmit}>
          Done
        </Button>
      </div>
    </Form>
  );
};
export default TableColumnSelectorForm;
