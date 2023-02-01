import React, { useState } from 'react'
import Header from '../Components/Header'
import actionTypes from '../redux/actions/actionTypes'

import { useSelector, useDispatch } from 'react-redux'
import api from '../Api/api'
import urls from '../Api/urls'
import { useNavigate } from 'react-router-dom'


const AddBook = () => {
    const { categoriesState } = useSelector(state => state)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        name: "",
        author: "",
        publisher: "",
        isbn: "",
        price: "",
        categoryId: categoriesState.categories[0].id
    })
    const handelSumbit = (event) => {
        event.preventDefault()
        if (form.name === "" || form.author === "" || form.publisher === "" || form.isbn === "" || form.price === "" || form.categoryId === "") {
            alert("Bütün Alanları Doldurunuz")
            return
        }
        const newBook = {
            ...form,
            id: String(new Date().getTime())
        }
        api.post(urls.books, newBook)
            .then(res => {
                dispatch({ type: actionTypes.bookActions.ADD_BOOK, payload: newBook })
            })
        navigate("/")
            .catch(err => {

            })
    }
    return (
        <div>
            <Header />
            <div>
                <div className='d-flex aligne-item-center justify-content-center my-3'>
                    <h3>Kitap Ekle</h3>
                </div>
                <form onSubmit={handelSumbit}>
                    <div className=" container my-3">
                        <label htmlfor="name" className="form-label">Adı:</label>
                        <input type="text" className="form-control" id="name" placeholder="ÖR: Bülbülün Kırk Şarkısı"
                            value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                    </div>
                    <div className=" container my-3">
                        <label htmlfor="author" className="form-label">Yazarı:</label>
                        <input type="text" className="form-control" id="author" placeholder="ÖR: İskender Pala"
                            value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} />
                    </div>
                    <div className=" container my-3">
                        <label htmlfor="publisher" className="form-label">Yayın Evi:</label>
                        <input type="text" className="form-control" id="publisher" placeholder="ÖR: Kapı yayınlaı"
                            value={form.publisher} onChange={(event) => setForm({ ...form, publisher: event.target.value })} />
                    </div>
                    <div className=" container my-3">
                        <label htmlfor="price" className="form-label">Fiyatı:</label>
                        <input type="number" className="form-control" id="price" placeholder="ÖR: 49.90"
                            value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} />
                    </div>
                    <div className=" container my-3">
                        <label htmlfor="isbn" className="form-label">ISBN:</label>
                        <input type="number" className="form-control" id="isbn" placeholder="ÖR:123432567432"
                            value={form.isbn} onChange={(event) => setForm({ ...form, isbn: event.target.value })} />
                    </div>
                    <select className='container form-select'
                        defaultValue={categoriesState.categories[0].id}
                        value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })}  >
                        {
                            categoriesState.categories.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>

                    <div className='d-flex aligne-item-center justify-content-center my-5'>
                        <button className='btn btn-primary w-50' type='sumbit'>KAYDET</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default AddBook