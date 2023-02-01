import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'

import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import api from '../Api/api'
import urls from '../Api/urls'

const BookDetail = () => {
    const Params = useParams()
    const [myBook, setMyBook] = useState(null)
    const [bookCategory, setBookCategory] = useState(null)
    console.log(myBook)

    useEffect(() => {
        api.get(`${urls.books}/${Params.bookId}`)
            .then(resBook => {
                setMyBook(resBook.data)
                api.get(`${urls.categories}/${resBook.data.categoryId}`)
                    .then(resCategory => {
                        setBookCategory(resCategory.data)
                    })
                    .catch(err => { })
            })
            .catch(err => {

            })
    }, [])
    if (myBook === null || bookCategory === null) return null
    return (
        <div>
            <Header />
            <div className='container my-5 border border-5  text-center'>
                 <h1 className='text-primary'> DETAYLAR </h1>
                <h3>Kitap Adı :{myBook.name}</h3>
                <h3>Yazarı: {myBook.author}</h3>
                <h3>Yayın Evi: {myBook.publisher}</h3>
                <h3 className='text-danger'>Fiyatı: {myBook.price} &#8378; </h3>
                <h3>Kategorisi: {bookCategory.name}</h3>
                <Link to={"/"}>Geri</Link>
            </div>
        </div>
    )
}

export default BookDetail