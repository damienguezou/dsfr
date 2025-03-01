import { ComponentActionee } from '../component-actionee';
import api from '../../../../api';

class HeaderMenuButtonActionee extends ComponentActionee {
  static get instanceClassName () {
    return 'HeaderMenuButtonActionee';
  }

  init () {
    if (this.isBreakpoint(api.core.Breakpoints.LG)) this._priority = 4;
  }
}

export { HeaderMenuButtonActionee };
