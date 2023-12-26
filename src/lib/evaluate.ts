import { Operand, Operator } from "@/lib/core";
import { EvaluatesTo, OperandValues, Result, ResultState } from "@/lib/types";

class Evaluator {
  private static performOperation(
    op: EvaluatesTo,
    left: 1 | 0,
    right: 1 | 0 = 1
  ): 1 | 0 {
    let result = 0;
    console.log(left + " " + op + " " + right);
    switch (op) {
      case EvaluatesTo.NOT:
        result = +!left;
        break;
      case EvaluatesTo.AND:
        result = left & right;
        break;
      case EvaluatesTo.OR:
        result = left | right;
        break;
      case EvaluatesTo.XOR:
        result = left ^ right;
        break;
      case EvaluatesTo.IMPL:
        result = Evaluator.performOperation(
          EvaluatesTo.OR,
          Evaluator.performOperation(EvaluatesTo.NOT, left),
          right
        );
        break;
      case EvaluatesTo.EQUIV:
        result =
          Evaluator.performOperation(EvaluatesTo.IMPL, left, right) &
          Evaluator.performOperation(EvaluatesTo.IMPL, right, left);
        break;
    }
    console.log(
      "This is a result from the evaluator for " + op + " : " + result
    );
    return result as 0 | 1;
  }
  static evaluate(
    tokens: (Operand | Operator)[],
    operandValues: OperandValues
  ): Result<0 | 1, { errorCode: 1 }> {
    console.log("Operand Values: ", operandValues);
    let result: (0 | 1)[] = [];
    for (let token of tokens) {
      if (token instanceof Operand) {
        result.push(operandValues[token.is]);
      } else if (token instanceof Operator) {
        if (token.is == EvaluatesTo.NOT) {
          let opResult = Evaluator.performOperation(token.is, result.pop()!);
          result.push(opResult);
        } else {
          let right = result.pop()!;
          let left = result.pop()!;
          let opResult = Evaluator.performOperation(token.is, left, right);
          result.push(opResult);
        }
      }
    }
    console.log("Result: ", result);
    if (result.length > 1)
      return {
        state: ResultState.Err,
        content: { errorCode: 1 },
      };
    else {
      return { state: ResultState.Ok, content: result[0] };
    }
  }
  static buildTruthTable(tokens: (Operand | Operator)[]) {
    let truthTable = [];
    let variables: Set<string> = new Set();
    // Build the set of variables
    for (let token of tokens) {
      if (token instanceof Operand) {
        variables.add(token.is);
      }
    }
    const propositions: string[] = [...variables]; // turn to array for ordered proposition access,
    // Build or truth table
    for (let i = 0; i < Math.pow(2, propositions.length); i++) {
      let bitCombination = i.toString(2);
      const pad = (str: string): string =>
        Array.from(
          { length: propositions.length - bitCombination.length },
          () => "0"
        ).join("") + str; // add leading zeros to the combination if needed
      bitCombination = pad(bitCombination);
      let truthTableRow: { [key: string]: 0 | 1 } = {}; //https://www.totaltypescript.com/concepts/type-string-cannot-be-used-to-index-type
      for (let j = 0; j < bitCombination.length; ++j) {
        truthTableRow[propositions[j]] = +bitCombination[j] as 0 | 1;
      }
      let evaluationResult = Evaluator.evaluate(tokens, truthTableRow);
      if (evaluationResult.state == ResultState.Err) {
        return evaluationResult;
      } else {
        truthTableRow["Result"] = evaluationResult.content;
      }
      truthTable.push(truthTableRow);
    }
    return truthTable;
  }
}
export { Evaluator };
