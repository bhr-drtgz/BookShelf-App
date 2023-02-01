import actionTypes from "../actions/actionTypes";

const initialState = {
    pending: false,
    success: false,
    books: [],
    fail: false,
    error: ""
}

const booksReducers = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.bookActions.GET_BOOKS_START:
            return {
                ...state,
                pending: true
            }
        case actionTypes.bookActions.GET_BOOKS_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                books: actions.payload
            }
        case actionTypes.bookActions.GET_BOOKS_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: actions.payload
            }
        case actionTypes.bookActions.DELETE_BOOK_START:
            return {
                ...state,
                pending: true,
            }
        case actionTypes.bookActions.DELETE_BOOK_SUCCESS:
            let filterBooks = state.books.filter(item => item.id !== actions.payload)
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                books: filterBooks
            }
        case actionTypes.bookActions.DELETE_BOOK_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: actions.payload
            }
            case actionTypes.bookActions.ADD_BOOK:
                return{
                    ...state,
                    books:[...state.books,actions.payload]
                }
         default:
            return state
    }
}

export default booksReducers