import React, { ReactNode } from 'react';
import PromiseRender from './PromiseRender';
import { CURRENT } from './index';
import { Alert } from 'antd';
import { Tauthority, IReactComponent } from './index.d';

function isPromise(obj: any): boolean {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { Authorities or claims to check string |array | Promise | Function } authority
 * @param { Current user claims  type:string} claims
 * @param { On success components } target
 * @param { On fail components } Exception
 */
const checkPermissions = <T extends IReactComponent, S extends IReactComponent>(
  authority: Tauthority,
  claims: string[],
  target: T,
  Exception: S
): T | S | React.ReactNode => {
  // Retirement authority, return target;
  if (!authority) {
    return target;
  }

  if (!Array.isArray(claims)) {
    return Exception;
  }
  // Array
  if (Array.isArray(authority)) {
    let val = true;
    authority.forEach(x => {
      if (!claims.find(a => a === x)) {
        val = false;
      }
    });
    if (val) {
      return target;
    }
    return Exception;
  }

  // string
  if (typeof authority === 'string') {
    if (claims.indexOf(authority) >= 0) {
      return target;
    }
    return Exception;
  }

  // Promise
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />;
  }

  // Function
  if (typeof authority === 'function') {
    try {
      const bool = authority(claims);
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

const Has = (
  authority: Tauthority
):boolean => {
  let claims=CURRENT;
  // Retirement authority, return target;
  if (!authority) {
    return true;
  }

  if (!Array.isArray(claims)) {
    return false;
  }
  // Array
  if (Array.isArray(authority)) {
    let val = true;
    authority.forEach(x => {
      if (!claims.find(a => a === x)) {
        val = false;
      }
    });
    if (val) {
      return true;
    }
    return false;
  }

  // string
  if (typeof authority === 'string') {
    if (claims.indexOf(authority) >= 0) {
      return true;
    }
    return false;
  }

  // // Promise
  // if (isPromise(authority)) {
  //   return <PromiseRender ok={target} error={Exception} promise={authority} /> == target;
  // }

  // Function
  if (typeof authority === 'function') {
    try {
      const bool = authority(claims);
      if (bool) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

export { checkPermissions,Has };

/*const check = (authority, target, Exception) => {
  let CURRENT = getAuthority();
  return checkPermissions(authority, CURRENT, target, Exception);
};*/

const Check = <T extends IReactComponent, S extends React.ReactNode>(
  authority: Tauthority,
  target: T,
  Exception?: S | React.ReactNode
): T | S | React.ReactNode => {
  if (!Exception ) {
    Exception = <Alert message="No permission." type="error" showIcon={true} />;
  }
  
  return checkPermissions(authority, CURRENT, target, Exception);
};

export default Check;
