import { createStore, combineReducers } from "redux";

import categoriesReducers from "./redusers/categoriesReducer";
import booksReducers from "./redusers/booksReducer";



const rootReducer = combineReducers({
    booksState: booksReducers,
    categoriesState: categoriesReducers
})

const store=createStore(rootReducer)

export default store