export class ObjectValue<T> {
  protected value: T;
  constructor(value: T) {
    this.value = value;
  }
  public getValue(): T {
    return this.value;
  }
  public setValue(newValue: T) {
    this.value = newValue;
  }
}
