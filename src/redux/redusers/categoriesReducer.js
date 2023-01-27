import actionTypes from "../actions/actionTypes";

const initialState = {
    pending: false,
    success: false,
    categories: [],
    fail: false,
    error: ""

}

const categoriesReducers = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.categoryActions.GET_CATEGORİES_START:
            return {
                ...state,
                pending: true
            }
        case actionTypes.categoryActions.GET_CATEGORİES_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                categories: actions.payload,
                fail: false
            }
        case actionTypes.categoryActions.GET_CATEGORİES_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: actions.payload
            }
        default:
            return state
    }
}

export default categoriesReducers