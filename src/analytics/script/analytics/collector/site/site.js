import api from '../../../../api';
import Environment from './environment';
import normalize from '../../utils/normalize';
import { validateGeography, validateLang, validateString } from '../../utils/type-validator';

class Site {
  constructor (config) {
    this._config = config || {};
  }

  reset (clear = false) {
    this.environment = clear ? undefined : this._config.environment;
    this.entity = clear ? undefined : this._config.entity;
    this.language = clear ? document.documentElement.lang : this._config.language || document.documentElement.lang;
    this.target = clear ? undefined : this._config.target;
    this.type = clear ? undefined : this._config.type;
    this.region = clear ? undefined : this._config.region;
    this.department = clear ? undefined : this._config.department;
  }

  set environment (value) {
    switch (value) {
      case Environment.PRODUCTION.id:
      case Environment.PRODUCTION.value:
        this._environment = Environment.PRODUCTION;
        break;

      case Environment.STAGE.id:
      case Environment.STAGE.value:
        this._environment = Environment.STAGE;
        break;

      case Environment.DEVELOPMENT.id:
      case Environment.DEVELOPMENT.value:
        this._environment = Environment.DEVELOPMENT;
        break;

      default:

        this._environment = Environment.DEVELOPMENT;
    }
  }

  get environment () {
    return this._environment.id;
  }

  set entity (value) {
    const valid = validateString(value, 'site.entity');
    if (valid !== null) this._entity = valid;
  }

  get entity () {
    return this._entity;
  }

  set language (value) {
    const valid = validateLang(value, 'site.language');
    if (valid !== null) this._language = valid;
  }

  get language () {
    return this._language;
  }

  set target (value) {
    const valid = validateString(value, 'site.target');
    if (valid !== null) this._target = valid;
  }

  get target () {
    return this._target;
  }

  set type (value) {
    const valid = validateString(value, 'site.type');
    if (valid !== null) this._type = valid;
  }

  get type () {
    return this._type;
  }

  set region (value) {
    const valid = validateGeography(value, 'site.region');
    if (valid !== null) this._region = valid;
  }

  get region () {
    return this._region;
  }

  set department (value) {
    const valid = validateGeography(value, 'site.department');
    if (valid !== null) this._department = valid;
  }

  get department () {
    return this._department;
  }

  get layer () {
    const layer = [];
    layer.push('site_environment', this._environment.value);
    if (this._entity) layer.push('site_entity', normalize(this._entity));
    else api.inspector.warn('entity is required in analytics.site');
    if (this._language) layer.push('site_language', this._language);
    if (this._target) layer.push('site_target', normalize(this._target));
    if (this._type) layer.push('site_type', normalize(this._type));
    if (this._region) layer.push('site_region', this._region);
    if (this._department) layer.push('site_department', this._department);
    return layer;
  }
}

Site.Environment = Environment;

export { Site };
