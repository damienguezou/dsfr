import { ComponentActionee } from '../component-actionee';
import { Type } from '../../../analytics/action/type';
import ID from './id';

class LinkActionee extends ComponentActionee {
  constructor () {
    super(Type.INTERNAL, 1);
  }

  static get instanceClassName () {
    return 'LinkActionee';
  }

  init () {
    this.detectInteraction();
    this.listenClick();
  }

  get label () {
    return this.node.textContent.trim();
  }

  get component () {
    return ID;
  }
}

export { LinkActionee };
