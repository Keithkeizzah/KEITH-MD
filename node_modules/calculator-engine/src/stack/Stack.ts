import { List } from './linkedlist/List';

interface StactInterface<T> {
  push(value: T): void;
  pop(): T;
  peek(): T;
  isEmpty(): boolean;
  size(): number;
}
export class Stack<T> implements StactInterface<T> {
  private list: List<T>;

  constructor() {
    this.list = new List<T>();
  }

  push(value: T): void {
    this.list.insertFirst(value);
  }
  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Stack Is Empty");
    }
    return this.list.removeFirst();
  }
  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Stack Is Empty");
    }
    return this.list.getFirst();
  }
  isEmpty(): boolean {
    return this.list.isEmpty();
  }
  size(): number {
    return this.list.length();
  }

  public display(){
      this.list.display();
  }
}
