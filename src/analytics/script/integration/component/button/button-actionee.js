import { ComponentActionee } from '../component-actionee';
import ID from './id';
import { ButtonEmission } from './button-emission';

class ButtonActionee extends ComponentActionee {
  constructor () {
    super(null, 1);
    this._data = {};
  }

  static get instanceClassName () {
    return 'ButtonActionee';
  }

  init () {
    this.detectInteraction();
    this.listenClick();
  }

  handleClick () {
    /* GET_DATA permet d'aller retrouver search_terms dans la search-bar */
    const data = this.ascend(ButtonEmission.GET_DATA);
    this.act(Object.assign({}, ...data));
  }

  get label () {
    return this.node.textContent.trim();
  }

  get component () {
    return ID;
  }
}

export { ButtonActionee };
