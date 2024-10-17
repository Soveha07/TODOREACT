import { ACTIONS } from "../pages/Calculator";

export default function DigitButton ( { dispatch, digit} ) {
    return (
        <button
         onClick={ () => dispatch({ type: ACTIONS.ADD_DIGIT, payload: {digit} })}
         className="btn btn-outline-light"
        >
            { digit } 
        </button>
    )
}