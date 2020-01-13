import React from "react";
// @ts-ignore
import styles from './index.less';

interface Props extends React.Props<any>{
}
const UnAuthLayout: React.FunctionComponent<Props>=({children})=>{
  return (
    <div className={styles.normal}>
    {children}
  </div>
  )
}
export default UnAuthLayout;
