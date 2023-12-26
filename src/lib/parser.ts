import { Stack, PositionWrapper, Operand, Operator } from "@/lib/core";
import { EvaluatesTo, ParseReturnType, ResultState } from "@/lib/types";

function validate(
  token: Operand | Operator,
  previousToken: Operand | Operator | undefined,
  end: boolean
): ParseReturnType {
  if (previousToken) {
    if (previousToken instanceof Operand && token instanceof Operand)
      return {
        state: ResultState.Err,
        content: {
          errorCode: 5,
          token,
        },
      };
    if (
      previousToken instanceof Operator &&
      previousToken.is != EvaluatesTo.R_PAR && // solves (A+B )=>considered illegal .(~A+B)
      token instanceof Operator &&
      token.is != EvaluatesTo.L_PAR
    )
      return {
        state: ResultState.Err,
        content: {
          errorCode: 4,
          token: token,
        },
      };
  } else {
    if (token instanceof Operator && token.is == EvaluatesTo.R_PAR)
      return {
        state: ResultState.Err,
        content: {
          errorCode: 6,
          token: token,
        },
      };
    // first token is not a unary operator and is in the begineening of the sequence
    if (
      token instanceof Operator &&
      token.is != EvaluatesTo.NOT &&
      token.is != EvaluatesTo.L_PAR
    )
      return {
        state: ResultState.Err,
        content: {
          errorCode: 4,
          token: token,
        },
      };
  }
  if (end) {
    if (token instanceof Operator && token.is != EvaluatesTo.R_PAR)
      // fixes A.((A+B) )=>error code 4
      return {
        state: ResultState.Err,
        content: {
          errorCode: 4,
          token: token,
        },
      };
  }
  return { state: ResultState.Ok, content: [] };
}
class Parser {
  /**
   * Returns the reverse polish notation of a given expression
   * @template Result
   * @returns {Result<Token[], { errorCode: 1|2|3; token: Token }>} The result
   */
  static parse(expression: string): ParseReturnType {
    let result: (Operator | Operand)[] = [];
    let operatorStack: Stack<Operator> = new Stack();
    expression = expression.trim().replace(" ", "");
    let previousToken: Operator | Operand | undefined;
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      const token = Operand.from(char, i) ?? Operator.from(char, i);
      //console.log("[Parser Class] Token: ", token);
      if (!token)
        return {
          state: ResultState.Err,
          content: { errorCode: 1, token: new PositionWrapper(char, i) },
        };
      //console.log("Previous token: ", previousToken);
      /*console.log("recieved type: ", token.type());
      console.log("expected type: ", typeof Operator);*/
      // VALIDATIOON LOGIC
      let valid = validate(token, previousToken, i == expression.length - 1);
      if (valid.state == ResultState.Err) return valid;
      previousToken = token;
      // END OF VALIDATION LOGIC
      if (token instanceof Operator) {
        //console.log("Found operator: ", token._str);
        if (token.is == EvaluatesTo.R_PAR) {
          if (operatorStack.empty())
            return {
              state: ResultState.Err,
              content: {
                errorCode: 3,
                token: token,
              },
            }; // we encountered a right para but the stack is empty, no possibilty for a left para to exist
          let foundMatching = false;
          while (!operatorStack.empty()) {
            if (operatorStack.top()?.is == EvaluatesTo.L_PAR) {
              foundMatching = true;
              // pop the left parantheses
              operatorStack.pop();
              break;
            }
            result.push(operatorStack.pop() as Operator);
          }
          if (!foundMatching)
            return {
              state: ResultState.Err,
              content: {
                errorCode: 3,
                token: token,
              },
            };
        } else {
          // If it is a normal operator
          if (token.is != EvaluatesTo.L_PAR) {
            while (
              !operatorStack.empty() &&
              (operatorStack.top()?.precedence || 0) > token.precedence
            ) {
              const popped = operatorStack.pop() as Operator;
              //console.log("Popped operator because of precedence: ", popped);
              result.push(popped);
            }
          }

          operatorStack.push(token);
        }
      } else if (token instanceof Operand) {
        //console.log("Found operand: ", token.is);
        result.push(token);
      }

      // ignore non token characters
    }
    // Pop the remaining operators from the stack and into the result
    while (!operatorStack.empty()) {
      const remainingOp = operatorStack.pop();
      if (remainingOp) {
        if (remainingOp.is == EvaluatesTo.L_PAR)
          return {
            state: ResultState.Err,
            content: { errorCode: 2, token: remainingOp },
          };
        result.push(remainingOp);
      }
    }
    //console.log("Result", result);
    //console.log("Stack", operatorStack.data);
    return { state: ResultState.Ok, content: result };
  }
}
export { Operand, Operator };
export default Parser;
