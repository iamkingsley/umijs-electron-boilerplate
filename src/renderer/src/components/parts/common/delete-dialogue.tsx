import React from "react";
import { Alert, Icon, Modal,Button } from 'antd';
import AUTH from '@/utils/authorized';

 const PreDeleteInfo:React.SFC<{name?:string}>=({name=""})=>{
  return (
    <div>
      <h4>Permanently remove {name} group and all of its data? </h4>
      <Alert message={<>This action cannot be reversed <Icon type="warning"/></>} type="warning"/>
    </div>
  )
}


const NoDelPermission=(props)=>{
    const {visible,onCancel}=props
    return (
        <Modal 
            visible={visible}
            onCancel={onCancel}
            // className={styles.deleteModal}
            maskClosable={true}
            footer={<Button type="default" onClick={onCancel}>Close</Button>}
        >
            <Alert message={<>You do not have permission to remove this item. <Icon type="warning"/></>} type="error"/>
        </Modal>
    )
}

const DeleteDialogue=({name,visible,onCancel,onOk,okText,className=undefined,maskClosable=false})=>{
    const _props_={onCancel,visible}
    return (
        <AUTH authority={['GRP_REMOVE']} noMatch={<NoDelPermission {..._props_}/>} >
        <Modal
            visible={visible}
            onCancel={onCancel}
            className={className}
            onOk={onOk}
            maskClosable={maskClosable}
            okText={okText}
            okType="danger"
        >
            <PreDeleteInfo name={name} />
        </Modal>
        </AUTH>
    )
}
export default DeleteDialogue;
