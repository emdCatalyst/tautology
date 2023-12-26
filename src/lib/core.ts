import { EvaluatesTo, Precedence } from "@/lib/types";

/**
 * This class is a simple wrapper around an array to represent a stack, this is purely to highlight the usage of stacks in many of the algorithms implemented here
 */
class Stack<T> {
  readonly data: T[] = [];
  constructor() {}
  /**
   * Push into the stack
   * @param item Item to push to the stack
   * @returns item
   */
  push(item: T): T {
    this.data.push(item);
    return item;
  }
  /**
   * Pop from the stack
   * @returns T | undefined
   */
  pop(): T | undefined {
    return this.data.pop();
  }
  empty(): boolean {
    return this.size() == 0;
  }
  top(): T | undefined {
    if (this.empty()) return undefined;
    return this.data[this.size() - 1];
  }
  size(): number {
    return this.data.length;
  }
}
class Operator {
  is: EvaluatesTo;
  readonly position: number;
  readonly _str: string;
  precedence: Precedence;
  private constructor(
    content: string,
    pos: number,
    is: EvaluatesTo,
    precedence: Precedence
  ) {
    this.position = pos;
    this._str = content;
    this.is = is;
    this.precedence = precedence;
  }
  static from(content: string, pos: number): null | Operator {
    let is;
    let precedence: Precedence = -1;
    console.log("[Operator class] Content: ", content);
    switch (content) {
      case "~":
      case "¬":
        console.log("[Operator class] Found match: ", content == "¬");
        is = EvaluatesTo.NOT;
        precedence = 6;
        break;
      case "∧":
      case ".":
        is = EvaluatesTo.AND;
        precedence = 5;
        break;
      case "V":
      case "+":
        is = EvaluatesTo.OR;
        precedence = 4;
        break;
      case "⊕":
        is = EvaluatesTo.XOR;
        precedence = 3;
        break;
      case "→":
        is = EvaluatesTo.IMPL;
        precedence = 2;
        break;
      case "↔":
        is = EvaluatesTo.EQUIV;
        precedence = 1;
        break;
      case "(":
        is = EvaluatesTo.L_PAR;
        precedence = 0;
        break;
      case ")":
        is = EvaluatesTo.R_PAR;
        precedence = 0;
        break;
      default:
        break;
    }
    console.log("[Operator class] Is ", is);
    if (!is) return null;
    let operator = new Operator(content, pos, is, precedence);
    return operator;
  }
}
class Operand {
  readonly is: string;
  readonly position: number;
  private constructor(content: string, pos: number) {
    this.is = content;
    this.position = pos;
  }
  static from(content: string, pos: number) {
    if (/[A-UW-Za-uw-z]/.test(content)) {
      let operand = new Operand(content, pos);
      return operand;
    } // V is considered an Operator
    else return null;
  }
}
class PositionWrapper {
  readonly is: string;
  readonly position: number;
  constructor(content: string, pos: number) {
    this.is = content;
    this.position = pos;
  }
}
export { Stack, Operand, Operator, PositionWrapper };
