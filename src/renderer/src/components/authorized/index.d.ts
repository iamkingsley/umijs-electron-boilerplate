import * as React from 'react';
import Authorized from './Authorized';

type authorityFN = (currentAuthority?: string[]) => boolean;

export type Tauthority = string | Array<string> | authorityFN | Promise<any>;

export type IReactComponent<P = any> =
  | React.StatelessComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>
  | React.ReactNode;

export interface Secured {
  (authority: Tauthority, error?: React.ReactNode): <T extends IReactComponent>(target: T) => T;
}

export interface check {
  <T extends IReactComponent, S extends IReactComponent>(
    authority: Tauthority,
    target: T,
    Exception: S
  ): T | S | React.ReactNode;
}

declare function renderAuthorize(currentAuthority: string[]): typeof Authorized;

export default renderAuthorize;
