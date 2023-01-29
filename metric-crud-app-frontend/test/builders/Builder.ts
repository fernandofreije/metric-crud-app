import { merge, PartialShallow } from 'lodash';

export abstract class Builder<T> {
  protected abstract entity: T;

  public with(entity: PartialShallow<T>): Builder<T> {
    merge(this.entity, entity);

    return this;
  }

  public get(): T {
    return this.entity;
  }
}
