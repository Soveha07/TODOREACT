import {
  useReducer
} from "react";
import DigitButton from "../components/DigitButton";
import OperationButton from "../components/OperationButton";
import CalculatorHistory from "./CalculatorHistory";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (IsComplete(state)) {
        alert("Calculation Completed! Press AC for new calculation");
      } else {
        if (payload.digit === "0" && state.currentOperand === "0") {
          return state;
        }
        if (payload.digit === "." && state.currentOperand.includes(".")) {
          return state;
        }
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        };
      }
      return state;
    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.CHOOSE_OPERATION:
      if (IsComplete(state)) {
        alert("Calculation Completed! Press AC for new calculation");
      } else {
        if (state.currentOperand == null && state.previousOperand == null) {
          return state;
        }

        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation,
          };
        }

        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          };
        }
        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null,
        };
      }
      return state;
    case ACTIONS.DELETE_DIGIT:
      if (IsComplete(state)) {
        alert("Calculation Completed! Press AC for new calculation");
      } else {
        if (state.currentOperand != null) {
          if (state.currentOperand.length == 1) {
            return {
              ...state,
              currentOperand: null,
            };
          } else {
            return {
              ...state,
              currentOperand: state.currentOperand.slice(0, -1),
            };
          }
        } else {
          return {
            ...state,
            currentOperand: null,
          };
        }
      }
      return state;
    case ACTIONS.EVALUATE:
      if (IsComplete(state) && state.alertStatus !== true) {
        alert("Calculation Completed! Press AC for new calculation");
      } else {
        return {
          ...state,
          secondNum: state.currentOperand,
          currentOperand: evaluate(state),
          result: `${state.previousOperand} ${state.operation} ${
            state.currentOperand
          } = ${evaluate(state)}`,
        };
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) {
    return "";
  }
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

function IsComplete(state) {
  return (
    state.previousOperand &&
    state.currentOperand &&
    state.operation &&
    state.secondNum
  );
}

function Calculator() {
  const [
    { currentOperand, previousOperand, secondNum, operation, result },
    dispatch,
  ] = useReducer(reducer, {});

  return (
    <div className="d-flex justify-content-around mt-5">
      <div className="h-75 w-25">
        <div className="row d-flex flex-column" style={{ height: "150px" }}>
          <div
            className="col-12 bg-dark d-flex justify-content-end align-items-end rounded-top pr-5"
            style={{ flex: "1 1 0" }}
          >
            <p className="text-white m-0">
              {previousOperand} {operation} {secondNum}
            </p>
          </div>
          <div
            className="col-12 bg-dark d-flex justify-content-end align-items-end p-4"
            style={{ flex: "1 1 0" }}
          >
            <h2 className="text-white m-0">{currentOperand}</h2>
          </div>
        </div>

        <div className="row" style={{ height: "80px" }}>
          <div className="col-5 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <button
              className="btn btn-outline-light w-75"
              onClick={() => dispatch({ type: ACTIONS.CLEAR })}
            >
              AC
            </button>
          </div>
          <div className="col-4 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <button
              className="btn btn-outline-light w-75"
              onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
            >
              DEL
            </button>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <OperationButton
              operation="÷"
              dispatch={dispatch}
            ></OperationButton>
          </div>
        </div>
        <div className="row" style={{ height: "80px" }}>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-">
            <DigitButton digit={1} dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <DigitButton digit={2} dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <DigitButton digit={3} dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <OperationButton
              operation="*"
              dispatch={dispatch}
            ></OperationButton>
          </div>
        </div>
        <div className="row" style={{ height: "80px" }}>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <DigitButton digit={4} dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <DigitButton digit={5} dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <DigitButton digit={6} dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <OperationButton
              operation="+"
              dispatch={dispatch}
            ></OperationButton>
          </div>
        </div>
        <div className="row" style={{ height: "80px" }}>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <DigitButton digit={7} dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <DigitButton digit={8} dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <DigitButton digit={9} dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <OperationButton
              operation="-"
              dispatch={dispatch}
            ></OperationButton>
          </div>
        </div>
        <div className="row" style={{ height: "80px" }}>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light rounded-bottom">
            <DigitButton digit="." dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-3 bg-secondary text-white d-flex justify-content-center align-items-center border border-light rounded-bottom">
            <DigitButton digit={0} dispatch={dispatch}></DigitButton>
          </div>
          <div className="col-6 bg-secondary text-white d-flex justify-content-center align-items-center border border-light rounded-bottom">
            <button
              className="btn btn-outline-light w-75"
              onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
            >
              =
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <CalculatorHistory result={result} />
      </div>
    </div>
  );
}

export default Calculator;
