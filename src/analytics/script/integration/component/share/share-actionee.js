import { ComponentActionee } from '../component-actionee';
import { Type } from '../../../analytics/action/type';
import ID from './id';
import { ShareSelector } from './share-selector';

class ShareActionee extends ComponentActionee {
  constructor () {
    super(Type.IMPRESSION, 1);
  }

  static get instanceClassName () {
    return 'ShareActionee';
  }

  get label () {
    const title = this.querySelector(ShareSelector.TITLE);
    if (title) return title.textContent.trim();
    return 'Boutons de partage';
  }

  get component () {
    return ID;
  }
}

export { ShareActionee };
