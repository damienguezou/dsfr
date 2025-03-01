import api from '../../../../api.js';
import { ComponentActionee } from '../component-actionee';
import { HeaderModalButtonActionee } from './header-modal-button-actionee';

class HeaderModalActionee extends ComponentActionee {
  constructor () {
    super(null, 0);
  }

  static get instanceClassName () {
    return 'HeaderModalActionee';
  }

  init () {
    if (this.isBreakpoint(api.core.Breakpoints.LG)) {
      this._priority = 4;
      this.register(`[aria-controls="${this.id}"]`, HeaderModalButtonActionee);
    }
  }
}

export { HeaderModalActionee };
