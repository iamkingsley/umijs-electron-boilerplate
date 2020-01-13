import RenderAuthorized from '@/components/authorized';
import { getAuthority } from './authority';

let AUTH = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  AUTH = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default AUTH;
