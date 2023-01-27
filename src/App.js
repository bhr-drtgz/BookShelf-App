import HomePage from "./Pages/HomePages";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";
import api from "./Api/api";
import urls from "./Api/urls";



function App() {

  const dispatch = useDispatch()
  const { booksState, categoriesState } = useSelector(state => state)

  useEffect(() => {
    dispatch({ type: actionTypes.bookActions.GET_BOOKS_START })
    api.get(urls.books)
      .then((res) => {
        dispatch({ type: actionTypes.bookActions.GET_BOOKS_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: actionTypes.bookActions.GET_BOOKS_FAIL, payload: "Serverde bir hata olıştu" })
      })

    dispatch({ type: actionTypes.categoryActions.GET_CATEGORİES_START })
    api.get(urls.categories)
      .then((res) => {
        dispatch({ type: actionTypes.categoryActions.GET_CATEGORİES_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: actionTypes.categoryActions.GET_CATEGORİES_FAIL, payload: "Serverde Bir Hata oluştu" })
      })
  }, [])

  if (booksState.success === false || categoriesState.success === false)
    return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
