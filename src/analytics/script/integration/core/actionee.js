import api from '../../../api.js';
import { Type } from '../../analytics/action/type';
import { ActionElement } from '../../analytics/action/action-element';

class Actionee extends api.core.Instance {
  constructor (type = null, priority = -1, category = '', title = null) {
    super();
    this._type = type;
    this._priority = priority;
    this._category = category;
    this._title = title;
    this._data = {};
  }

  static get instanceClassName () {
    return 'Actionee';
  }

  get proxy () {
    const scope = this;

    const proxy = {
      validate: (target, members) => scope.validate(target, members)
    };

    const proxyAccessors = {
      get isActionee () {
        return true;
      },
      get label () {
        return scope.label;
      },
      get priority () {
        return scope.priority;
      },
      get level () {
        return scope.level;
      },
      get node () {
        return scope.node; // TODO: remove in v2
      }
    };

    return api.internals.property.completeAssign(super.proxy, proxy, proxyAccessors);
  }

  listenClick () {
    this.listen('click', this.handleClick.bind(this), { capture: true });
  }

  handleClick () {
    this.act();
  }

  _config (element, registration) {
    super._config(element, registration);
    if (this._type !== null) this._actionElement = new ActionElement(this.node, this._type, this.id, this._category, this._title);

    const actionees = element.instances.filter(instance => instance.isActionee).sort((a, b) => b.priority - a.priority);
    if (actionees.length <= 1) return;
    actionees.forEach((actionee, index) => { actionee.isMuted = index > 0; });
  }

  get isMuted () {
    return !this._actionElement && this._actionElement.isMuted;
  }

  set isMuted (value) {
    if (this._actionElement) this._actionElement.isMuted = value;
  }

  detectInteraction (node) {
    if (!node) node = this.node;
    const tag = node.tagName.toLowerCase();
    const href = node.getAttribute('href');
    const target = node.getAttribute('target');
    const isDownload = node.hasAttribute('download');

    switch (true) {
      case tag === 'a' && isDownload:
        this._type = Type.DOWNLOAD;
        this._data.component_value = href;
        break;

      case tag === 'a' && typeof target === 'string' && target.toLowerCase() === '_blank':
        this._type = Type.EXTERNAL;
        this._data.component_value = href;
        break;

      case tag === 'a':
        this._type = Type.INTERNAL;
        this._data.component_value = href;
        break;

      default:
        this._type = Type.CLICK;
    }
  }

  act (data = {}) {
    if (this._actionElement !== undefined) this._actionElement.act(Object.assign(this._data, data));
  }

  getInteractionLabel () {
    const title = this.getAttribute('title');
    if (title) return title;

    const content = this.node.textContent.trim();
    if (content) return content;

    const img = this.node.querySelector('img');
    if (img) return img.getAttribute('alt').trim();

    return null;
  }

  detectLevel (node) {
    if (!node) node = this.node;
    const selector = Array.from({ length: 6 }, (v, i) => `h${i + 1}`).join(',');
    const levels = [...node.querySelectorAll(selector)].map(heading => Number(heading.tagName.charAt(1)));
    if (levels.length) this._level = Math.min.apply(null, levels) - 1;
  }

  validate (target) {
    return true;
  }

  get actionElement () {
    return this._actionElement;
  }

  get label () {
    return null;
  }

  get priority () {
    return this._priority;
  }

  get isActionee () {
    return true;
  }

  get level () {
    return this._level;
  }
}

export { Actionee };
