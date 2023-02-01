import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../Assest/style/Button.css'
import api from '../Api/api'
import urls from '../Api/urls'
import actionTypes from '../redux/actions/actionTypes'
import CustamModal from './CustamModal'
import { Link } from 'react-router-dom'

function ListBooks() {
    const dispatch = useDispatch()
    const { booksState, categoriesState } = useSelector(state => state)
    const [showDeleteModol, setShowDeleteModol] = useState(false)
    const [willDeleteBook, setWillDeleteBook] = useState("")
    console.log(booksState);
    console.log(categoriesState)

    const deleteBook = (id) => {
        dispatch({ type: actionTypes.bookActions.DELETE_BOOK_START })
        api.delete(`${urls.books}/${id}`)
            .then((res) => {
                dispatch({ type: actionTypes.bookActions.DELETE_BOOK_SUCCESS, payload: id, })
            })
            .catch((err) => {
                dispatch({ type: actionTypes.bookActions.GET_BOOKS_FAIL, payload: "Silme işlemi sırasında hata oluştu" })
            })
    }

    return (
        <div className='container my-5'>
        <div className='d-flex justify-content-end'>
            <Link to={"/add-book"} className='btn btn-primary'>Kitap Ekle</Link>
        </div>
            <table className="table table-striped">
                <thead className='border-bottom border-danger border-3'>
                    <tr>
                        <th scope="col">Sıra No</th>
                        <th scope="col">Adı</th>
                        <th scope="col">Yazarı</th>
                        <th scope="col">Kategorisi</th>
                        <th scope="col">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {booksState.books.map((book, index) => {
                        const myCategory = categoriesState.categories.find(
                            (item) => item.id === book.categoryId
                        );
                        return (
                            <tr key={book.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{myCategory.name}</td>
                                <td>
                                    <button onClick={() => {
                                        setShowDeleteModol(true)
                                        setWillDeleteBook(book.id)
                                    }} className='generalBtn deleteBtn'>Sil</button>
                                    <button className='generalBtn editBtn'>Güncelle</button>
                                    <Link to={`/book-detail/${book.id}`} className='generalBtn'>Detaylar</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {
                showDeleteModol === true && (
                    <CustamModal title="Silme" message='Silmek İstediğinize Eminmisiniz ?'
                        onCancel={() => setShowDeleteModol(false)}
                        onConfirm={() => {
                            deleteBook(willDeleteBook)
                            setShowDeleteModol(false)
                        }} />
                )
            }
        </div>
    )
}

export default ListBooks