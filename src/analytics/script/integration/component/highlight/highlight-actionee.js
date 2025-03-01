import { ComponentActionee } from '../component-actionee';
import { Type } from '../../../analytics/action/type';
import ID from './id';

class HighlightActionee extends ComponentActionee {
  constructor () {
    super(Type.IMPRESSION, 1);
  }

  static get instanceClassName () {
    return 'HighlightActionee';
  }

  get label () {
    return 'Mise en exergue';
  }

  get component () {
    return ID;
  }
}

export { HighlightActionee };
