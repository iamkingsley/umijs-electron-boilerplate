// @flow
import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import Check, { Has } from './CheckPermissions';

/* eslint-disable import/no-mutable-exports */
let CURRENT: string[] = ['NULL'];
Authorized.Secured = Secured;
Authorized.Route = AuthorizedRoute;
Authorized.Check = Check;
Authorized.Has = Has;

type ClaimFN = () => string | string[];
type TClaim = string | string[] | ClaimFN;
/**
 * use  authority or getAuthority
 * @param {Array|()=>Array|string} claims
 */
const renderAuthorize = (claims: TClaim): typeof Authorized => {
  if (claims) {
    if (claims.constructor.name === 'Function' && typeof claims === 'function') {
      claims = claims(); // str or str[]
    }
    if (claims.constructor.name === 'String' && typeof claims === 'string') {
      CURRENT = [claims];
    } else if (Array.isArray(claims)) {
      CURRENT = claims;
    }
  } else {
    CURRENT = ['NULL'];
    let t = 1;
  }

  return Authorized;
};

export { CURRENT };
export default renderAuthorize;
