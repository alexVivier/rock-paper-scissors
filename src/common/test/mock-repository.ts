export class MockRepository<T> {

  public isAsync: boolean;
  public element: T;
  public elements: T[];

  constructor(isAsync: boolean = false, element: T = null, elements: T[] = []) {
    this.isAsync = isAsync;
    this.elements = elements;
    this.element = element;
    return this;
  }

  public save = jest.fn(() => {
    return this.element;
  });
}