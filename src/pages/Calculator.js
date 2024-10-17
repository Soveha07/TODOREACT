import { useReducer } from "react";
import DigitButton from "../components/DigitButton";
import OperationButton from "../components/OperationButton";

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
    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.CHOOSE_OPERATION:
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

function Calculator() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="container-fluid h-75 w-25">
        <div className="row d-flex flex-column">
          <div className="col-12 bg-dark d-flex justify-content-end align-items-end rounded-top pr-5">
            <p className="text-white">
              {previousOperand} {operation}
            </p>
          </div>
          <div className="col-12 bg-dark d-flex justify-content-end align-items-end p-4">
            <h4 className="text-white">{currentOperand}</h4>
          </div>
        </div>
        <div className="row" style={{ height: "80px" }}>
          <div className="col-5 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <button
              className="btn btn-outline-light"
              onClick={() => dispatch({ type: ACTIONS.CLEAR })}
            >
              AC
            </button>
          </div>
          <div className="col-4 bg-secondary text-white d-flex justify-content-center align-items-center border border-light">
            <button className="btn btn-outline-light">DEL</button>
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
            <DigitButton
              digit={1}
              className="btn btn-outline-light"
              dispatch={dispatch}
            ></DigitButton>
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
            <button className="btn btn-outline-light">=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
