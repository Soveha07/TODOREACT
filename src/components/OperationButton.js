import { ACTIONS } from "../pages/Calculator";

export default function OperationButton ( { dispatch, operation} ) {
    return (
        <button
         onClick={ () => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: {operation} })}
         className="btn btn-outline-light"
        >
            { operation } 
        </button>
    )
}