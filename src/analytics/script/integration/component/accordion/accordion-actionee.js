import { ComponentActionee } from '../component-actionee';
import { AccordionSelector } from './accordion-selector';
import { AccordionButtonActionee } from './accordion-button-actionee';
import { Type } from '../../../analytics/action/type';
import ID from './id';

class AccordionActionee extends ComponentActionee {
  constructor () {
    super(Type.DISCLOSE, 2);
  }

  static get instanceClassName () {
    return 'AccordionActionee';
  }

  init () {
    this.wrapper = this.node.closest(AccordionSelector.ACCORDION);
    this.detectLevel(this.wrapper);
    this.register(`[aria-controls="${this.id}"]`, AccordionButtonActionee);
    this._instance = this.element.getInstance('Collapse');
    this.listenDisclose();
  }

  get label () {
    if (this.wrapper) {
      const title = this.wrapper.querySelector(AccordionSelector.TITLE);
      if (title) return title.textContent.trim();
    }
    const button = this._instance.buttons.filter(button => button.isPrimary)[0];
    if (button) return button.node.textContent.trim();
    return null;
  }

  get component () {
    return ID;
  }
}

export { AccordionActionee };
