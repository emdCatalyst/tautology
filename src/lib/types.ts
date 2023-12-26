import { SetStateAction, Dispatch } from "react";
import { Operand, Operator, PositionWrapper } from "@/lib/core";
type SetStringState = Dispatch<SetStateAction<string>>;
enum EvaluatesTo {
  NOT = 1, // avoid false 0's when using if(EvaluatesTo)
  OR,
  AND,
  XOR,
  IMPL,
  EQUIV,
  L_PAR,
  R_PAR,
}
enum ResultState {
  Ok,
  Err,
}
type Result<T, E> =
  | { state: ResultState.Ok; content: T }
  | { state: ResultState.Err; content: E };
type ParseReturnType = Result<
  (Operand | Operator)[],
  {
    errorCode: 1 | 2 | 3 | 4 | 5 | 6;
    token: Operator | Operand | PositionWrapper;
  }
>;
type OperandValues = { [key: string]: 1 | 0 }; // a map representing variable values, 0 or 1
type Precedence = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;
export { EvaluatesTo, ResultState };
export type {
  SetStringState,
  Result,
  ParseReturnType,
  OperandValues,
  Precedence,
};
