import { ComponentActionee } from '../component-actionee';

class NavigationActionee extends ComponentActionee {
  constructor () {
    super(null, 1);
  }

  static get instanceClassName () {
    return 'NavigationActionee';
  }

  get label () {
    return 'Navigation';
  }
}

export { NavigationActionee };
