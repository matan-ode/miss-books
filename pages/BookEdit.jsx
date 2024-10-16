const { useNavigate, useParams } = ReactRouterDOM

const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if(bookId) loadBook()
    }, [])

    function loadBook(){
        bookService.get(bookId).then(setBookToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.value) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    function handleChangeAmount({ target }) {
        const field = target.name
        let value = target.value

        switch (target.value) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBook => ({ ...prevBook, listPrice: { ...bookToEdit.listPrice, [field]: value } }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(book => {
                console.log('Book saved');
                bookId? 
                showSuccessMsg('Book edited successfully')
                :showSuccessMsg('Book added successfully')
            })
            .catch(err => {
                console.log('err:', err);
                bookId? 
                showErrorMsg('Problems editing book')
                :showErrorMsg('Problems adding book')
            })
            .finally(() => {
                navigate('/book')
            })
    }


    const { title, listPrice } = bookToEdit

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="amount">Amount</label>
                <input onChange={handleChangeAmount} value={listPrice.amount} type="number" name="amount" id="amount" />

                <button>Save</button>
            </form>
        </section>
    )
}